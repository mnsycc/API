const express = require('express');
const router = express.Router();
const articleController = require('controllers/article')

let multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, fileName);
  }
})
let upload = multer({ storage: storage })

const Ajv = require('ajv');
const testSchema = require('schemas/routes/test');
const idSchema = require('schemas/routes/id');
router.get('/', (req, res, next) => {
  // res.json({
  //   status: 'ok', payload: 'Hello. I`m API server'
  // });
  res.render('index');
});
router.get('/1', (req, res, next) => {
  res.render('index2');
});
/////////////////
// router.post('/article',upload.none(),  function(req,res,next) {
//   const a = async () => {
//     const b = await console.log(req.body);
//   };
//   a();
//   res.end();
// });
////////////////

router.get('/test1', async (req, res, next) => {
  const { body } = res;
  console.log(req.body);

  // Валидируем!
  const ajv = new Ajv();
  const validate = ajv.compile(idSchema);
  const valid = validate(body);

  if (!valid) {
    const { errors } = validate;

    const result = {
      status: 'invalid data',
      payload: { errors },
    };
    res.json(result);
    return;
  }

  // Дергаем контроллер. Все! больше тут ничего нет
  const { getList } = articleController; // получить все статьи
  const result = await getList();

  // Отдаем ответ
  res.json({ status: 'ok', payload: { result } });
});


router.post('/test2', upload.none(), async (req, res, next) => {
  const { body } = req;
  console.log(req.body);

  // Валидируем!
  const ajv = new Ajv();
  const validate = ajv.compile(testSchema);
  const valid = validate(body);

  if (!valid) {
    const { errors } = validate;

    const result = {
      status: 'invalid data',
      payload: { errors },
    };
    res.json(result);
    return;
  }

  // Дергаем контроллер. Все! больше тут ничего нет
  const { create } = articleController; // создать статью
  const id = await create(req.body.title, req.body.content);

  console.log(id);
  // Отдаем ответ
  res.json({ status: 'ok', payload: { id } });
});


module.exports = router;
