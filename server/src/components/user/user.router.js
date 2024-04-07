import express from 'express';

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.userController.getUser);
    router.route('/').get(this.userController.getUsers);
    return router;
  }
}

export default UserRouter;
