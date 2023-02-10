import { OboriaExtension, OboriaDataExtensionID } from './OboriaDataExtension.js';

Autodesk.Viewing.theExtensionManager.registerExtension(OboriaDataExtensionID, OboriaDataExtension);


export {
    OboriaDataExtensionID
};