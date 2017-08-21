let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let code = document.getElementById('code');
let message = document.getElementById('message');
let results = document.getElementById('results');
let guessingDiv = document.getElementById('guessing-div');
let replayDiv = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here
    if (answer.value =='' || attempt.value == '') {
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt.value++;
    }

    if (getResults(input.value)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
  answer.value = Math.floor(Math.random() * 10000).toString();
  while (answer.value.length < 4) {
    answer.value = "0" + answer.value;
  }
  attempt.value = 0;
}

function setMessage(msg) {
  message.innerHTML = msg;
}

function validateInput(input) {
  if (input.length == 4) {
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input) {
  let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  let charCorrect = 0;

  for(let i = 0; i < 4; i++) {
    if (input[i] == answer.value[i]) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
      charCorrect++;
    } else if (answer.value.includes(input[i])) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  html += '</div></div>';

  results.innerHTML += html;

  if (charCorrect == 4) {
    return true;
  }
  return false;
}

function showAnswer(won) {
  code.innerHTML = answer.value;
  if (won) {
    code.className += " success";
  } else {
    code.className += " failure";
  }
}

function showReplay() {
  guessingDiv.style = "display: none";
  replayDiv.style = "display: block";
}
