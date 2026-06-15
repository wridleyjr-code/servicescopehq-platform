const fs = require('fs');

const content = fs.readFileSync('../data/niches.json', 'utf8');
const lines = content.split('\n');
const headLines = [];
let inConflict = false;
let keep = true;

for (const line of lines) {
    if (line.startsWith('<<<<<<<')) {
        inConflict = true;
        keep = true;
        continue;
    }
    if (line.startsWith('=======')) {
        keep = false;
        continue;
    }
    if (line.startsWith('>>>>>>>')) {
        inConflict = false;
        keep = true;
        continue;
    }
    if (keep) {
        headLines.push(line);
    }
}

const headJson = headLines.join('\n');
try {
    const data = JSON.parse(headJson);
    fs.writeFileSync('../data.js', 'const localDatabase = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log("Success HEAD");
} catch (e) {
    console.log("Failed HEAD parse:", e.message);
    // Write out the raw JSON to check where it failed
    fs.writeFileSync('failed.json', headJson);
}
