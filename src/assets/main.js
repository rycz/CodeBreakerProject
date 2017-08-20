let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here
    if (answer =='' || attempt == '') {
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt++;
    }

    if (getResults(input)) {
      setMessage("You Win! :)");
      showAnswer(true);
      showReplay();
    } else if (attempt >= 10) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
  answer = Math.floor(Math.random() * 10000).toString();
  while (answer.length < 4) {
    answer = "0" + answer;
  }
  attempt = 0;
}

function setMessage(msg) {
  $("#message").innerHTML = msg;
}

function validateInput(length) {
  if (length == 4) {
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
    if (input[i] == answer[i]) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
      charCorrect++;
    } else if (answer.includes(input[i])) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  html += '</div></div>';

  $("#results").innerHTML += html;

  if (charCorrect == 4) {
    return true;
  }
  return false;
}

function showAnswer(won) {
  $("#code").innerHTML(answer);
  if (won) {
    $("#code").className += " success";
  } else {
    $("#code").className += " failure";
  }
}

function showReplay() {
  $("#guessing-div").style = "display: none";
  $("#replay-div").style = "disply: block";
}
