import { OboriaExtensionID } from './extensions/index.js'
import models from './data/models.js';

const modelsNames = Object.keys(models)

const initViewerWithDocument = doc => { 
    const config = {
      extensions: [OboriaExtensionID]

  };
  
  var myViewerDiv = document.getElementById('preview');
  var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv, config);
  
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

