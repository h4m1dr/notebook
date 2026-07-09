const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "../../Projects");
const README = path.join(ROOT, "README.md");

const START = "<!-- AUTO_INDEX_START -->";
const END = "<!-- AUTO_INDEX_END -->";


function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, char => char.toUpperCase());

}



function findProjects() {

    const projects = [];

    const folders = fs.readdirSync(ROOT, {
        withFileTypes: true
    });


    for (const folder of folders) {

        if (!folder.isDirectory()) {
            continue;
        }


        const projectPath = path.join(
            ROOT,
            folder.name
        );


        const projectReadme = path.join(
            projectPath,
            "README.md"
        );


        if (fs.existsSync(projectReadme)) {

            projects.push({
                name: folder.name,
                path: projectReadme
            });

        }

    }


    return projects;

}



function generateIndex() {

    const projects = findProjects();


    let output = "";


    for (const project of projects) {

        const relative = path
            .relative(ROOT, project.path)
            .replace(/\\/g, "/");


        output += `- 🚀 [${formatName(project.name)}](${relative})\n`;

    }


    return output.trim();

}



function updateReadme() {

    let content = fs.readFileSync(
        README,
        "utf8"
    );


    const index = generateIndex();


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
        "Projects README updated."
    );

}


updateReadme();