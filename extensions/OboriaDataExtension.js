import { UIBaseExtension } from './BaseExtension.js';
import { getErrorElements, getWarningElements,getPanelData } from '../data/indexData.js';
import { ModelSummaryPanel} from './BasePanel.js';


export const OboriaDataExtensionID = 'Ext.DataOboria';
export class OboriaDataExtension extends UIBaseExtension{
constructor(viewer,options){
    super(viewer,options);
}


async load() {
    await super.load();
    this._showHideBtn = document.getElementById('showAnnotationDataBtn'); 
    this._showHideBtn.addEventListener('click', ()=> this._toggleState());        
    return true;
}
_toggleState()
    {
        if(this.activeStatus == false)  
        {
            this.activate()            
        }
        else
        {
            this.deactivate()
        } 
    }


}