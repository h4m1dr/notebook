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


        const isLast = index === items.length - 1;


        const fullPath = path.join(
            folder,
            item.name
        );


        const relative = path
            .relative(ROOT, fullPath)
            .replace(/\\/g, "/");


        const prefix = treePrefix(
            level,
            isLast
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



function generateSection(section) {


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
        0
    );


    output += `</details>\n\n`;


    return output;

}



function generate() {

    let output = "";


    for (const section of SECTIONS) {

        output += generateSection(section);

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