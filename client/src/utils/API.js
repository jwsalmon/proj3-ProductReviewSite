import axios from "axios";

export default {
  //get all users
  getUsers: function () {
      let results = axios.get('/api/users');
      console.log(results);
      return results;
  }

};