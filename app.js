let boxCount = 0;
let colors = [];

function addColor() {
    boxCount++;
    const boxesDiv = document.getElementById('boxes');
    // Create new color box elements
    const boxDiv = document.createElement('div');
    boxDiv.className = 'box';
    boxDiv.id = 'box' + boxCount;


    const colorPickerInput = document.createElement('input');
    colorPickerInput.type = 'color';
    colorPickerInput.className = 'color-picker';
    colorPickerInput.id = 'colorPicker' + boxCount;
    colorPickerInput.value = randomColor();

    const colorHexDiv = document.createElement('div');
    colorHexDiv.className = 'color-hex';
    colorHexDiv.id = 'colorHex' + boxCount;
    colorHexDiv.textContent = colorPickerInput.value;
    colors.push(colorPickerInput.value);

    // Append new color box elements to the box div
    boxDiv.appendChild(colorPickerInput);
    boxDiv.appendChild(colorHexDiv);

    // Append the new box div to the boxes div
    boxesDiv.appendChild(boxDiv);


    // Add event listener to the new color picker input
    colorPickerInput.addEventListener('input', function (event) {
        const color = event.target.value;
        colorHexDiv.textContent = color;
        
        // Extract the number from the id of colorPickerInput to find the index in the colors array
        const index = parseInt(colorPickerInput.id.replace('colorPicker', '')) - 1;
        
        // Update the color in the colors array
        colors[index] = color;
        
        addExamples();
    });
    if(boxCount < 2) addColor();
    else addExamples();
}


function randomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return '#' + randomColor;
}
function subColor() {
    if (boxCount > 2) {
        const boxesDiv = document.getElementById('boxes');
        const lastBoxDiv = document.getElementById('box' + boxCount);
        const exampleParent = document.getElementById('examples');
        boxesDiv.removeChild(lastBoxDiv);
        colors.pop();
        boxCount--;
        addExamples();
    } else {
        console.log('Two colors are required!');
    }
}

function addExamples() {
        // Create new example div
        const exampleParent = document.getElementById('examples');
        if(exampleParent.hasChildNodes()) {
            //remove all children
            while(exampleParent.firstChild) {
                exampleParent.removeChild(exampleParent.firstChild);
            }
        }
        for(let i = 0; i < boxCount; i++) {
            for(let j = 0 ; j < boxCount; j++) {
                if(i === j) continue;
                else {
                    const ex = document.createElement('div');
                    ex.className = 'example';
                    ex.id = 'example' + i + '-' + j;
                    ex.style.backgroundColor = colors[i];
                    ex.style.color = colors[j];
                    const exH1 = document.createElement('h1');
                    const exH2 = document.createElement('h2');
                    const exH3 = document.createElement('h3');
                    const exP = document.createElement('p');
                    exH1.textContent = 'H1';
                    exH2.textContent = 'H2\t';
                    exH3.textContent = 'H3\t';
                    exP.textContent = 'Paragraph text goes here';
                    
                    const text = [];
                    text.push(exH1);
                    text.push(exH2);
                    text.push(exH3);
                    text.push(exP);

                    for(let k = 0; k < text.length; k++) {
                        text[k].style.color = colors[j];
                        text[k].id = exampleParent.id + 'text' + i + '-' + j + '-' + k; 
                        ex.appendChild(text[k]);
                    }

                    exampleParent.appendChild(ex);
                }   
            }
        }
}

// Clear all color boxes and reset back to two
function clearBoxes() {
    console.log('clear');
    const boxesDiv = document.getElementById('boxes');
    const exampleParent = document.getElementById('examples');
    
    // Remove all child nodes from boxesDiv and exampleParent
    while(boxesDiv.firstChild) {
        boxesDiv.removeChild(boxesDiv.firstChild);
    }
    while(exampleParent.firstChild) {
        exampleParent.removeChild(exampleParent.firstChild);
    }
    
    // Reset boxCount and colors array
    boxCount = 0;
    colors = [];
    addColor();
}

// Save to local storage
// function save() {
//     localStorage.setItem('boxCount', boxCount);
//     localStorage.setItem('colors', JSON.stringify(colors));
// }

// function addFromStorage() {
//     this.boxCount = parseInt(localStorage.getItem('boxCount'));
//     colors = JSON.parse(localStorage.getItem('colors'));
//     for(let i = 0; i < boxCount; i++) {
//         addColor();
//     }
//     addExamples();
// }

// Initialize with one color box
document.addEventListener('DOMContentLoaded', function () {
    // if(localStorage.getItem('boxCount') !== null) addFromStorage();
    // else
    addColor();
    addExamples();
    

});

