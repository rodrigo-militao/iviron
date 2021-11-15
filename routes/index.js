const router = require('express').Router();
const editJsonFile = require("edit-json-file");  
const { 
  getGeneralConfig, 
  readCSV, 
  getAllConfig, 
  GENERAL_CONFIG_PATH
} = require('./utils');

router.get('/', (req, res) => {
    getAllConfig().then(config => {
      res.render('index', {
        tag: config.tag,
        localizacao: config.localizacao,
        cliente: config.cliente
      });
    });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/change_chart_config_file', (req, res) => {
  const { path } = req.body;
  console.log(path)
  let file = editJsonFile(GENERAL_CONFIG_PATH, { autosave: false });
  file.set("chart_data_path", path)

  file.save()

  return res.status(200).json({status: 'ok'})
})

router.post('/change_video_config_file', (req, res) => {
  const { path } = req.body;
  let file = editJsonFile(GENERAL_CONFIG_PATH, { autosave: true });
  file.set("video_data_path", path)

  return res.redirect('/')
})

router.post('/set_config', (req, res) => {
  const { data } = req.body;
  let file = editJsonFile(GENERAL_CONFIG_PATH, { autosave: false });
  data.map(({path, value}) => {
    file.set(path, value)
  })
  
  file.save()

  return res.redirect('/')
})

router.get('/chart_data', (req, res) => {
  getGeneralConfig("chart_data_path").
  then(path => {
    readCSV(path).then(data => res.json(data))
  })
})

module.exports = router;