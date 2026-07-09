const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../Templates");
const README = path.join(ROOT, "README.md");

const START = "<!-- AUTO_INDEX_START -->";
const END = "<!-- AUTO_INDEX_END -->";


function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function treePrefix(level, last) {

    if (level === 0) {
        return "";
    }


    let prefix = "";


    for (let i = 1; i < level; i++) {

        prefix += "│   ";

    }


    prefix += last ? "└── " : "├── ";

    return prefix;

}



function scanFolder(folder, level = 0) {

    let output = "";


    const items = fs.readdirSync(folder, {
        withFileTypes: true
    })
    .filter(item => item.name !== "README.md")
    .sort((a, b) => {

        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }

        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }

        return a.name.localeCompare(b.name);

    });



    items.forEach((item, index) => {


        const last = index === items.length - 1;


        const fullPath = path.join(
            folder,
            item.name
        );


        const relative = path
            .relative(ROOT, fullPath)
            .replace(/\\/g, "/");


        const prefix = treePrefix(
            level,
            last
        );



        if (item.isDirectory()) {


            output += `<details>\n`;

            output += `<summary>${prefix}📁 <a href="./${relative}">${formatName(item.name)}</a></summary>\n\n`;


            output += scanFolder(
                fullPath,
                level + 1
            );


            output += `</details>\n\n`;

        }



        if (
            item.isFile() &&
            item.name.endsWith(".md")
        ) {

            output += `${prefix}📄 <a href="./${relative}">${formatName(item.name)}</a>\n\n`;

        }

    });


    return output;

}



function updateReadme() {

    let content = fs.readFileSync(
        README,
        "utf8"
    );


    const index = scanFolder(
        ROOT
    );


    content = content.replace(
        new RegExp(`${START}[\\s\\S]*?${END}`),
        `${START}\n\n${index}\n\n${END}`
    );


    fs.writeFileSync(
        README,
        content,
        "utf8"
    );


    console.log(
        "Templates README updated."
    );

}



updateReadme();