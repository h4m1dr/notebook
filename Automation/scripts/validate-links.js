const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../");


const IGNORE = [
    ".git",
    "node_modules"
];



function getMarkdownFiles(dir) {

    let files = [];


    const items = fs.readdirSync(dir, {
        withFileTypes: true
    });


    for (const item of items) {

        if (IGNORE.includes(item.name)) {
            continue;
        }


        const fullPath = path.join(
            dir,
            item.name
        );


        if (item.isDirectory()) {

            files = files.concat(
                getMarkdownFiles(fullPath)
            );

        }


        if (
            item.isFile() &&
            item.name.endsWith(".md")
        ) {

            files.push(fullPath);

        }

    }


    return files;

}



function extractLinks(content) {

    const regex = /\]\((.*?)\)/g;

    let links = [];

    let match;


    while ((match = regex.exec(content)) !== null) {

        links.push(match[1]);

    }


    return links;

}



function validateFile(file) {

    const content = fs.readFileSync(
        file,
        "utf8"
    );


    const links = extractLinks(content);


    let errors = [];


    for (const link of links) {

        if (
            link.startsWith("http") ||
            link.startsWith("#")
        ) {
            continue;
        }


        const target = path.resolve(
            path.dirname(file),
            link
        );


        if (!fs.existsSync(target)) {

            errors.push({
                file,
                link
            });

        }

    }


    return errors;

}



function validate() {

    const markdownFiles = getMarkdownFiles(ROOT);

    let errors = [];


    for (const file of markdownFiles) {

        errors = errors.concat(
            validateFile(file)
        );

    }


    return errors;

}



const errors = validate();



if (errors.length > 0) {

    console.log(
        "\nBroken links found:\n"
    );


    for (const error of errors) {

        console.log(
            `${error.file}`
        );

        console.log(
            ` -> ${error.link}\n`
        );

    }


    process.exit(1);

}



console.log(
    "All links are valid."
);