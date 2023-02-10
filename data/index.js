import db from './db.js';
import luminaries from './moons_luminaries.js';
import speakers from './moons_speakers.js';

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

export function getLuminariesPanelData(moon) { 
    let json = {};

    if (luminaries.hasOwnProperty(moon)) {
        for (const elm in luminaries[moon])
        { 
            if (luminaries[moon].hasOwnProperty(elm))
            {
                json[elm] = luminaries[moon][elm].reduce((o, id) => ({ ...o, [id]: "N/A" }), {})                
            }
        }
    }
    
    return json;
}

export function getSpeakersPanelData(moon) { 
    let json = {};

    if (speakers.hasOwnProperty(moon)) {
        for (const elm in speakers[moon])
        { 
            if (speakers[moon].hasOwnProperty(elm))
            {
                json[elm] = speakers[moon][elm].reduce((o, id) => ({ ...o, [id]: "N/A" }), {})                
            }
        }
    }
    
    return json;
}