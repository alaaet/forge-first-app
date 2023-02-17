import { OboriaExtensionID } from './extensions/index.js'
import models from './data/models.js';

const modelsNames = Object.keys(models)
let viewer;
const searchResultsMaxSize = 100;

const initViewerWithDocument = doc => { 
    const config = {
      extensions: [OboriaExtensionID]

  };
  
  var myViewerDiv = document.getElementById('preview');
  viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv, config);
  
  var options = {
    'env': 'Local',
    'document': doc
  };
  Autodesk.Viewing.Initializer(options, function () {
      viewer.start(options.document, options);
      viewer.setTheme('light-theme');
      viewer.navigation.setReverseZoomDirection(true)
  });
}

// initialize the viewer with the first model available
initViewerWithDocument(models[modelsNames[0]])


var select = document.getElementById('models');

for (var i = 0; i<modelsNames.length; i++){
  var opt = document.createElement('option');
  opt.value = i;
  opt.innerHTML = modelsNames[i];
  if (i == 0) opt.selected = true;
  select.appendChild(opt);
}
  
select.addEventListener("change", function () {
  initViewerWithDocument(models[modelsNames[select.value]])
});

var searchBtn = document.getElementById('search_btn'); 
var searchData = document.getElementById('search_data'); 
searchBtn.addEventListener('click', () => {
  if (searchData.value === "") {
    alert("please enter a search term")
    return
  }
  if (viewer) {
    
    viewer.search(searchData.value, dbId => {  
      if (Array.isArray(dbId))
      { 
        let arr = [...dbId]
        if (arr.length > searchResultsMaxSize) arr.length = searchResultsMaxSize;
        console.log(arr)
        viewer.select(arr);
        var box = viewer.utilities.getBoundingBox();
        box.expandByScalar( 2 );
        viewer.isolate(arr);
        viewer.navigation.fitBounds(true,box,false,false)
      }

    }, err => { 
      alert(err)
    }, {includeInherited:true})
  }
}); 