const patternSwatch = document.getElementById("patternSwatch");
const patternContainer = document.getElementById("patternContainer");
const gridItems = document.getElementsByClassName("item");
const alternating = document.getElementById("alternating");

//Used to control spacing of svg pattern (adjusting this reduces how far elements can overlap and can be used to stop clipping)

const spacing = 150;

//used to generate coordinates for svg pattern:

let coordinates = [];

let svgReady;

//pattern design saved here:

let state = {
  character:null,
  fontWeight: null,
  fontSize: null,
  dropShadow: null,
  zoom: null,
  angle: null,
  alternating: null,
  color01: null,
  color02: null,
  color03: null,
}

//DOM elements

const angle = document.getElementById("angle");
const angleValue = document.getElementById("angleValue");
angle.addEventListener("input", display);

const dropShadow = document.getElementById("dropShadow");
const dropShadowValue = document.getElementById("dropShadowValue");
dropShadow.addEventListener("input", display);

const fontSize = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
fontSize.addEventListener("input", display);

const fontWeight = document.getElementById("fontWeight");
const fontWeightValue = document.getElementById("fontWeightValue");
fontWeight.addEventListener("input", display);

const zoom = document.getElementById("zoom");
const zoomValue = document.getElementById("zoomValue");
zoom.addEventListener("input", display);

const characterInput = document.getElementById("characterInput");
characterInput.addEventListener("input", display);

//generate SVG coordinates for the text elements that make up the pattern

function generateCoordinates() {
  let min = -spacing;
  for (let y=0; y<3; y++){
    for (let x=0; x<3; x++){
      let item = [];
      item.push(min + spacing*x);
      item.push(min + spacing*y);
      coordinates.push(item);
    }
  }
}

//Applies styles to text elements, crops out a repeating tile using viewbox, and returns an array including code for inline svg and css background;

function generateSvg() {

    while (patternSwatch.childNodes.length > 2) {
      patternSwatch.removeChild(patternSwatch.lastChild);
    }

    coordinates = [];
    generateCoordinates();

    for (let i=0; i<9; i++){
      const shape = document.createElementNS('http://www.w3.org/2000/svg',"text");
      shape.setAttributeNS(null, "id", "item"+i);
      shape.setAttributeNS(null, "x", coordinates[i][0]);
      shape.setAttributeNS(null, "y", coordinates[i][1]);
      shape.setAttributeNS(null, "class", "item");
      const text  = document.createTextNode(characterInput.value);
      shape.appendChild(text);
      patternSwatch.appendChild(shape);
    }

    for (const item of gridItems){
      state.dropShadow <= 0 ? item.style.filter = null : item.style.filter = "drop-shadow("+ state.dropShadow +"px 0 " + state.color03 + ")";

      item.style.fontSize = state.fontSize + "px";
      item.style.fontWeight = state.fontWeight;
      item.style.fill = state.color02;
      item.style.transformBox = "fill-box";
      item.style.transformOrigin = "center";
      item.style.textAnchor = "middle";
      item.style.dominantBaseline = "middle";
      item.style.fontFamily = "Raleway";
    }
    for (let i=0; i<9; i++){
      if (alternating.checked && i%2 === 0){
        gridItems[i].style.transform = null;
      }
      else {
        gridItems[i].style.transform = "rotate("+angle.value+"deg)";
      }
    }


  patternSwatch.setAttributeNS(null, "viewBox", -spacing + " " + -spacing + " " + spacing*2 + " " + spacing*2);


  let svgOutput = btoa(patternSwatch.outerHTML);
  let svgOutputArray = []

  svgOutputArray.push("background-image: url(\'data:image/svg+xml;base64," + svgOutput + "\'); background-size: " + zoom.value + "px;");
  svgOutputArray.push(svgOutput);

  return svgOutputArray;
}


//updates state, updates DOM sliders, calls generateSvg() and displays pattern as background

function display() {

  dropShadowValue.innerHTML = dropShadow.value;
  fontSizeValue.innerHTML = fontSize.value;
  fontWeightValue.innerHTML = fontWeight.value;
  zoomValue.innerHTML = zoom.value;
  angleValue.innerHTML = angle.value;

  state.character = characterInput.value;
  state.angle = angle.value;
  state.dropShadow = dropShadow.value;
  state.fontSize = fontSize.value;
  state.fontWeight = fontWeight.value;
  state.zoom = zoom.value;
  state.alternating = alternating.checked;

  svgReady = generateSvg();

 document.body.setAttribute("style", svgReady[0]);
}


const swatch01 = document.getElementById('swatch01');
const picker01 = new Picker({
  parent: swatch01,
  color: "#2197ac",
  popup: "bottom",
  alpha: false,
  onChange: function (color) {
    patternSwatch.style.backgroundColor = color.rgbaString;
    swatch01.style.backgroundColor = color.rgbaString;
    state.color01 = color.rgbaString;
    display();
    }
  });

const swatch02 = document.getElementById("swatch02");
const picker02 = new Picker({
  parent: swatch02,
  color: "#f45555ff",
  popup: "bottom",
  alpha: false,
  onChange: function (color) {
    for (const item of gridItems){
      item.style.fill = color.rgbaString;
    }
    swatch02.style.backgroundColor = color.rgbaString;
    state.color02 = color.rgbaString;
    display();
    }
  });

  const swatch03 = document.getElementById("swatch03");
  const picker03 = new Picker({
    parent: swatch03,
    color: "#356969ff",
    popup: "bottom",
    alpha: false,
    onChange: function (color) {
      for (const item of gridItems){
          dropShadow.value <= 0 ? item.style.filter = null : item.style.filter = "drop-shadow("+dropShadow.value+"px 0" + color.hex +")";
      };
      swatch03.style.backgroundColor = color.rgbaString;
      state.color03 = color.rgbaString;
      display();
      }
    });


