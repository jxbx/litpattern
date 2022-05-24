const design = document.getElementById("design")
const output = document.getElementById("output");
const about = document.getElementById("about")
const designPanel = document.getElementById("designPanel")
const outputPanel = document.getElementById("outputPanel")
const aboutPanel = document.getElementById("aboutPanel")
const randomValueThumb = document.getElementById("randomValueThumb")
const alternatingThumb = document.getElementById("alternatingThumb")
const randomColourThumb = document.getElementById("randomColourThumb")

function showDesign () {


  outputPanel.style.height = "0";
  aboutPanel.style.height = "0";
  designPanel.style.height = "80vh";
  output.style.background = "#e2e2e2";
  about.style.background = "#e2e2e2";
  design.style.background = "#f08d35";
};

function showOutput () {

  designPanel.style.height = "0";
  outputPanel.style.height = "40vh";
  aboutPanel.style.height = "0";
  output.style.background = "#f08d35";
  about.style.background = "#e2e2e2";
  design.style.background = "#e2e2e2";
}

function showAbout () {

  aboutPanel.style.height = "80vh";
  designPanel.style.height = "0";
  outputPanel.style.height = "0";
  output.style.background = "#e2e2e2";
  design.style.background = "#e2e2e2";
  about.style.background = "#f08d35";
}
