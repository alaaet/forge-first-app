import db from './db.js';
console.log("JSON Data:"+JSON.stringify(db))
const _intensity = 0.5;
// const color = new THREE.Color();
// color.setHSL(1, 1.0, 0.5);
const errorColor = new THREE.Vector4(1.0, 1.0, 0.5, _intensity);
const warningColor = new THREE.Vector4(1.0,0,0, _intensity);

export function getErrorElements() { 

    return db.error.map(id => {return { id: id, color: errorColor }; })
}

export function getWarningElements() { 

    return db.warning.map(id => {return { id: id, color: warningColor }; })
}