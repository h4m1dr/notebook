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


function formatName(name) {
    return name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


function buildTree(dir, relative = "") {

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


    for (const item of items) {

        const fullPath = path.join(dir, item.name);
        const itemPath = relative
            ? `${relative}/${item.name}`
            : item.name;


        if (item.isDirectory()) {

            const children = buildTree(
                fullPath,
                itemPath
            );


            output += `<details>\n`;
            output += `<summary>📁 <a href="./${itemPath}">${formatName(item.name)}</a></summary>\n\n`;
            output += children;
            output += `</details>\n\n`;

        } else {

            if (item.name.endsWith(".md")) {

                output += `📄 [${formatName(item.name.replace(".md",""))}](./${itemPath})\n\n`;

            }

        }

    }


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
        `${START}\n\n${tree}${END}`
    );


    fs.writeFileSync(
        README,
        updated,
        "utf8"
    );


    console.log("Interactive tree updated.");

}


updateReadme();