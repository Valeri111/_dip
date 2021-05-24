const submitForm = document.querySelector('#submit');
const results = document.querySelector('.results');

function checkTest() {
  let sum = 0;
  let mrkChecks = document.querySelectorAll('.checkbox:checked');
  for (let i = 0; i <+ mrkChecks.length; i++){
    sum += +mrkChecks[i].value;
    console.log(mrkChecks[i].value)
    console.log(typeof(+mrkChecks[i].value))
  }
  if(sum !== 5){
    results.innerHTML = `Во 1-м вопросе ответ не верный - перечетай теорию.`;
  }

  let radio = document.querySelectorAll('input[name="findAns"]:checked');
  for (let i = 0; i <+ radio.length; i++){
    if(radio[i].value !== "right") {
      results.innerHTML = `В 2-м вопросе ответ не верный - перечетай теорию.`;
    }
  }

  let radioChecks = document.querySelectorAll('input[name="findCode"]:checked');
  for (let i = 0; i <+ radioChecks.length; i++){
    if(radioChecks[i].value !== "right") {
      results.innerHTML = `В 3-м вопросе ответ не верный - перечетай теорию.`;
    }
  }
  
  for (let i = 0; i <+ mrkChecks.length; i++) {
    if((sum === 5) && (document.querySelector('input[name="findAns"]:checked').value === "right") && (document.querySelector('input[name="findCode"]:checked').value === "right")) {
      results.innerHTML = "Поздравляю! Ты справился! Переходи к другой теме.";
    }
  }
}

submitForm.addEventListener('click', checkTest);