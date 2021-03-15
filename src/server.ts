import dotenv from "dotenv";
dotenv.config();

import express from 'express';

const app = express();

app.get('/users', (_, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(process.env.PORT || 3333, () => { 
  console.log(`Server running at port ${process.env.PORT || 3333} `);
})