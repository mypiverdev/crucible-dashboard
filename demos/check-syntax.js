const fs = require('fs');
const h = fs.readFileSync(process.argv[2] || 'C:/projects/pmo/demos/cremologix-v2-new.html', 'utf8');
const m = h.match(/<script>([\s\S]*)<\/script>/);
if (!m) {
    console.log('No script tag found');
    process.exit(1);
}
try {
    new Function(m[1]);
    console.log('JS OK - no syntax errors');
} catch(e) {
    console.log('SYNTAX ERROR: ' + e.message);
}
