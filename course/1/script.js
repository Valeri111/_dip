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

  const first = document.querySelector('.first-answer');
	if (first.value.toLowerCase() != "post" || first.value.toLowerCase() != "get") results.innerHTML = "Во 2-м вопросе ответ не верный - перечетай теорию.";

  const second = document.querySelector('.second-answer');
	if (second.value.toLowerCase() != "post") results.innerHTML = "Во 2-м вопросе ответ не верный - перечетай теорию.";

  const third = document.querySelector('.third-answer');
	if (third.value.toLowerCase() != "delete") results.innerHTML = "Во 2-м вопросе ответ не верный - перечетай теорию.";

  const fourth = document.querySelector('.fourth-answer');
	if (fourth.value.toLowerCase() != "post") results.innerHTML = "Во 2-м вопросе ответ не верный - перечетай теорию.";

  const fifth = document.querySelector('.fifth-answer');
	if (fifth.value.toLowerCase() != "post") results.innerHTML = "Во 2-м вопросе ответ не верный - перечетай теорию.";

  let radioChecks = document.querySelectorAll('input[name="findCode"]:checked');
  for (let i = 0; i <+ radioChecks.length; i++){
    if(radioChecks[i].value !== "right") {
      results.innerHTML = `В 3-м вопросе ответ не верный - перечетай теорию.`;
    }
  }
  
  for (let i = 0; i <+ mrkChecks.length; i++) {
    if((sum === 5) && (first.value.toLowerCase() === "post" || first.value.toLowerCase() === "get") && (second.value.toLowerCase() === "post") && (third.value.toLowerCase() === "delete") && (fourth.value.toLowerCase() === "post") && (fifth.value.toLowerCase() === "post") && (document.querySelector('input[name="findCode"]:checked').value === "right")) {
      results.innerHTML = "Поздравляю! Ты справился! Переходи к другой теме.";
    }
  }
}

submitForm.addEventListener('click', checkTest);