import { Router } from "express";
import {
  getArticles,
  removeArticles,
  resetArticles,
} from "../controllers/article.controller.js";

const router = Router();

router.get("/articles", getArticles);
router.post("/articles/delete", removeArticles);
// Workaround to reset the DB
router.get("/articles/reset", resetArticles);

export default router;
