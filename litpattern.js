const designButton = document.getElementById("designButton");
const outputButton = document.getElementById("outputButton");
const aboutButton = document.getElementById("aboutButton");
const designPanel = document.getElementById("designPanel");
const outputPanel = document.getElementById("outputPanel");
const aboutPanel = document.getElementById("aboutPanel");
const alternating = document.getElementById("alternating");
const randomColor = document.getElementById("randomColor");
const randomValue = document.getElementById("randomValue");
const randomiseButton = document.getElementById("randomiseButton");
const mobileText = document.getElementById("mobileText");
const mobileAdjust = document.getElementById("mobileAdjust");
const mobileRandom = document.getElementById("mobileRandom");
const mobileColor = document.getElementById("mobileColor");
const randomiseContainer = document.getElementById("randomiseContainer");
const swatchContainer = document.getElementById("swatchContainer");
const slidersContainer = document.getElementById("slidersContainer");
const textInputContainer = document.getElementById("textInputContainer");

function showPanel(input) {

  input.style.background = "#f08d35";

  switch (input) {
    case designButton:
      outputPanel.style.height = "0";
      aboutPanel.style.height = "0";
      designPanel.style.height = "80vh";
      outputButton.style.background = "#e2e2e2";
      aboutButton.style.background = "#e2e2e2";
      break;
    case outputButton:
      designPanel.style.height = "0";
      outputPanel.style.height = "40vh";
      aboutPanel.style.height = "0";
      aboutButton.style.background = "#e2e2e2";
      designButton.style.background = "#e2e2e2";
      break;
    case aboutButton:
      aboutPanel.style.height = "80vh";
      designPanel.style.height = "0";
      outputPanel.style.height = "0";
      outputButton.style.background = "#e2e2e2";
      designButton.style.background = "#e2e2e2";
      break;
  }
}

function updateToggle (input) {
  if (input.value <= 0){
    input.style.filter = "grayscale()";
  }
  else{
    input.style.filter = "none";
  }
  UpdateRandomiseButton(randomColor, randomValue);
}

function UpdateRandomiseButton (a,b) {
  if (a.value <= 0 && b.value <= 0){
    randomiseButton.style.background = "grey";
    randomiseButton.innerText = "Randomise";
    randomiseButton.disabled = true;
  }
  else if (a.value >= 1 && b.value <= 0){
    randomiseButton.style.background = "#f08d35";
    randomiseButton.innerText = "Randomise colours";
    randomiseButton.disabled = false;
  }
  else if (a.value <= 0 && b.value >= 1){
    randomiseButton.style.background = "#f08d35";
    randomiseButton.innerText = "Randomise sliders";
    randomiseButton.disabled = false;
  }
  else {
    randomiseButton.style.background = "#f08d35";
    randomiseButton.innerText = "Randomise everything!";
    randomiseButton.disabled = false;
  }
}

function mobileSelect (input) {
  designPanel.style.display = "flex";
  switch (input){
    case mobileText:
      textInputContainer.style.display = "flex";
      slidersContainer.style.display = "none";
      randomiseContainer.style.display = "none";
      swatchContainer.style.display = "none";
      break;
    case mobileAdjust:
      textInputContainer.style.display = "none";
      slidersContainer.style.display = "flex";
      randomiseContainer.style.display = "none";
      swatchContainer.style.display = "none";
      break;
    case mobileRandom:
      textInputContainer.style.display = "none";
      slidersContainer.style.display = "none";
      randomiseContainer.style.display = "flex";
      swatchContainer.style.display = "none";
      break;
    case mobileColor:
      textInputContainer.style.display = "none";
      slidersContainer.style.display = "none";
      randomiseContainer.style.display = "none";
      swatchContainer.style.display = "flex";
      break;
  }
}
