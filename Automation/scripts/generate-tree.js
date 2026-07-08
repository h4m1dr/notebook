const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../");
const README = path.join(ROOT, "README.md");

const START = "<!-- TREE_START -->";
const END = "<!-- TREE_END -->";

const IGNORE = [
    ".git",
    "node_modules"
];


function buildTree(dir, prefix = "") {

    let output = "";

    const items = fs.readdirSync(dir, {
        withFileTypes: true
    })
    .filter(item => !IGNORE.includes(item.name))
    .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });


    items.forEach((item, index) => {

        const last = index === items.length - 1;

        const connector = last ? "└── " : "├── ";

        output += `${prefix}${connector}${item.name}\n`;


        if (item.isDirectory()) {

            const nextPrefix = prefix + (last ? "    " : "│   ");

            output += buildTree(
                path.join(dir, item.name),
                nextPrefix
            );
        }

    });


    return output;
}


function updateReadme() {

    const tree = buildTree(ROOT);

    const content = fs.readFileSync(
        README,
        "utf8"
    );


    const updated = content.replace(
        new RegExp(`${START}[\\s\\S]*?${END}`),
        `${START}\n\n\`\`\`\n${tree}\`\`\`\n\n${END}`
    );


    fs.writeFileSync(
        README,
        updated,
        "utf8"
    );


    console.log(
        "Repository tree updated."
    );
}


updateReadme();