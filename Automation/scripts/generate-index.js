const { execSync } = require("child_process");
const path = require("path");

const scripts = [
    "generate-guides.js",
    "generate-projects.js",
    "validate-links.js"
];

const scriptPath = path.join(__dirname);

for (const script of scripts) {
    const file = path.join(scriptPath, script);

    try {
        console.log(`Running ${script}...`);

        execSync(
            `node "${file}"`,
            {
                stdio: "inherit"
            }
        );

    } catch (error) {
        console.error(
            `Failed: ${script}`
        );

        process.exit(1);
    }
}

console.log(
    "All automation tasks completed."
);