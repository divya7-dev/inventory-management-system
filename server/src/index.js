import app from './app.js';
import userModule from './components/user/user.module.js';

app.listen(4000, () => {
  console.log('Server listening...');
});

app.use('/users', userModule.router);