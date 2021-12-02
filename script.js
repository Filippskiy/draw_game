var words = [
    "косметология",
    "аббревиатура",
    "авиакомпания",
    "баскетболист",
    "обогреватель"
  ];
  var remain = 0;
  var answer = [];
  var guess = "";
  var chekerepeat=0;
  var letters = [];
  var word = words[Math.floor(Math.random() * words.length)];
  var draw1 = SVG("drawing1").size(400, 180);
  var draw2 = SVG("drawing2").size(400, 266);
  var fail = 0;
  var checkers = 0;
  var ans_letter;
  var sex_radio = document.getElementsByName("sex-radio");
  var frame = document.getElementById("frame");
  var frm = frame.getContext("2d");
  var width = frame.width;
  var height = frame.height;
  var figure;
  var reader = new FileReader();

  var drawCanvasBorder = function() {
    frm.beginPath();
    frm.moveTo(0, 0);
    frm.lineTo(width, 0);
    frm.lineTo(width, height);
    frm.lineTo(0, height);
    frm.lineTo(0, 0);
    frm.strokeStyle = "#006bd3";
    frm.lineWidth = 5;
    frm.stroke();
  };
  var drawRemain = function() {
    frm.clearRect(0, 0, width, height);
    frm.font = "20px Courier";
    frm.fillStyle = "Black";
    frm.textAlign = "left";
    frm.textBaseline = "top";
    frm.fillText(
      "Осталось угадать: " + remain + " Количество ошибок " + fail,
      10,
      height - 30
    );
  };

  var drawResult = function(res) {
    frm.font = "20px Courier";
    frm.fillStyle = "Red";
    frm.textAlign = "left";
    frm.textBaseline = "top";
    frm.fillText("Игра окончена! " + res, 10, height - 50);
  };

  var drawWord = function() {
    frm.font = "20px Courier";
    frm.fillStyle = "Black";
    frm.textAlign = "center";
    frm.textBaseline = "middle";
    frm.fillText(answer.join(" "), width / 2, 30);
  };
  var cleanDraw = function() {
    frm.clearRect(0, 0, width, height);
  };

  var Figure = function() {
    this.n = 0;
  };

  Figure.prototype.drawPart = function() {
    if (sex_radio[0].checked) {
      switch (this.n) {
        case 1:
          var image = draw1.image("boy/1.jpg");
          break;
        case 2:
          image = draw1.image("boy/2.jpg");
          break;
        case 3:
          image = draw1.image("boy/3.jpg");
          break;
        case 4:
          image = draw1.image("boy/4.jpg");
          break;
        case 5:
          image = draw1.image("boy/5.jpg");
          break;
        case 6:
          image = draw1.image("boy/6.jpg");
          break;
        case 7:
          image = draw1.image("boy/7.jpg");
          break;
        case 8:
          image = draw1.image("boy/8.jpg");
          break;
        case 9:
          image = draw1.image("boy/9.jpg");
          break;
        case 10:
          image = draw1.image("boy/10.jpg");
          break;
      }
    } else {
      switch (this.n) {
        case 1:
          var image = draw2.image("girl/1.jpg");
          break;
        case 2:
          image = draw2.image("girl/2.jpg");
          break;
        case 3:
          image = draw2.image("girl/3.jpg");
          break;
        case 4:
          image = draw2.image("girl/4.jpg");
          break;
        case 5:
          image = draw2.image("girl/5.jpg");
          break;
        case 6:
          image = draw2.image("girl/6.jpg");
          break;
        case 7:
          image = draw2.image("girl/7.jpg");
          break;
        case 8:
          image = draw2.image("girl/8.jpg");
          break;
        case 9:
          image = draw2.image("girl/9.jpg");
          break;
        case 10:
          image = draw2.image("girl/10.jpg");
          break;
      }
    }
  };
  drawCanvasBorder();
  var play = function() {

    changeButt();
    remain = word.length - 2;
    answer[0] = word[0];
    answer[word.length - 1] = word[word.length - 1];
    for (var i = 1; i < word.length - 1; i++) {
      answer[i] = "_";
    }
    drawRemain();
    drawCanvasBorder();
    drawWord();
   
    figure = new Figure();
  };
  console.log(ans_letter);
  function check() {
    guess = document.getElementById("guess").value;
    var guessOK = false;
    for (var i = 1; i < word.length - 1; i++) {
      if (word[i] === guess) {
        answer[i] = guess;
        guessOK = true;
        checkers++;
      }
    }
    if (check_letter()) {
      guessOK = false;
    }

    letters.push(guess);

    if (!guessOK) {
      fail++;
    } else {
      check_repeat();
      remain-=chekerepeat;
      chekerepeat*=0;
    }

    if (remain < 0) remain = 0;

    drawRemain();
    drawWord();
    drawCanvasBorder();
    if (guessOK) {
      figure.n++;
      figure.drawPart();
    }
    if (fail >= 5) {
      for (var i = 0; i < word.length; i++) {
        answer[i] = word[i];
      }
      var res = "Вы проиграли!";
      drawResult(res, fail);
      resetButton();
    }
    if (remain == 0) {
      var res = "Вы выиграли!";
      drawResult(res, fail);
      if (sex_radio[0].checked) {
        image = draw1.image("boy/10.jpg");
      } else {
        image = draw2.image("girl/10.jpg");
      }
      resetButton();
    }
    document.getElementById("guess").value = "";
  }
  function changeButt() {
    var play = document.getElementById("play");
    var check = document.getElementById("check");
    var sex_form = document.getElementById("sex-form");
    play.classList.toggle("hide");
    check.classList.toggle("show");
    sex_form.classList.toggle("hide");
  }
  function resetButton() {
    var check = document.getElementById("check");
    var reset = document.getElementById("reset");
    check.classList.toggle("hide");
    reset.classList.toggle("show");
  }
  function reset() {
    location.reload();
  }
  function check_repeat(){
    ans_letter = word.split('');
    for(var i=1;i<ans_letter.length-1;i++){
      if(ans_letter[i]==guess){
        chekerepeat++;
      }
    }
  }
  function check_letter() {
    for (var i = 0; i < letters.length; i++) {
      if (letters[i] == guess) {
        return true;
      }
    }
    return false;
  }