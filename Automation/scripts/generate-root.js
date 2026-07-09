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



function scanFolder(folder, base) {

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

            output += `\n- 📁 [${formatName(item.name)}](./${relative})\n`;

            const children = scanFolder(
                fullPath,
                base
            );


            if (children.trim()) {

                output += children
                    .split("\n")
                    .map(line => "    " + line)
                    .join("\n");

                output += "\n";

            }

        }


        if (
            item.isFile() &&
            item.name.endsWith(".md")
        ) {

            output += `\n- 📄 [${formatName(item.name)}](./${relative})\n`;

        }

    }


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


    output += `## ${section.icon} ${section.name}\n\n`;

    output += scanFolder(
        folder,
        folder
    );


    output += "\n";


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