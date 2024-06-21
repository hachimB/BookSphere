import express from 'express';
import index from './routes/index.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', index);

app.listen(port, () => console.log(`The server is running on port ${port}`));

export default app;
