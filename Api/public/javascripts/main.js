const formEl = document.forms.form;
formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = new FormData(formEl); 
  console.log(data);
  const b = async() => {
    data.append('content', editor.getContents().ops[0].insert);
    const valid = await axios.post('/test2', data);
    // const sender = await axios.post('/article', data);
    console.log("sended!");
    console.log(editor.getContents());
    console.log(editor.getContents().ops[0].insert);
  }
  b();
});
