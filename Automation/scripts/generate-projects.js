const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../Projects");
const README = path.join(ROOT, "README.md");

const START = "<!-- AUTO_INDEX_START -->";
const END = "<!-- AUTO_INDEX_END -->";


function getReadmeFiles(dir) {
    let files = [];

    const items = fs.readdirSync(dir, {
        withFileTypes: true
    });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            files = files.concat(
                getReadmeFiles(fullPath)
            );
        }

        if (
            item.isFile() &&
            item.name.toLowerCase() === "readme.md" &&
            fullPath !== README
        ) {
            files.push(fullPath);
        }
    }

    return files;
}


function getTitle(file) {
    const content = fs.readFileSync(
        file,
        "utf8"
    );

    const match = content.match(
        /^#\s+(.+)/m
    );

    if (match) {
        return match[1].trim();
    }

    return path.basename(
        path.dirname(file)
    );
}


function generateIndex() {

    const files = getReadmeFiles(ROOT);

    return files.map(file => {

        const relative = path
            .relative(ROOT, file)
            .replace(/\\/g, "/");

        const title = getTitle(file);

        return `- [${title}](${relative})`;

    }).join("\n");
}


function updateReadme() {

    const content = fs.readFileSync(
        README,
        "utf8"
    );

    const index = generateIndex();

    const updated = content.replace(
        new RegExp(
            `${START}[\\s\\S]*?${END}`
        ),
        `${START}\n\n${index}\n\n${END}`
    );


    fs.writeFileSync(
        README,
        updated,
        "utf8"
    );


    console.log(
        "Projects index updated."
    );
}


updateReadme();