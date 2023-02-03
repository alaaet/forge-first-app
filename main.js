import { OboriaExtensionID } from './extensions/index.js'
const config = {
    extensions: [OboriaExtensionID]
  };
  var myViewerDiv = document.getElementById('preview');
  var viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv,config);
  var options = {
    'env': 'Local',
    //'document': './model2/output.svf'
    //'document': './model/Resource/3D View/{3D} 345847/{3D}.svf'
    'document': './model2/Resource/3D View/3D/3D.svf'
    //   'document': './shaver/0.svf'
  };
  Autodesk.Viewing.Initializer(options, function () {
      viewer.start(options.document, options);
      viewer.setTheme('light-theme');
      viewer.navigation.setReverseZoomDirection(true)
  });