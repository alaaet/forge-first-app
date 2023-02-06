import { UIBaseExtension } from './BaseExtension.js';
import { getErrorElements, getWarningElements,getPanelData } from '../data/index.js';
import { ModelSummaryPanel} from './BasePanel.js';

export const OboriaExtensionID = 'Ext.Oboria';
export class OboriaExtension extends UIBaseExtension {
    constructor(viewer, options) {
        super(viewer, options);
    }
    
    async load() {
        await super.load();
        this._showHideBtn = document.getElementById('showAnnotationBtn'); 
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

    unload() {
        super.unload();
        this._showHideBtn.removeEventListener('click', this._toggleState())
        return true;
    }
    activate() {
        super.activate();
        this._showHideBtn.innerText = 'Hide annotation'
        this._loadModelData();
        return true;
    }
    deactivate() {
        super.deactivate();
        this._showHideBtn.innerText = 'Show annotation'
        this.viewer.clearThemingColors();
        const panel = document.getElementById("error-panel");
        panel.remove();
        return true;
    }
    onToolbarCreated() {
        this.createToolbarButton('oboria-ext-btn', 'Oboria Data', 'https://img.icons8.com/ios-filled/50/null/medium-risk.png');

    }

    _loadModelData() {
    
        let panel = new ModelSummaryPanel(this.viewer, this.viewer.container, 'error-panel', 'Errors Panel',getPanelData());
        panel.setVisible(true);

        //panel.addProperty('Key 1', 'Value 1', 'Category 1');
        /*
        panel.addProperty('Key 1', 'Value 1', 'Category 1');
        panel.addProperty('Key 2', 'Value 2', 'Category 1');
        panel.addProperty('Key 3', 'Value 3', 'Category 1');
        panel.addProperty('Key A', 'Value A', 'Category 2');*/

        // ALL Extension code should be here

        getWarningElements().forEach(element => {
            this.viewer.search(element.id, dbId => {             
                this.viewer.setThemingColor(dbId, element.color);
                })
        });
        
        getErrorElements().forEach(element => {
            this.viewer.search(element.id, dbId => {             
                this.viewer.setThemingColor(dbId, element.color);
                })
        });


    }


}