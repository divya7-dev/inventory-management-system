class User {
  constructor(email, password, age) {
    this.id = 1;
    this.email = email;
    this.password = password;
    this.age = age;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      age: this.age,
    };
  }
}

export default User;