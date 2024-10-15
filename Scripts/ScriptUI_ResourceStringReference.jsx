// Reference script to create palette with resource string elements
// Provided by CreativeDojo.net

{
    function myScript(thisObj) {
       function myScript_buildUI(thisObj) {
                 var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Panel Name", [0, 0, 300, 300]);
 
                 res = "group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                         myGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                             myStaticText: StaticText{text:'StaticText Text'},\
                             myEditText: EditText{text:'EditText text'},\
                             myButton: Button{text:'Button Text'},\
                         },\
                         myPanel: Panel{text:'Panel Name', orientation:'row', alignChildren:['left', 'fill'],\
                             myCheckbox: Checkbox{text:'Checkbox Text'},\
                             myRadioButton: RadioButton{text:'RadioButton Text'},\
                             mySlider: Slider{value:50,minvalue:0, maxvalue:75},\
                         },\
                         myDropDownList: DropDownList{properties:{items:['Item 1', 'Item 2', 'Item 3', 'Item 4']}},\
                         myProgressBar: Progressbar{text:'Progressbar Text', minvalue:0, maxvalue:100, value:25},\
                         myListBox: ListBox{properties:{items:['Item 1', 'Item 2', 'Item 3', 'Item 4']}},\
                         myTabbedPanel: Panel{type:'tabbedpanel', orientation:'left', alignChildren:['left', 'fill'],\
                             myTab1: Panel{type:'tab', text:'Tab 1', orientation:'column', alignChildren:['left', 'center'],\
                                 tabStaticText: StaticText{text:'This is tab 1'},\
                                 tabButton1: Button{text:'Button Text'},\
                             },\
                             myTab2: Panel{type:'tab', text:'Tab 2', orientation:'column', alignChildren:['left', 'center'],\
                                 tabStaticText: StaticText{text:'This is tab 2'},\
                                 tabButton2: Button{text:'Button Text'},\
                             },\
                         },\
                 }"
 
                 // Adds resource string to panel
                 myPanel.grp = myPanel.add(res);
 
                 // DropDownList default selection
                 myPanel.grp.myDropDownList.selection = 2; /// Dropdown index starts at 0
 
                 // Assign function to UI elements
 
 
                 // Setup panel sizing and make panel resizable
                 myPanel.layout.layout(true);
                 myPanel.grp.minimumSize = myPanel.grp.size;
                 myPanel.layout.resize();
                 myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}
 
                 return myPanel;
       }
 
       // Build script panel
       var myScriptPal = myScript_buildUI(thisObj);
 
       if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
           myScriptPal.center();
           myScriptPal.show();
        }
    }
 
    // Execute script
    myScript(this);
 }