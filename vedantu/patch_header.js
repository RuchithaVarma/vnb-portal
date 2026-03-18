const fs = require('fs');
const path = require('path');

const headerPath = path.resolve(__dirname, 'src/components/Header.tsx');
let content = fs.readFileSync(headerPath, 'utf8');

// Desktop
const desktopRegex = /(<Link[\s\S]*?href="\/signin"[\s\S]*?>\s*Sign In\s*<\/Link>\s*)(<Link[\s\S]*?href="\/trial"[\s\S]*?>\s*Book FREE Trial\s*<\/Link>)/;

const desktopRegister = `<Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer text-sm shadow-md shadow-blue-500/10"
                >
                  Register
                </Link>
                `;

content = content.replace(desktopRegex, `$1${desktopRegister}$2`);


// Mobile
const mobileRegex = /(<Link[\s\S]*?href="\/signin"[\s\S]*?>\s*Sign In\s*<\/Link>\s*)(<Link[\s\S]*?href="\/trial"[\s\S]*?>\s*Book FREE Trial\s*<\/Link>)/;

const mobileRegister = `<Link
                      href="/register"
                      className="text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                    >
                      Register
                    </Link>
                    `;

content = content.replace(mobileRegex, `$1${mobileRegister}$2`);

fs.writeFileSync(headerPath, content, 'utf8');
console.log("Header correctly patched.");
