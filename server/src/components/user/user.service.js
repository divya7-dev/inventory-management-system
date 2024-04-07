class UserService {
    constructor() {
      this.users = [
        {
          id: 1,
          name: "One"
        },
        {
          id: 2,
          name: "Two"
        },
        {
          id: 3,
          name: "Three"
        }]
    }
  
    getUsers = () => this.users;
  
    getUser = (id) => {
      const user = this.users.find((u) => u.id == id);
      return user;
    };
  }
  
  export default UserService;