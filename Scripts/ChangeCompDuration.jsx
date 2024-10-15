/*
This script globally changes the frame rate for each composition in the project. Copy the .JSX file to the following location:
C:\Program Files\Adobe\Adobe After Effects 2022\Support Files\Scripts
*/

var project = app.project;
var comp = project.activeItem;

//Predefined Values
var compDuration = 30;
var framesPerSec = 30;
var dropFrameToggle = false;

//UI Main Window
var mainWindow = new Window("palette", "Change Comp Frame Rates", undefined);
mainWindow.orientation = "column";

//UI Group One
var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.add("statictext", undefined, "New Duration:");
var newCompDuration = groupOne.add("edittext", undefined, "eg: 30");
newCompDuration.characters = 8;
newCompDuration.helpTip = "Please input a duration between 0 and 999.";

//UI Group Two
var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
groupTwo.add("statictext", undefined, "New FPS:");
var newFramesPerSec = groupTwo.add("edittext", undefined, "eg: 30");
newFramesPerSec.characters = 8;
newFramesPerSec.helpTip = "Please input a frame rate between 0 and 999.";

//UI Group Three
var groupThree = mainWindow.add("group", undefined, "groupThree");
groupThree.orientation = "row";
var dropCheck = groupThree.add("checkbox", undefined, "Drop-Frame");
dropCheck.helpTip = "Check this box for non-integer (drop-frame) frame rates.";

//UI Group Four
var groupFour = mainWindow.add("group", undefined, "groupFour");
groupFour.orientation = "row";
var frameButton = groupFour.add("button", undefined, "Change");
var cancelButton = groupFour.add("button", undefined, "Close")

//Initialise
mainWindow.center();
mainWindow.show();

//Function
frameButton.onClick = function() {
//Validation
if(isNaN(newCompDuration.text) || parseInt(newCompDuration.text) >= 999 || isNaN(newFramesPerSec.text) || parseInt(newFramesPerSec.text) >= 999){
  alert("Please input a range between 0 and 999.");
  return false;
} else {
//Change FPS
app.beginUndoGroup("Comp set values");    
for(var i = 1; i <= project.numItems; i++) {
  if(project.item(i) instanceof CompItem) {
    compDuration = newCompDuration.text;
    framesPerSec = newFramesPerSec.text;
    project.item(i).duration = compDuration;
    project.item(i).dropFrame = dropCheck.value;
    project.item(i).frameRate = framesPerSec;
  }
}
app.endUndoGroup("Comp set values");
mainWindow.close();
}
}
//Close
cancelButton.onClick = function(){
  mainWindow.close();
}

