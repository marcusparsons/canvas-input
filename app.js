//To see a much more advanced version of this example, head over to my site and visit my SketchMeh program:
//http://www.marcusparsons.com/projects/sketchmeh

//This was written in Pure JS so that it doesn't clash with a jQuery build

var _input = document.querySelector("#canvasInput");
var canvas = document.querySelector("#canvas");
var context = canvas.getContext('2d');
var tool = {};
//"tool" is just an object that holds various tools that you are probably going to reuse
//it's a variable I created to hold various states of things I needed to track in my paint-like app
tool.lineWidth = 20;
tool.color = "#000000";
tool.startx = 0;
tool.starty = 0;

document.querySelector("#canvas").addEventListener('click', function (e) {
    //set starting x and y points
    //set the x and y positions to where they are relative to the page
    tool.startx = e.pageX;
    tool.starty = e.pageY;
    _input.style.display = "block";
    _input.style.position = "absolute";
    _input.style.left = tool.startx + "px";
    //Setting the top to be the y position minus the lineWidth
    //results in a centered input on the canvas
    _input.style.top = (tool.starty  - tool.lineWidth) + "px";
    _input.focus();
  }, false);

_input.addEventListener('keyup', function(e) {
  //Pressing enter to put the text to the canvas
  if (e.key === 'Enter') {
    e.preventDefault();
    //An easy way to use context.font to set the font family and size
    //context.font = "12px sans-serif";
    //and more dynamically based on a selection of sizes say from 1-20
    //ie setting tool.lineWidth to 15 means that the font is 30px sans-serif = 15 * 2
    context.font = (2 * tool.lineWidth) + "px sans-serif";
    context.fillStyle = tool.color;
    //call fillText to push the content of input to the page
   /*
     the text needs to be set at the location inside the canvas
     that location is relative to where the startx and starty are to the canvas location on the page.
     If you add in the lineWidth / 2, you will have a vertically centered text.  Although lineWidth sounds confusing
     as to why it affects the vertical position, in my project I extended lineWidth to be used with font as well as drawing lines
     on the canvas.  lineWidth is used to create the size of the font so you can manipulate this to set the text vertically
     no matter what font size it is so that the user gets an expected response of where the text should be.
    */
    context.fillText(_input.value, tool.startx - canvas.offsetLeft, tool.starty - canvas.offsetTop + (tool.lineWidth / 2));
    //save the context
    context.save();
    //set the display to none for the input and erase its value
    _input.style.display = "none";
    _input.value = "";
  }
  //Pressing Escape to cancel
  if (e.key === 'Escape') {
    //prevent the default action of pressing Escape
    e.preventDefault();
    //same as the last step of the enter button
    //set the display to none for the input and erase its value
    _input.style.display = "none";
    _input.value = "";
  }
}, false);
