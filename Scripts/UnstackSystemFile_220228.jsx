
//SETUP
var myFile = app.project.activeItem;

//VALIDATE
if(!myFile || myFile.typeName !== "Footage"){
  alert("Please select a footage item.");
} else {

app.beginUndoGroup("Undo1");
app.executeCommand(app.findMenuCommandId("New Comp from Selection"));
var myComp = app.project.activeItem;
var myFolder = app.project.items.addFolder("_UNSTACK_ScriptFolder");

myFile.parentFolder = myFolder;
myComp.parentFolder = myFolder;
app.endUndoGroup();

//INITIAL VARIABLES

var fileWidth = myFile.width;
var fileHeight = myFile.height;

var clubPresets = {
  "SampleStadiumSystem": [2, 164, 2],
  //"Club/Stadium Name" : [<ModuleType>, <ModuleCount>, <Offset>]
  }

var presetKeys = [];

for (var key in clubPresets) {
    presetKeys.push(key);
}

//USER INTERFACE

//UI Main Window
var mainWindow = new Window("palette", "AIM - Unstack System File", undefined);
mainWindow.orientation = "column";

//UI Preset Instructions
var groupPresetInstructions = mainWindow.add("group", undefined, "groupPresetInstructions");
groupPresetInstructions.orientation = "column";
var instructionsPanel = groupPresetInstructions.add("panel", undefined, "Instructions",{borderStyle:'gray'});
instructionsPanel.add("statictext", [0,0,240,30], "- Select a preset and click 'Load Preset' button.\r- Alternatively enter custom input values.", {multiline: true, justify: 'left'});

//UI Select Preset
var groupSelectPreset = mainWindow.add("group", undefined, "groupSelectPreset");
groupSelectPreset.orientation = "row";
groupSelectPreset.add("statictext", undefined, "Select Preset:");
var selectPresetInput = groupSelectPreset.add("dropdownlist", undefined, presetKeys);
selectPresetInput.selection = 0;
selectPresetInput.helpTip = "Please select a preset.";

//UI Preset Load
var groupLoadPreset = mainWindow.add("group", undefined, "groupLoadPreset");
groupLoadPreset.orientation = "row";
var loadPresetButton = groupLoadPreset.add("button", undefined, "Load Preset");

//UI Group One
var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.add("statictext", undefined, "Module Width:");
var moduleWidthInput = groupOne.add("dropdownlist", undefined, ["120", "144", "240", "288"]);
moduleWidthInput.selection = 2;
moduleWidthInput.helpTip = "Please select 120, 144, 240 or 288 pixels.";

//UI Group Two
var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
groupTwo.add("statictext", undefined, "Number of Modules:");
var numModulesInput = groupTwo.add("edittext", undefined, "164");
numModulesInput.characters = 4;
numModulesInput.helpTip = "Please input number between 0 and 199.";

//UI Group Three
var groupThree = mainWindow.add("group", undefined, "groupThree");
groupThree.orientation = "row";
groupThree.add("statictext", undefined, "Starting Offset:");
var offsetNumModulesInput = groupThree.add("edittext", undefined, "0");
offsetNumModulesInput.characters = 4;
offsetNumModulesInput.helpTip = "Please input number between 0 and 199.";

//UI Group Six
var groupSix = mainWindow.add("group", undefined, "groupSix");
groupSix.orientation = "row";
var unstackButton = groupSix.add("button", undefined, "Unstack");
var cancelButton = groupSix.add("button", undefined, "Close")

//INITIALISE
mainWindow.center();
mainWindow.show();

//LOAD PRESET
loadPresetButton.onClick = function() {
  var presetArray = clubPresets[selectPresetInput.selection.text];
  moduleWidthInput.selection = presetArray[0];
  numModulesInput.text = presetArray[1]
  offsetNumModulesInput.text = presetArray[2];
}

//EXECUTION BLOCK
unstackButton.onClick = function() {

app.beginUndoGroup("Undo2");

//System Variables
var moduleWidth = parseInt(moduleWidthInput.selection.text);

var moduleHeight;
if (moduleWidth === 120 || moduleWidth === 144) {
    moduleHeight = 72;
  } else {
    moduleHeight = 144;
}

var numModules = numModulesInput.text;

//Comp Variables
var systemLength = (moduleWidth*numModules);
var compWidth = systemLength;
var compHalfWidth = (systemLength/2);
var compHeight = moduleHeight;
  
//Offset
var offsetNumModules = parseInt(offsetNumModulesInput.text);
var compOffset = moduleWidth*offsetNumModules;

//Mask
var fileMask;
if (moduleWidth === 144) {
    fileMask = 48;
  } else if (moduleWidth === 288) {
    fileMask = 96;
  } else {
    fileMask = 0;
}


//INPUT VALIDATION
if(isNaN(numModulesInput.text) || parseInt(numModulesInput.text) >= 199){
  alert("Please select a module count between 0 and 199.");
  return false;
} 
if(isNaN(offsetNumModulesInput.text) || parseInt(offsetNumModulesInput.text) >= 199){
  alert("Please select a offset module count between 0 and 199.");
  return false;
}

//LOGIC
if(systemLength <= 30000) {

  myComp.name = 'UNSTACK';
  
  //Comp Properties
  myComp.width = compWidth;
  myComp.height = compHeight;

  //Layer Setup
  var myLayer = myComp.layer(1);
  myLayer.transform.anchorPoint.setValue([0,0]);
  myLayer.transform.position.setValue([(-compOffset),0]);

  //Layer Duplicate
  for(var i = 1; i <= 15; i++) {
  var dupLayer =  myComp.layer(i).duplicate();
  dupLayer.transform.position.setValue([((fileWidth - fileMask) * i) - compOffset,(-compHeight * i)]);
  dupLayer.moveToBeginning();
  }
  
  mainWindow.close();
  app.endUndoGroup();

} else {

  myComp.name = 'UNSTACK_LEFT';

  //Comp Properties
  myComp.width = compHalfWidth;
  myComp.height = compHeight;

  //Layer Setup
  var myLayer = myComp.layer(1);
  myLayer.transform.anchorPoint.setValue([0,0]);
  myLayer.transform.position.setValue([(-compOffset),0]);

  //Layer Duplicate
  for(var i = 1; i <= 15; i++) {
  var dupLayer =  myComp.layer(i).duplicate();
  dupLayer.transform.position.setValue([((fileWidth - fileMask) * i) - compOffset,(-compHeight * i)]);
  dupLayer.moveToBeginning();
  }

  //Comp Duplicate
  var dupComp = myComp.duplicate();
  dupComp.name = 'UNSTACK_RIGHT';

  for(var j = 1; j <= dupComp.numLayers; j++) {
    var xPos = dupComp.layer(j).position.value[0];
    var yPos = dupComp.layer(j).position.value[1];
    dupComp.layer(j).transform.position.setValue([(xPos-compHalfWidth),yPos]);
  }

  mainWindow.close();
  app.endUndoGroup();
  }
}

//CLOSE
cancelButton.onClick = function(){
  mainWindow.close();
}

}