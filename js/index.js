var app = new Vue({
  el: "#app",
  data: {
    name: "",
    score: 0,
    exam_index: 0,
    message: 123,
    exams: [{ img: "" }],
    answers_count: 0
  },
  methods: {
    chose(option) {
      if (this.exams[this.exam_index].correct === option) {
        right_ring.pause();
        right_ring.currentTime = 0;
        this.score += 1;
        console.log("得分!!\n分數:" + this.score);
        right_ring.play();
      } else {
        wrong_ring.pause();
        wrong_ring.currentTime = 0;
        wrong_ring.play();
      }
      if (this.exams.length - 1 > this.exam_index) {
        this.exam_index = this.exam_index + 1;
      } else {
        this.exam_index = 0;
      }
      shuffleArray(this.exams[this.exam_index].options);
    },
    nextPage() {
      document.getElementsByClassName("intro")[0].classList.toggle("d-none");
      document
        .getElementsByClassName("game_area")[0]
        .classList.toggle("d-none");
      this.getData();
    },
    getData() {
      let api = new XMLHttpRequest();
      api.onload = (e) => {
        let new_exam = JSON.parse(api.responseText);
        if (this.exams[0].img == "") {
          this.exams = new_exam;
        } else if (Array.isArray(new_exam)) {
          this.exams = this.exams.concat(new_exam);
        } else {
          this.exams.push(new_exam);
        }
      };
      api.open(
        "GET",
        "https://script.google.com/macros/s/AKfycby8R-9dIwq0Dy7qIOl10B4I9bg8s2ZHwX-3xN0_FXlE656uJsKnpDADyjPEY-tCL9magQ/exec"
      );
      api.send();
    }
  }
});

function shuffleArray(inputArray) {
  inputArray.sort(() => Math.random() - 0.5);
}

var right_ring = document.createElement("audio");
right_ring.src = "/audio/correct-answer.mp3";
var wrong_ring = document.createElement("audio");
wrong_ring.src = "/audio/wrong-answer.mp3";
