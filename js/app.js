window.onload = () => init();
let name;
let btn_next;

let form;
let info;
let actual_index = 0;
let response = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
]; // guardamos las respuestas del usuario


//BOTONES de anterior y siguiente
let arrow_btn_next = document.getElementById('arrow-btn-next')
let arrow_btn_prev = document.getElementById('arrow-btn-prev');


//
let test_html = document.getElementById("question");
info = document.getElementById("info");

let done_questions = document.getElementById('done_questions');
let question_of_total = document.getElementById('question_of_total');

let main_test = document.getElementById('main_test');

//********* */
let _results = document.getElementById('_results');
function init() {
  main_test.classList.add('hide');//ocultamos los panel de preguntas
  main_test.classList.add('height-0');
  main_test.classList.add('margin-0');
  _results.classList.add('hide')
  _results.classList.add('height-0')

  let string = `
  <div class="flex col">
    <img src="images/logo.png" alt="logo">
    <h1 style="margin-top: 50px">Bienvenido</h1>
    <input type="text" placeholder="tu nombre" id="name">
    <button id="btn_next" class="button-login">Continuar</button>
  </div>
  `;
  document.getElementById("welcome").innerHTML = string;
  console.log("cargo el documento");
  
  btn_next =  document.getElementById("btn_next");
  name = document.getElementById("name");
  

  btn_next.addEventListener("click", () => {
    if (name.value == null || name.value.length == 0) {
      alert("Campo nombre vacio");
    } else {
      //oculatamos el id welcome
      let welcome = document.getElementById("welcome");
      welcome.innerHTML = "";
      welcome.classList.add("margin-0");
      main_test.classList.remove('hide')
      main_test.classList.remove('height-0')
      main_test.classList.remove('margin-0')
      showTest();
      //mostramos el boton de resultados
      _results.classList.remove('hide')
      _results.classList.remove('height-0')
    
    }

    console.log(name.value);
  });
}

function showTest() {
  console.log("ahora mostramos el test" + name.value);

  let div = document.getElementById("header");
  div.innerHTML = `
  <header class='header flex'>
    <h1>TEST DE JUEGO DE TRONOS</h1>
  </header>
  <div class="username_bar flex">
    <p > Bienvenido <span class="color-1">${name.value}</span></p>
  </div>
  `;
  test_html.innerHTML = draw_question(actual_index);

  // form = document.getElementById("form");
}
function info_message(match_result,message) {
  if(match_result == 'Correcto'){
  return `
    <p class="info_assert success">${match_result}</p>
    <p clas="info_message">${message}</p>`;
  }else{
    return `
    <p class="info_assert error">${match_result}</p>
    <p clas="info_message">${message}</p>`;
  }
}
function draw_question(index) {
  // test[index][0] //para la pregunta
  // test[index][1] //opcion 1
  // test[index][2] //opcion 2
  // test[index][3] //opcion 3
  // test[index][4] //opcion correcta
  // test[index][5] // informacion de la respuesta
  // <form id="form" >
  return `
      <p>${test[index][0]}</p>
      <div class="flex col questions">
        <div class="question">
          <input type="radio"  name="option-${index}" value="1">
          <label >${test[index][1]}</label>
        </div>
        <div class="question">
          <input type="radio"  name="option-${index}" value="2">
          <label >${test[index][2]}</label>
        </div>
        <div class="question">
          <input type="radio"  name="option-${index}" value="3">
          <label >${test[index][3]}</label>
        </div>
      </div>
      <div>
        <button type="submit" class="btn-eval">Evaluar</button>
      </div>
      `;
  // </form>
}
// let html = ''
// test.map((question,index)=>{
//   html += draw_question(index)
// })
// console.log(html)

form = document.querySelector("form");

form.addEventListener(
  "submit",
  function(event) {
    event.preventDefault();
    var data = new FormData(form);
    var output = "";
    for (const entry of data) {
      output = entry[0] + "=" + entry[1] + "\r";
      console.log(entry);
      response.map(res => {
        if (res[0] == actual_index) {
          if(!validatedQuestion(res[1])){
            alert('Ya respondiste esta pregunta')
            return false;
          }
          res[1] = parseInt(entry[1]);
          calculateDoneQuestions()
          //test[index][4] //opcion correcta
          if(res[1] == test[actual_index][4]){
            info.innerHTML = info_message("Correcto",test[actual_index][5]);
            addBackColor(true);
            //si es correcta ponemos el fondo verde en el panel
          }else{
            info.innerHTML = info_message("Incorrecto",test[actual_index][5]);
            addBackColor(false);
            //si es incorrecta ponemos el fondo rojo en el panel
          }
          //return false para acabar con el bucle y evitar que se recargue la pagina
          return false;
        }
      });
    }
    console.log(output);
    return false;
  },
  false
);

function validatedQuestion(question){
  if(question !=0){
    //si la pregunta ya fue respondida
    return false;
  }else{
    //si la pregunta no ha sido respondida
    return true;
  }
}
function addBackColor(bol){
  let q = document.getElementById(`q_${actual_index+1}`);
  (bol) ?
    q.classList.add('back-color-success') :
    q.classList.add('back-color-error');
}

arrow_btn_next.addEventListener('click', ()=>{
  console.log('next fue clickedo')
  if(isTheLastElement()) return;//verficamos que no sea la ultima pregunta

  actual_index +=1;
  info.innerHTML = ''
  test_html.innerHTML = draw_question(actual_index);
  updateTextOfquestion_of_total()
});

arrow_btn_prev.addEventListener('click', ()=>{
  console.log('prev fue clickedo')
  if(isTheFirstElement()) return;//verficamos que no sea la primera pregunta

  actual_index -=1;
  info.innerHTML = ''
  test_html.innerHTML = draw_question(actual_index);
  updateTextOfquestion_of_total()
});

function isTheLastElement(){
  return (actual_index ==8)  ? true: false; 
}

function isTheFirstElement(){
  return (actual_index ==0)  ? true: false; 
}

function updateTextOfquestion_of_total(){
  question_of_total.innerHTML = `Pregunta ${actual_index+1} de 9`
}

function calculateDoneQuestions(){
  let temp=0;
  response.map(res=>{
    if(res[1] !=0){
      temp+=1;
    }
  })
  let bar = document.querySelector('.progress-bar')
  bar.classList.add(`bar-${temp}`)
  done_questions.innerHTML = `Preguntas realizadas: ${temp}`
}

function showResults(){
  // test[index][0] //para la pregunta
  // test[index][1] //opcion 1
  // test[index][2] //opcion 2
  // test[index][3] //opcion 3
  // test[index][4] //opcion correcta
  main_test.classList.add('hide');//ocultamos los panel de preguntas
  main_test.classList.add('height-0');
  main_test.classList.add('margin-0');

  let string='';
  test.map((res,index)=>{

    if(response[index][1] == 0){
      //si no se respindio
      string += `
      <tr>
        <td>${index+1}. ${res[0]}</td>
        <td>No la respondiste</td>
        <td>${res[res[4]]}</td>
      </tr>
      `
    }else{ 
      string += `
      <tr>
        <td>${res[0]}</td>
        <td>${res[response[index][1]]}</td>
        <td>${res[res[4]]}</td>
      </tr>
      `;
    }
  });
  _results.innerHTML =
  `
  <h1>Resultados</h1>
    <p>A las preguntas respondiste</p>
    <table class="egt">
      <tr>
        <th>Pregunta</th>
        <th>Tu respuesta</th>
        <th>La respuesta Correcta</th>
      </tr>
      ${string}
    </table>
  `;

}