const { execSync } = require("child_process");
const path = require("path");


const SCRIPTS = [
    "generate-templates.js",
    "generate-guides.js",
    "generate-projects.js",
    "generate-root.js",
    "validate-links.js"
];


const SCRIPT_DIR = __dirname;



function run(script) {

    const file = path.join(
        SCRIPT_DIR,
        script
    );


    console.log(
        `\nRunning ${script}...\n`
    );


    execSync(
        `node "${file}"`,
        {
            stdio: "inherit"
        }
    );

}



function main() {

    try {

        for (const script of SCRIPTS) {

            run(script);

        }


        console.log(
            "\nNotebook build completed successfully."
        );


    } catch (error) {

        console.error(
            "\nBuild failed."
        );


        process.exit(1);

    }

}



main();