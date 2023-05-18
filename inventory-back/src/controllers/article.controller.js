import fs from "fs";

export const getArticles = (_, res) => {
  const file = fs.readFileSync("src/data/articles.json");
  const articles = JSON.parse(file);
  res.json(articles);
};

export const removeArticles = (req, res) => {
  const articlesToDelete = req.body;
  const file = fs.readFileSync("src/data/articles.json");
  const articles = JSON.parse(file);

  articlesToDelete.map((articleToDelete) => {
    const targetIndex = articles.findIndex(
      (article) => article.art_id === articleToDelete.art_id
    );

    const reducedStock = (
      +articles[targetIndex].stock - +articleToDelete.amount
    ).toString();
    articles[targetIndex].stock = reducedStock;
  });

  fs.writeFileSync("src/data/articles.json", JSON.stringify(articles));
  res.json(articles);
};

// Workaround to reset the DB
export const resetArticles = (_, res) => {
  const file = fs.readFileSync("src/data/articles-origin.json");
  const articles = JSON.parse(file);

  fs.writeFileSync("src/data/articles.json", JSON.stringify(articles));
  res.json(articles);
};