const randomiseParameters = document.getElementById("randomiseParameters");

randomiseParameters.onclick = function() {
  dropShadow.value = Math.random()*100;
  angle.value = Math.random()*360;
  fontSize.value = Math.random()*300 + 50;
  fontWeight.value = Math.random()*800 + 100;
  zoom.value = Math.random()*480 + 20;
  let newString = "";
  for (let i=0; i<Math.round(Math.random())+1; i++){
    newString += String.fromCharCode(Math.round(Math.random()*93)+33);
  }
  characterInput.value = newString;
  alternating.checked = (Math.random() < 0.5) ? false : true;

  display();
}

const randomiseColors = document.getElementById("randomiseColors");

randomiseColors.onclick = function() {
  function newColor () {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

  //setColor() is from the vanillapicker module;

  picker01.setColor(newColor());
  picker02.setColor(newColor());
  picker03.setColor(newColor());

  display();
}

const randomiseEverything = document.getElementById("randomiseEverything");

randomiseEverything.onclick = function() {
  randomiseColors.click();
  randomiseParameters.click();
}

const shareButton = document.getElementById("shareButton");

shareButton.onclick = function updateURL() {


  let newState =  encodeURIComponent(JSON.stringify(state));
  window.location.hash = newState;
  navigator.clipboard.writeText(window.location.href)
    .then(()=>{
      alert("URL copied to clipboard");
    })
    .catch(()=>{
      alert("error");
    })
}

function loadState() {
  let string = window.location.hash.slice(1);
  if (string.length <= 0){
    state = stateLibrary[Math.floor(Math.random()*stateLibrary.length)];
  }
  else {
    state = JSON.parse(decodeURIComponent(string));
  }
    characterInput.value = state.character;
    angle.value = state.angle;
    dropShadow.value = state.dropShadow;
    fontSize.value = state.fontSize;
    fontWeight.value = state.fontWeight;
    zoom.value = state.zoom;
    alternating.checked = state.alternating;

    picker01.setColor(state.color01);
    picker02.setColor(state.color02);
    picker03.setColor(state.color03);

    display();

}

const downloadSVGButton = document.getElementById("downloadSVG");


function downloadSVG() {
  const blob = new Blob([patternContainer.innerHTML], { type: "image/svg+xml" });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = "mypattern";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const cssRepeat = document.getElementById("cssRepeat")
cssRepeat.onclick = function () {
  navigator.clipboard.writeText(svgReady[0])
  .then(()=>{
    alert("CSS copied to clipboard");
  })
  .catch(()=>{
    alert("error");
  })
}

// const inlineSvg = document.getElementById("inlineSvg")
// inlineSvg.onclick = function () {
//   navigator.clipboard.writeText(svgReady[1])
//   .then(()=>{
//     alert("CSS copied to clipboard");
//   })
//   .catch(()=>{
//     alert("error");
//   })
// }


let stateLibrary = [
  {
    "character": ":",
    "fontWeight": "440",
    "fontSize": "172",
    "dropShadow": "18",
    "zoom": "353",
    "angle": "271",
    "alternating": true,
    "color01": "rgba(37,158,89,1)",
    "color02": "rgba(82,170,48,1)",
    "color03": "rgba(198,212,36,1)"
  },
  {
      "character": "O",
      "fontWeight": "900",
      "fontSize": "219",
      "dropShadow": "0",
      "zoom": "500",
      "angle": "143",
      "alternating": true,
      "color01": "rgba(150,186,187,1)",
      "color02": "rgba(75,30,40,1)",
      "color03": "rgba(113,185,168,1)"
  },
  {
      "character": "<",
      "fontWeight": "100",
      "fontSize": "250",
      "dropShadow": "43",
      "zoom": "188",
      "angle": "184",
      "alternating": true,
      "color01": "rgba(140,74,74,1)",
      "color02": "rgba(81,211,150,1)",
      "color03": "rgba(84,119,171,1)"
  },
  {
      "character": "(",
      "fontWeight": "200",
      "fontSize": "250",
      "dropShadow": "13",
      "zoom": "205",
      "angle": "178",
      "alternating": true,
      "color01": "rgba(158,142,42,1)",
      "color02": "rgba(174,67,123,1)",
      "color03": "rgba(20,11,113,1)"
  },
  {
      "character": "A",
      "fontWeight": "100",
      "fontSize": "192",
      "dropShadow": "75",
      "zoom": "201",
      "angle": "0",
      "alternating": true,
      "color01": "rgba(120,68,42,1)",
      "color02": "rgba(172,67,130,1)",
      "color03": "rgba(235,21,20,1)"
  },
  {
      "character": "K",
      "fontWeight": "349",
      "fontSize": "297",
      "dropShadow": "75",
      "zoom": "287",
      "angle": "334",
      "alternating": true,
      "color01": "rgba(89,149,154,1)",
      "color02": "rgba(234,98,118,1)",
      "color03": "rgba(248,151,87,1)"
  }
];


window.addEventListener("load", loadState);
window.addEventListener("load", display);
alternating.addEventListener("change", display);
downloadSVGButton.addEventListener("click", downloadSVG);
