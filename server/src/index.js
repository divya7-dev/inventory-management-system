import app from './app.js';
import stocksModule from './components/stocks/stocks.module.js';

app.listen(4000, () => {
  console.log('Server listening...');
});

app.use('/stocks', stocksModule.router);