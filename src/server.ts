import express, { json } from 'express';

import { routes } from './routes';

const port = 3333;
const app = express();
app.use(json());
app.use(routes);

app.listen(port, () => console.log(`🚀 App is running at port ${port}`));
