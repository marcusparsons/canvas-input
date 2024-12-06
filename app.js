//To see a much more advanced version of this example, head over to my site and visit my SketchMeh program:
//http://www.marcusparsons.com/projects/sketchmeh

//This was written in Pure JS so that it doesn't clash with builds built on libraries/frameworks/etc.

const canvasInput = document.querySelector('#canvasInput');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

//'canvasTool' is an object to hold associated variables for the canvasInput
const canvasTool = {
  lineWidth: 20,
  color: '#000',
  drawx: 0,
  drawy: 0
};

//Click to place the canvas input at the clicked position
canvas.addEventListener('click', e => {
  //set the x and y positions for the canvasInput to where they are relative to the page
  canvasTool.drawx = e.pageX;
  canvasTool.drawy = e.pageY;

  canvasInput.style.display = 'block';

  //start at the latest drawx position, offset by the canvasTool lineWidth divided by 2
  canvasInput.style.left = (canvasTool.drawx - (canvasTool.lineWidth / 2)) + 'px';

  //Setting the top to be the y position minus the lineWidth
  canvasInput.style.top = (canvasTool.drawy - canvasTool.lineWidth) + 'px';

  canvasInput.focus();
});

//On releasing a key: Enter for committing text to canvas, and Escape for hiding the canvas input
canvasInput.addEventListener('keyup', e => {
  //Pressing enter to insert the text into the canvas
  if (e.key === 'Enter') {
    e.preventDefault();
    //An easy way to use context.font to set the font family and size
    //context.font = '12px sans-serif';
    //and more dynamically based on a selection of sizes say from 1-20
    //ie setting canvasTool.lineWidth to 15 means that the font is 30px sans-serif = 15 * 2
    context.font = (2 * canvasTool.lineWidth) + 'px sans-serif';
    context.fillStyle = canvasTool.color;

    //call fillText to push the content of input to the page
    /*
      - The text needs to be set at the location inside the canvas.
      - That location is relative to where the drawx and drawy are to the canvas location on the page.
      - If you add in the lineWidth / 2, you will have a vertically centered text.  Although lineWidth sounds confusing as to why it affects the vertical position, in my project I extended lineWidth to be used with font as well as drawing lines on the canvas.  
      - lineWidth is used to create the size of the font so you can manipulate this to set the text vertically no matter what font size it is so that the user gets an expected response of where the text should be.
     */
    context.fillText(canvasInput.value, canvasTool.drawx - canvas.offsetLeft - (canvasTool.lineWidth / 2), canvasTool.drawy - canvas.offsetTop + (canvasTool.lineWidth / 2));
    context.save();
    //set the display to none for the input and erase its value
    canvasInput.style.display = 'none';
    canvasInput.value = '';
  }
  //Pressing Escape to cancel
  else if (e.key === 'Escape') {
    //prevent the default action of pressing Escape
    e.preventDefault();
    //same as the last step of the enter button
    //set the display to none for the input and erase its value
    canvasInput.style.display = 'none';
    canvasInput.value = '';
  }
});