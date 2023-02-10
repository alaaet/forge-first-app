import { UIBaseExtension } from './BaseExtension.js';
import { getErrorElements, getWarningElements,getPanelData, getModelLight } from '../data/index.js';
import { ModelSummaryPanel} from './BasePanel.js';
import models from '../data/models.js';



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
        this.createToolbarButton('oboria-ext-btn', 'Oboria Data', 'https://img.icons8.com/dotty/80/null/light-on.png');
        //this.createToolbarButton('oboria-ligth-btn','Oboria Ligth','images/icons8-grid-3-100.png')

    }

    _loadModelData() {
    

        let msP= this.load.name;
        
        let panel = new ModelSummaryPanel(this.viewer, this.viewer.container, 'error-panel', msP,getPanelData());

        //let panel = new ModelSummaryPanel()
        panel.setVisible(true);
        
        
        //panel.addProperty('Key 1', 'Value 1', 'Category 1');
        /*
        panel.addProperty('Key 1', 'Value 1', 'Category 1');
        panel.addProperty('Key 2', 'Value 2', 'Category 1');
        panel.addProperty('Key 3', 'Value 3', 'Category 1');
        panel.addProperty('Key A', 'Value A', 'Category 2');*/

        // ALL Extension code should be here

       /*  getWarningElements().forEach(element => {
            this.viewer.search(element.id, dbId => {             
                this.viewer.setThemingColor(dbId, element.color);
                })
        });

        getErrorElements().forEach(element => {
            this.viewer.search(element.id, dbId => {             
                this.viewer.setThemingColor(dbId, element.color);
                })
        }); */
       

    }


}