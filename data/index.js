import db from './db.js';
import light from './light.js';
import models from './models.js';
//console.log("JSON Data:"+JSON.stringify(db))
const _intensity = 0.5;
const errorColor = new THREE.Vector4(1.0, 0, 0, _intensity);
const warningColor = new THREE.Vector4(1.0, 1.0, 0.5, _intensity);

export function getErrorElements() { 
    let errors = [""];
    for (const elm in db) {
        if (db.hasOwnProperty(elm)) {
            errors.push( ...db[elm].error.map(id => {return { id: id, color: errorColor }; }))
         }
    }
    return errors
}

export function getWarningElements() { 
    let warnings = [];
    for (const elm in db) {
        if (db.hasOwnProperty(elm)) {
            warnings.push( ...db[elm].warning.map(id => {return { id: id, color: warningColor }; }))
         }
    }
    return warnings
}

export function getPanelData() { 
    let json = {};
    for (const elm in db) {
        
        if (db.hasOwnProperty(elm)) {
            json[elm] = {
                ...db[elm].error.reduce((o, id) => ({ ...o, [id]: "error" }), {}),
                ...db[elm].warning.reduce((o, id) => ({ ...o, [id]: "warning" }), {})
            }
         }
    }
    return json;
}

export function getModelLight(){

    let json = {};

    for (const el in light){
        json[el] = {'advios':'jhstd'}
    }
    
    return json//={'hola':{'advios':'jhstd'}};
}