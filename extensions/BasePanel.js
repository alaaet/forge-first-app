export class ModelSummaryPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(viewer, container, id, title,contentJSON,options) {
        super(container, id, title, options);
        const { top } = options;
        this.viewer = viewer;
        if (top !== undefined) this.container.style.top = `${top}px`;
        console.log("TOP: "+top)
        this.loadContent(contentJSON);
    }

    initialize() { 
        this.title = this.createTitleBar(this.titleLabel || this.container.id);
        this.initializeMoveHandlers(this.title);
        this.container.appendChild(this.title);
        this.container.style.width = "300px";
        this.container.style.resize = "auto";
        this.container.style.height = '300px';        

    }

    loadContent(json) { 
        let categoryIds = [];
        let propertyIds = [];
        let html = [
            '<div class="treeview">'
        ]
        for (const category in json) {
            //console.log(json[category])
            if (json.hasOwnProperty(category)) {
                categoryIds.push("g_"+category.replace(" ","_"));
                html.push(
                    `<group id="g_${category.replace(" ","_")}" class="category expanded" lmv-nodeid="${category}">`,
                    '<lmvheader>',
                    '<icon></icon>',
                    `<div title="${category}" class="category-name">${category}</div>`,
                    '</lmvheader>');
                
                // add properties
                for (const property in json[category]){
                    if (json[category].hasOwnProperty(property)) {
                        propertyIds.push(property)
                        let bgColor = json[category][property] === "error" ? "rgba(255, 0, 0, 0.3)" : "rgba(255, 255, 127, 0.3)";
                        html.push(
                            `<leaf class="expanded property" lmv-nodeid="${property} Data">`,
                            '<lmvheader>',
                            '<icon></icon>',
                            `<div id="${property}" title="${property}" class="property-name aggregate-name">${property}</div>`,
                            '<div class="separator"></div>',
                            `<div title="" class="property-value" style=" color:black; background: ${bgColor}; ">${json[category][property]}</div>`,
                            '</lmvheader>',
                            '</leaf>'
                        );
                    }
                  }
                // finished adding properties
                html.push('</leaf>');
            }
            html.push('</group>');
        }        
        html.push('</div>');
        this.scrollContainer.innerHTML = html.join('\n');
        
        let fitToView = (selectorFun, ev) => { 
            let revitId = selectorFun(ev);
            this.viewer.search(revitId, dbId => {
                this.viewer.fitToView(dbId);
                this.viewer.select(dbId);
                this.viewer.isolate(dbId);
            })  
        }


        // add an event listener to handle collapsing
        document.addEventListener("click", function (e) {
            
            for (let i = 0; i < categoryIds.length; i++) {
                if (e.target.id === categoryIds[i] // the category element
                    || e.target.parentNode === document.querySelector("#" + categoryIds[i]) // a direct child
                    || e.target.parentNode.parentNode === document.querySelector("#"+categoryIds[i])) // a child of a child
                {
                    document.getElementById(categoryIds[i]).classList.toggle("expanded");
                    document.getElementById(categoryIds[i]).classList.toggle("collapsed");
                }
            }
        });
        
        // add an event listener to handle clicking on panel items
        document.addEventListener("click", fitToView.bind(null, function (e) {
            for (let i = 0; i < propertyIds.length; i++) {
                if (e.target.id === propertyIds[i]) return propertyIds[i]
            }
        }), false);


    }



    

}