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
        .replace(/\b\w/g, char => char.toUpperCase());

}


function scan(dir) {

    let items = [];

    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });


    for (const file of files) {

        if (file.name === "README.md") {
            continue;
        }


        const fullPath = path.join(
            dir,
            file.name
        );


        if (file.isDirectory()) {

            items.push({
                type: "folder",
                name: file.name,
                path: fullPath
            });

        }


        if (
            file.isFile() &&
            file.name.endsWith(".md")
        ) {

            items.push({
                type: "file",
                name: file.name,
                path: fullPath
            });

        }

    }


    return items;

}


function generate() {

    const items = scan(ROOT);

    let output = "";


    for (const item of items) {

        const relative = path
            .relative(ROOT, item.path)
            .replace(/\\/g, "/");


        if (item.type === "folder") {

            output += `- 📁 [${formatName(item.name)}](./${relative})\n`;

        }


        if (item.type === "file") {

            output += `- 📄 [${formatName(item.name)}](./${relative})\n`;

        }

    }


    return output.trim();

}



function update() {

    const content = fs.readFileSync(
        README,
        "utf8"
    );


    const output = generate();


    const updated = content.replace(
        new RegExp(`${START}[\\s\\S]*?${END}`),
        `${START}\n\n${output}\n\n${END}`
    );


    fs.writeFileSync(
        README,
        updated,
        "utf8"
    );


    console.log(
        "Templates README updated."
    );

}


update();