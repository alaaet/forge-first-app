import { OboriaExtension, OboriaExtensionID } from './OboriaExtension.js';

Autodesk.Viewing.theExtensionManager.registerExtension(OboriaExtensionID, OboriaExtension);


export {
    OboriaExtensionID
};