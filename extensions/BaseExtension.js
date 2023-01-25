export class BaseExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }
    async load() {
        this._dataVizExt = await this.viewer.loadExtension('Autodesk.DataVisualization');
        return true;
    }
    unload() {
        this._dataVizExt = null;
        return true;
    }
    activate() {
        return true;
    }
    deactivate() {
        return true;
    }

}
const ToolbarGroupID = 'oboria-toolbar';

export class UIBaseExtension extends BaseExtension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = undefined;
        this._button = undefined;
    }
    unload() {
        super.unload();
        this.removeToolbarButton();
        return true;
    }
    activate() {
        var _a;
        super.activate();
        (_a = this._button) === null || _a === void 0 ? void 0 : _a.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
        this.activeStatus = true; // TODO: update @types/forge-viewer
        return true;
    }
    deactivate() {
        var _a;
        super.deactivate();
        (_a = this._button) === null || _a === void 0 ? void 0 : _a.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
        this.activeStatus = false; // TODO: update @types/forge-viewer
        return true;
    }
    createToolbarButton(buttonId, buttonTooltip, buttonIconUrl) {
        this._group = this.viewer.toolbar.getControl(ToolbarGroupID);
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup(ToolbarGroupID);
            this.viewer.toolbar.addControl(this._group);
        }
        this._button = new Autodesk.Viewing.UI.Button(buttonId);
        this._button.onClick = (ev) => {
            this.setActive(!this.isActive(''), '');            
        };
        const icon = this._button.container.querySelector('.adsk-button-icon'); // TODO: update @types/forge-viewer
        if (icon) {
            icon.style.backgroundImage = `url(${buttonIconUrl})`;
            icon.style.backgroundSize = `24px`;
            icon.style.backgroundRepeat = `no-repeat`;
            icon.style.backgroundPosition = `center`;
        }
        this._button.setToolTip(buttonTooltip);
        this._group.addControl(this._button);
    }
    removeToolbarButton() {
        if (this._group && this._button) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
            this._button = undefined;
            this._group = undefined;
        }
    }
}