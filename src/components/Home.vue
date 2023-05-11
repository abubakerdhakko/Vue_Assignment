<template>
  <div>
    <div class="">
      <button
        type="button"
        class="btn btn-primary ml-3"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add
      </button>
    </div>
    <ul>
      <li v-if="currentPage > 1" @click="getData(currentPage - 1)">
        &laquo; Previous
      </li>
      <li
        v-for="page in lastPage"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="getData(page)"
      >
        {{ page }}
      </li>
      <li v-if="currentPage < lastPage" @click="getData(currentPage + 1)">
        Next &raquo;
      </li>
    </ul>
    <ul>
      <li v-for="item in items" :key="item.id">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          @click="editRec(item)"
        >
          edit
        </button>
        <button
          type="button"
          class="btn btn-primary ml-2 mr-1"
          data-toggle="modal"
          @click="deleteRec(item)"
        >
          delete
        </button>
        {{ item.id }}-{{ item.title }} - {{ item.description }} - {{ item.completed?'Completed':'Uncomplete' }}
      </li>
    </ul>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="clearModal()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>title</div>
          <input
            type="text"
            id="title"
            name="title"
            v-model="title"
          /><br /><br />
          <div>description</div>
          <input
            type="text"
            id="description"
            name="description"
            v-model="description"
          /><br /><br />
          <input
            type="radio"
            id="value1"
            name="value1"
            value="1"
            v-model="completed"
          />
          <label for="value1">True</label><br />
          <input
            type="radio"
            id="value2"
            name="value2"
            value="0"
            v-model="completed"
          />
          <label for="value2">false</label><br />
        </div>
        <div class="modal-footer">
          <button
            v-if="!upadte"
            type="button"
            class="btn btn-primary"
            @click="addNewRec(item)"
          >
            save changes
          </button>
          <button
            v-if="upadte"
            type="button"
            class="btn btn-primary"
            @click="saveEditedObj(data)"
          >
            update changes
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="clearModal()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from "../services/auth-header";
import ItemService from "../services/Item.service";
export default {
  data() {
    return {
      items: [],
      currentPage: 1,
      lastPage: 1,
      title: "",
      description: "",
      completed: 0,
      //
      upadte: false,
    };
  },
  methods: {
    addNewRec() {
      let addtObj = {
        title: this.title,
        description: this.description,
        completed: this.completed,
      };
      ItemService.addItem(addtObj).then(
        (response) => {
          console.log("response", response);
          // this.content = response.data;
          alert("Record Added");
          this.getData(this.currentPage);
          document.getElementById("exampleModal").click();
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    clearModal() {
      (this.title = ""), (this.description = ""), (this.completed = 0);
    },
    editRec(data) {
      this.upadte = true;
      (this.id = data.id), (this.user_id = data.user_id);
      (this.title = data.title),
        (this.description = data.description),
        (this.completed = data.completed);
    },
    saveEditedObj() {
      let editObj = {
        title: this.title,
        description: this.description,
        completed: this.completed,
      };

      ItemService.editItems(editObj, this.id).then(
        (response) => {
          console.log("editItems", response);
          // this.content = response.data;
          (this.title = ""), (this.description = ""), (this.completed = 0);
          this.upadte = false;
          document.getElementById("exampleModal").click();
          this.getData(this.currentPage);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    deleteRec(data) {
      ItemService.deleteItem(data.id).then(
        (response) => {
          console.log("response", response);
          // this.content = response.data;
          alert("deleted");
          document.getElementById("exampleModal").click();
          this.getData(this.currentPage);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    async getData(page) {
      const response = await fetch(
        `http://3.232.244.22/api/items?page=${page}`,
        { headers: authHeader() }
      );
      //  const response = await ItemService.getItems(page);
      const data = await response.json();
      this.items = data.items.data;
      this.currentPage = data.items.current_page;
      this.lastPage = data.items.last_page;
    },
  },
  mounted() {
    this.getData(this.currentPage);
  },
};
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>