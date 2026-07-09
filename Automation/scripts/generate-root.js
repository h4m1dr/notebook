const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../");
const README = path.join(ROOT, "README.md");

const START = "<!-- TREE_START -->";
const END = "<!-- TREE_END -->";


const SECTIONS = [
    {
        name: "Guides",
        icon: "📚"
    },
    {
        name: "Projects",
        icon: "🚀"
    },
    {
        name: "Templates",
        icon: "🧩"
    }
];


function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, char => char.toUpperCase());

}



function indent(level) {

    return "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(level);

}



function scanFolder(folder, level) {

    let output = "";

    const items = fs.readdirSync(folder, {
        withFileTypes: true
    });


    for (const item of items) {

        if (
            item.name === "README.md" ||
            item.name === ".git"
        ) {
            continue;
        }


        const fullPath = path.join(
            folder,
            item.name
        );


        const relative = path
            .relative(ROOT, fullPath)
            .replace(/\\/g, "/");



        if (item.isDirectory()) {


            output += `${indent(level)}<details>\n`;

            output += `${indent(level)}<summary>📁 <a href="./${relative}">${formatName(item.name)}</a></summary>\n\n`;


            output += scanFolder(
                fullPath,
                level + 1
            );


            output += `${indent(level)}</details>\n\n`;

        }



        if (
            item.isFile() &&
            item.name.endsWith(".md")
        ) {

            output += `${indent(level)}- 📄 <a href="./${relative}">${formatName(item.name)}</a>\n\n`;

        }

    }


    return output;

}



function createSection(section) {


    const folder = path.join(
        ROOT,
        section.name
    );


    if (!fs.existsSync(folder)) {
        return "";
    }


    let output = "";


    output += `<details open>\n`;

    output += `<summary>${section.icon} ${section.name}</summary>\n\n`;


    output += scanFolder(
        folder,
        1
    );


    output += `</details>\n\n`;


    return output;

}



function generate() {

    let output = "";


    for (const section of SECTIONS) {

        output += createSection(section);

    }


    return output.trim();

}



function update() {


    let content = fs.readFileSync(
        README,
        "utf8"
    );


    const tree = generate();


    content = content.replace(
        new RegExp(`${START}[\\s\\S]*?${END}`),
        `${START}\n\n${tree}\n\n${END}`
    );


    fs.writeFileSync(
        README,
        content,
        "utf8"
    );


    console.log(
        "Root README updated."
    );

}


update();