<template>
  <div class="item-list">
    <div v-for="item in items" :key="item.id" class="item">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
      <!-- display other fields as needed -->
    </div>
    <div ref="sentinel"></div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      required: true
    },
    loadMore: {
      type: Function,
      required: true
    }
  },
  mounted() {
    // create an IntersectionObserver to detect when the sentinel element is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      },
      { rootMargin: '0px 0px 200px 0px' } // adjust the root margin as needed
    );
    observer.observe(this.$refs.sentinel);
  }
}
</script>

<style scoped>
.item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>