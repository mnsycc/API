const ArticleModel = require('models/article');

const getList = async () => {
  const docs = await articleModel.find();
  return docs;
}

const create = async (title, content) => {
  const doc = new ArticleModel({ title, content });
  await doc.save();

  return doc.id;
}

module.exports.getList = getList;
module.exports.create = create;
