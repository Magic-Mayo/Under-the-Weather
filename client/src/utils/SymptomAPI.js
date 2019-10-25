import axios from "axios";

export default {
  // Gets all users
  // Gets the User with the given id
  // getUser: function(id) {
  //   return axios.get("/api/users/" + id);
  // },
  // Deletes the User with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a User to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Saves a User to the database
  updateUser: function(userData) {
    return axios.put("/api/users/" + userData.id, userData);
  }
};
