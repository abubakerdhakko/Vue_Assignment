import axios from 'axios';

const API_URL = 'http://3.232.244.22/api/';

class AuthService {
  login(user) {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("email", user.email);
    formdata.append("password", user.password);


    return axios
      .post(API_URL + 'login', formdata, myHeaders)
      .then(response => {
        const user = response.data.user;
        if (user.token) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      })
      .catch(error => console.log('error', error));



  }

  logout() {
    localStorage.removeItem('user');
  }

  register(data) {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("password_confirmation", data.Confirm_Password);


    return axios.post(API_URL + "register", formdata, myHeaders)

  }
}

export default new AuthService();
