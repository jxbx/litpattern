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
const mobileNav = document.getElementById("mobileNav");

let uiState = {
  textInputContainer: "flex",
  slidersContainer: "none",
  randomiseContainer: "none",
  swatchContainer:  "none",
  mobileNav: "flex",
  designPanel: {display: "flex", selected: "true"},
  aboutPanel: {display: "none", selected: "false"},
  outputPanel: {display: "none", selected: "false"}
}

let uiVisibility = true;

function updateRandomiseButton () {
  if (randomColor.checked === false && randomValue.checked === false){
    randomiseButton.innerText = "Randomise";
    randomiseButton.disabled = true;
  }
  else if (randomColor.checked === true && randomValue.checked === false){
    randomiseButton.innerText = "Randomise colours";
    randomiseButton.disabled = false;
  }
  else if (randomColor.checked === false && randomValue.checked === true){
    randomiseButton.innerText = "Randomise sliders";
    randomiseButton.disabled = false;
  }
  else {
    randomiseButton.innerText = "Randomise everything!";
    randomiseButton.disabled = false;
  }
}

function showPanel(input) {

  let elements = document.getElementsByClassName("mainButton");
  for (const element of elements){
    element.style.background = "#e2e2e2";
  }
  input.style.background = "#f08d35";

  switch (input){
    case designButton:
      if (breakpoint.matches && uiState["designPanel"].display === "flex"){
        uiState["designPanel"].display = "none";
        uiState["mobileNav"] = "none";
      }
      else {
        uiState["mobileNav"] = "flex";
        uiState["designPanel"].display = "flex";
      }
        uiState["aboutPanel"].display = "none";
        uiState["outputPanel"].display = "none";
        uiState["designPanel"].selected = "true";
        uiState["aboutPanel"].selected = "false";
        uiState["outputPanel"].selected = "false";
      renderUI();
      break;

    case outputButton:
      if (breakpoint.matches && uiState["outputPanel"].display === "flex"){
        uiState["outputPanel"].display = "none";
      }
      else {
      uiState["outputPanel"].display = "flex";
      }
      uiState["aboutPanel"].display = "none";
      uiState["designPanel"].display = "none";
      uiState["mobileNav"] = "none";
      uiState["designPanel"].selected = "false";
      uiState["aboutPanel"].selected = "false";
      uiState["outputPanel"].selected = "true";
      renderUI();
      break;

    case aboutButton:
      if (breakpoint.matches && uiState["aboutPanel"].display === "flex"){
        uiState["aboutPanel"].display = "none";
      }
      else {
      uiState["aboutPanel"].display = "flex";
      }
      uiState["designPanel"].display = "none";
      uiState["outputPanel"].display = "none";
      uiState["mobileNav"] = "none";
      uiState["designPanel"].selected = "false";
      uiState["aboutPanel"].selected = "true";
      uiState["outputPanel"].selected = "false";
      renderUI();
      break;
  }
}

function mobileSelect (input) {
let elements = document.getElementsByClassName("mobileButton")
for (const element of elements){
  element.style.textDecoration = "none";
  element.style.fontWeight = "normal"
}

uiState["designPanel"].display = "flex";
uiState["mobileNav"] = "flex";
input.style.textDecoration = "underline";
input.style.fontWeight = "bold";

  switch(input){
    case mobileText:
      uiState["textInputContainer"] = "flex";
      uiState["slidersContainer"] = "none";
      uiState["randomiseContainer"] = "none";
      uiState["swatchContainer"] = "none";
      renderUI();
      break;
    case mobileAdjust:
      uiState["textInputContainer"] = "none";
      uiState["slidersContainer"] = "flex";
      uiState["randomiseContainer"] = "none";
      uiState["swatchContainer"] = "none";
      renderUI();
      break;
    case mobileRandom:
      uiState["textInputContainer"] = "none";
      uiState["slidersContainer"] = "none";
      uiState["randomiseContainer"] = "flex";
      uiState["swatchContainer"] = "none";
      renderUI();
      break;
    case mobileColor:
      uiState["textInputContainer"] = "none";
      uiState["slidersContainer"] = "none";
      uiState["randomiseContainer"] = "none";
      uiState["swatchContainer"] = "flex";
      renderUI();
      break;
  }

}

function updateUIonBreakpoint () {
  if (breakpoint.matches){
    uiState["textInputContainer"] = "flex";
    uiState["slidersContainer"] = "none";
    uiState["randomiseContainer"] = "none";
    uiState["swatchContainer"] = "none";
    uiState["mobileNav"] = "flex";
  }
  else{
    uiState["designPanel"].selected === "true" ? uiState["designPanel"].display = "flex" : uiState["designPanel"].display = "none";
    uiState["outputPanel"].selected === "true" ? uiState["outputPanel"].display = "flex" : uiState["outputPanel"].display = "none";
    uiState["aboutPanel"].selected === "true" ? uiState["aboutPanel"].display = "flex" : uiState["aboutPanel"].display = "none";

  }
renderUI();

}

function renderUI () {
  if (!breakpoint.matches){
    uiState["textInputContainer"] = "flex";
    uiState["slidersContainer"] = "flex";
    uiState["randomiseContainer"] = "flex";
    uiState["swatchContainer"] = "flex";
    uiState["mobileNav"] = "none";
  }
  textInputContainer.style.display = uiState["textInputContainer"];
  slidersContainer.style.display = uiState["slidersContainer"];
  randomiseContainer.style.display = uiState["randomiseContainer"];
  swatchContainer.style.display = uiState["swatchContainer"];
  designPanel.style.display = uiState["designPanel"].display;
  outputPanel.style.display = uiState["outputPanel"].display;
  aboutPanel.style.display = uiState["aboutPanel"].display;
  mobileNav.style.display = uiState["mobileNav"];
}

function hideUI (input) {

  let target = input.target;
  if (target != document.body || !breakpoint.matches){
    return
  }
  else {
    if (uiVisibility === true){
      designPanel.style.display = "none";
      outputPanel.style.display = "none";
      aboutPanel.style.display = "none";
      mobileNav.style.display = "none";
      uiVisibility = false;
    }
    else {
      uiVisibility = true;
      renderUI();
    }

  }
}

  let breakpoint = window.matchMedia("(max-width: 600px)")
  breakpoint.addEventListener("change", updateUIonBreakpoint);

  window.onload = renderUI;
  document.body.addEventListener("click", (evt) => {hideUI(evt)});
