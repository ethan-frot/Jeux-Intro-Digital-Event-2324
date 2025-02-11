const sliders = document.querySelectorAll(".step5_range");
const sliderContainer = document.querySelectorAll(".slider-container");
const inputDisabled = document.querySelector("#input-disabled");
const timer = document.querySelector(".timer");
const timerInterval = setInterval(updateTimer, 1000);
const motor = document.querySelector(".motor");
const backgroundVideo = document.querySelector(".step-5-background-video");

const range1 = document.querySelector("#range-1");
const range2 = document.querySelector("#range-2");
const range3 = document.querySelector("#range-3");

let time = 30;

sliderContainer.forEach((slider) => {
  const step5Range = slider.querySelector(".step5_range");
  const step5RangeControl = slider.querySelector(".step5_range_control");
  step5RangeControl.addEventListener("input", (e) => {
    step5Range.value = e.target.value;
  });
});

function activeButtons(prediction) {
  motor.play();
  backgroundVideo.play();
  sliders.forEach((slider) => {
    if (prediction.label === "closed") {
      if (checkCollision(slider.getBoundingClientRect())) {
        // Récupérer les tailles du slider
        const slideSize = slider.getBoundingClientRect();

        // Récupérer l'espacement entre le bas du slider et le bas de la page
        const sliderBottomRelativeToDoc = window.scrollY + slideSize.bottom;
        const totalDocHeight = document.documentElement.scrollHeight;
        const sliderBottomDistance = totalDocHeight - sliderBottomRelativeToDoc;

        // Hauteur du slider
        const sliderHeight = slideSize.height;
        if (slider.id == "range-1") {
          slider.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            2.1;
          range2.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            2.8;
        } else if (slider.id == "range-2") {
          slider.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            2.1;
          range3.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            0.6;
        } else if (slider.id == "range-3") {
          slider.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            2.1;
          range1.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            1.2;
        }
      }
    }
  });
}

function updateTimer() {
  timer.innerText = time;

  if (time === 0) {
    clearInterval(timerInterval);
    redirectToNextPage();
  } else {
    time--;
  }
}

function redirectToNextPage() {
  window.location.href = "step6.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    redirectToNextPage();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    window.location.href = "../index.html";
  }
});
