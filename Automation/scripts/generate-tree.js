const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../");
const README = path.join(ROOT, "README.md");

const START = "<!-- TREE_START -->";
const END = "<!-- TREE_END -->";

const SHOW_ROOT = [
    "Guides",
    "Projects",
    "Templates"
];


const IGNORE = [
    ".git",
    "Automation",
    "README.md"
];


function nameFormat(name) {
    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, x => x.toUpperCase());
}


function buildFolder(folder, relative) {

    let output = "";

    const items = fs.readdirSync(folder, {
        withFileTypes: true
    })
    .filter(x => !IGNORE.includes(x.name));


    for (const item of items) {

        const full = path.join(folder, item.name);

        const link = "./" + path
            .relative(ROOT, full)
            .replaceAll("\\", "/");


        if (item.isDirectory()) {

            output += `<details>\n`;
            output += `<summary>📁 <a href="${link}">${nameFormat(item.name)}</a></summary>\n\n`;

            output += buildFolder(full, link);

            output += `</details>\n\n`;

        } else {

            if (item.name.endsWith(".md")) {

                output += `📄 [${nameFormat(item.name)}](${link})\n\n`;

            }

        }
    }


    return output;
}



function generate() {

    let tree = "";


    for (const folder of SHOW_ROOT) {

        const full = path.join(ROOT, folder);

        const link = "./" + folder;


        tree += `<details>\n`;
        tree += `<summary>📁 <a href="${link}">${folder}</a></summary>\n\n`;

        tree += buildFolder(
            full,
            link
        );

        tree += `</details>\n\n`;

    }


    let readme = fs.readFileSync(
        README,
        "utf8"
    );


    readme = readme.replace(
        new RegExp(`${START}[\\s\\S]*?${END}`),
        `${START}\n\n${tree}${END}`
    );


    fs.writeFileSync(
        README,
        readme,
        "utf8"
    );


    console.log("README tree updated.");
}


generate();