
app.beginUndoGroup("Undo1");

var moduleWidth = 240;
var moduleHeight = 144;
var numModules = 164;
var oddModules;

if (numModules % 2 === 1) {
  numModules += 1;
  oddModules = true;
  } else {
  oddModules = false;
}

alert(oddModules);

var moduleFolder = app.project.items.addFolder("_SYSTEM-BUILDER_ScriptFolder");
var moduleComp = app.project.items.addComp('ModuleComp_' + moduleWidth + 'x' + moduleHeight, moduleWidth, moduleHeight, 1, 60, 60);
moduleComp.parentFolder = moduleFolder;
moduleComp.layers.addSolid([1,1,1], 'BkgdWht', moduleWidth, moduleHeight, 1, 60);
moduleComp.layers.addSolid([1,0,1], 'BkgdMag', moduleWidth-2, moduleHeight-2, 1, 60);

//TEXT
//var myTextDoc = new TextDocument('Test Text');
var myTextLayer = moduleComp.layers.addText('001');
var myTextProp = myTextLayer.property("ADBE Text Properties").property("ADBE Text Document")
var myTextDoc = myTextProp.value;

myTextDoc.font = "Montserrat-Bold";
myTextDoc.fontSize = moduleHeight/1.2;
myTextDoc.applyFill = true;
myTextDoc.applyStroke = false;
myTextDoc.tracking = 0;
myTextDoc.fillColor = [1,1,1];
myTextDoc.justification = ParagraphJustification.CENTER_JUSTIFY;


myTextProp.setValue(myTextDoc);
myTextLayer.position.setValue([(moduleWidth/2),(moduleHeight/1.25)]);
myTextProp.expression = 'Math.round(time*60+1)';
//alert(myTextDoc.font);

//SYSTEM
if((moduleWidth*numModules) <= 30000) {
    var systemComp = app.project.items.addComp('SystemComp_' + (moduleWidth*numModules) + 'x' + moduleHeight, (moduleWidth*numModules), moduleHeight, 1, 60, 60);
    systemComp.parentFolder = moduleFolder;
  } else {
    var systemComp = app.project.items.addComp('SystemComp_' + (moduleWidth*numModules/2) + 'x' + (moduleHeight*2), (moduleWidth*numModules/2), (moduleHeight*2), 1, 60, 60);
    systemComp.parentFolder = moduleFolder;
  }

//LAYER SETUP
var moduleLayer = systemComp.layers.add(moduleComp);
moduleLayer.anchorPoint.setValue([0,0]);
moduleLayer.position.setValue([0,0]);

//LOOP 
for(var i = 1; i <= (numModules-1); i++) {
  var dupLayer =  systemComp.layer(i).duplicate();
  dupLayer.transform.position.setValue([(moduleWidth*i),0]);
  dupLayer.startTime = (-i/60);
  dupLayer.moveToBeginning();
  if(dupLayer.position.value[0] >= systemComp.width && numModules % 2 === 0) {
      dupLayer.transform.position.setValue([(moduleWidth*i)-systemComp.width, moduleHeight]);
    } else {
        continue;
      };
  //dupLayer.timeRemap.addKey(0);
}

//dupLayer.property("ADBE Time Remapping").addKey(0);
alert(dupLayer.canSetTimeRemapEnabled);
alert(dupLayer.timeRemap.value)
//dupLayer.timeRemap.value.s  GetValueAtTime(0,0);

//ODD MODULE ADJUST
if(oddModules) {
    dupLayer.remove()
  }

//CREAT 6MM COMPS
if(moduleHeight === 144) {
    if(oddModules) {
        numModules -= 1;
      }
    var systemCompLeft = app.project.items.addComp('SystemComp_' + ((moduleWidth*numModules)/2) + 'x' + moduleHeight + '_Left', ((moduleWidth*numModules)/2), moduleHeight, 1, 60, 60);
    systemCompLeft.parentFolder = moduleFolder;
    var systemCompRight = app.project.items.addComp('SystemComp_' + ((moduleWidth*numModules)/2) + 'x' + moduleHeight + '_Right', ((moduleWidth*numModules)/2), moduleHeight, 1, 60, 60);
    systemCompRight.parentFolder = moduleFolder;
    //ADD COMPS
    var leftCompLayer = systemCompLeft.layers.add(systemComp);
    leftCompLayer.anchorPoint.setValue([0,0]);
    leftCompLayer.position.setValue([0,0]);
    var rightCompLayer = systemCompRight.layers.add(systemComp);
    rightCompLayer.anchorPoint.setValue([0,0]);
    rightCompLayer.position.setValue([(systemComp.width-systemCompRight.width)-systemComp.width,0]);
    var dupRightCompLayer =  rightCompLayer.duplicate();
    dupRightCompLayer.position.setValue([(systemComp.width-systemCompRight.width),-144]);
  }

app.endUndoGroup;



/*
var textLayer = comp1_comp.layers.addText("This is BOLD");
var textLayer_TextProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
var textLayer_TextDocument = textLayer_TextProp.value;

textLayer_TextDocument.font = "Arial-BoldMT";
textLayer_TextDocument.fontSize = 36;
textLayer_TextDocument.applyFill = true;
textLayer_TextDocument.fillColor = [0.29019600152969, 0.6941180229187, 0.835294008255];
textLayer_TextDocument.applyStroke = false;
textLayer_TextDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
textLayer_TextDocument.tracking = 30;
if (parseFloat(app.version) >= 13.2) {
	textLayer_TextDocument.verticalScale = 1;
	textLayer_TextDocument.horizontalScale = 1;
	textLayer_TextDocument.baselineShift = 0;
	textLayer_TextDocument.tsume = 0;
	// These values are read-only. You have to set them manually in the comp.
	// textLayer_TextDocument.fauxBold = false;
	// textLayer_TextDocument.fauxItalic = false;
	// textLayer_TextDocument.allCaps = false;
	// textLayer_TextDocument.smallCaps = false;
	// textLayer_TextDocument.superscript = false;
	// textLayer_TextDocument.subscript = false;
}
textLayer_TextProp.setValue(textLayer_TextDocument);
*/