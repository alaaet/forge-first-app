import { UIBaseExtension } from './BaseExtension.js';
import { getErrorElements, getWarningElements,getSpeakersPanelData, getLuminariesPanelData } from '../data/index.js';
import { ModelSummaryPanel} from './BasePanel.js';
import models from '../data/models.js';


export const OboriaExtensionID = 'Ext.Oboria';
export class OboriaExtension extends UIBaseExtension {
    constructor(viewer, options) {
        super(viewer, options);
        this.luminariesPanelId = "luminaries-panel";
        this.speakersPanelId = "speakers-panel";
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
        const luminaries_panel = document.getElementById(this.luminariesPanelId);
        luminaries_panel.remove();
        const speakers_panel = document.getElementById(this.speakersPanelId);
        speakers_panel.remove();
        return true;
    }
    onToolbarCreated() {
        this.createToolbarButton('oboria-ext-btn', 'Oboria Data', 'https://img.icons8.com/ios-filled/50/null/medium-risk.png');

    }

    _loadModelData() {
        const modelsNames = Object.keys(models)
        var select = document.getElementById('models');
        let luminaries_panel = new ModelSummaryPanel(this.viewer, this.viewer.container, this.luminariesPanelId, `${modelsNames[select.value]} Luminaries`, getLuminariesPanelData(modelsNames[select.value]), {top:10});
        luminaries_panel.setVisible(true);

        let speakers_panel = new ModelSummaryPanel(this.viewer, this.viewer.container, this.speakersPanelId, `${modelsNames[select.value]} Speakers`,getSpeakersPanelData(modelsNames[select.value]), {top:320});
        speakers_panel.setVisible(true);

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