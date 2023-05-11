import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://3.232.244.22/api';

class ItemService {

  getItems(page) {
    return axios.get(API_URL + '/items?page=' + page, { headers: authHeader() });
  }
  editItems(data, id) {

    var raw = JSON.stringify({
      "title": data.title,
      "description": data.description,
      "completed": data.completed
    });
    return axios
      .put(API_URL + '/item/' + id, raw, { headers: authHeader() })
      .then(response => {
        console.log('data', response)
        return response.data;
      });
  }


  deleteItem(id) {
    return axios
      .delete(API_URL + '/item/' + id, { headers: authHeader() })
      .then(response => {
        console.log('data', response)

        return response.data;
      });
  }
  addItem(data) {
    var raw = JSON.stringify(data);
    return axios
      .post(API_URL + '/item', raw, { headers: authHeader() })
      .then(response => {
        console.log('data', response)
        return response.data;
      });
  }


}

export default new ItemService();
