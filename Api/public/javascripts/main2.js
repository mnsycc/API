const formEl = document.forms.form;
formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = new FormData(formEl); 
  console.log(data);
  const b = async() => {
    const valid = await axios.get('/test1', data);
    console.log("requested!");
  }
  b();
});