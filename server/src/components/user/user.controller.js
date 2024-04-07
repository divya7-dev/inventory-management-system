class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getUsers = (_, res) => res.status(200).send(this.userService.getUsers());

  getUser = (req, res) => {
    const { id } = req.params;
    return res.status(200).send(this.userService.getUser(id));
  };
}

export default UserController;