// JavaScript version for easier execution
const fs = require('fs');
const path = require('path');

// Read the seed data
const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));

// Create export commands for each collection
console.log('=== Firebase Data Export ===\n');

Object.entries(seedData).forEach(([collectionName, documents]) => {
  console.log(`// Collection: ${collectionName}`);
  documents.forEach((doc, index) => {
    const docId = `${collectionName}_${index + 1}`;
    console.log(`// ${collectionName}/${docId}`);
    console.log(`db.collection('${collectionName}').doc('${docId}').set(${JSON.stringify(doc, null, 2)});`);
    console.log('');
  });
  console.log('\n' + '='.repeat(50) + '\n');
});

console.log('\nYou can copy these commands and run them in your Firebase console or use them in a Cloud Function.');
