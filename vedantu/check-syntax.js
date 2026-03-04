const fs = require('fs');
const content = fs.readFileSync('./src/app/admin/schedule/page.tsx', 'utf8');

// Count opening and closing braces
const openBraces = (content.match(/{/g) || []).length;
const closeBraces = (content.match(/}/g) || []).length;
const openParens = (content.match(/\(/g) || []).length;
const closeParens = (content.match(/\)/g) || []).length;

console.log(`Braces: ${openBraces} open, ${closeBraces} close`);
console.log(`Parentheses: ${openParens} open, ${closeParens} close`);

// Check for JSX issues
const jsxOpen = (content.match(/<[^\/][^>]*[^\/]>/g) || []).length;
const jsxClose = (content.match(/<\/[^>]+>/g) || []).length;
const jsxSelfClose = (content.match(/<[^>]*\/>/g) || []).length;

console.log(`JSX: ${jsxOpen} open tags, ${jsxClose} close tags, ${jsxSelfClose} self-closing`);
