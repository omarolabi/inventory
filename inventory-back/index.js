import express from "express";
import productsRoutes from "./src/routes/products.routes.js";
import articlesRoutes from "./src/routes/articles.routes.js";

import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", productsRoutes);
app.use("/api", articlesRoutes);

app.listen(4000);
console.log("Server listening on port 4000");
