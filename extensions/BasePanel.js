export class ModelSummaryPanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(viewer, container, id, title, options) {
        super(container, id, title, options);
        this.viewer = viewer;
    }


}