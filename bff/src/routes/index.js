import express from "express";
import produtos from "./roteador.js";
import cors from 'cors';

const routes = (app) => {
  app.use(
    express.json(),
    cors(),
    produtos
  )
}

export default routes