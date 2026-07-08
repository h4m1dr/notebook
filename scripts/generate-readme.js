const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const projectsPath = path.join(root, "Projects");
const readmePath = path.join(root, "README.md");

let projects = [];

for (const item of fs.readdirSync(projectsPath)) {
    const projectDir = path.join(projectsPath, item);

    if (!fs.statSync(projectDir).isDirectory()) continue;

    const projectReadme = path.join(projectDir, "README.md");

    if (!fs.existsSync(projectReadme)) continue;

    const content = fs.readFileSync(projectReadme, "utf8");

    const titleMatch = content.match(/^# (.+)$/m);
    const descriptionMatch = content.match(/^[^#\n].+$/m);

    projects.push({
        name: titleMatch ? titleMatch[1] : item,
        description: descriptionMatch ? descriptionMatch[0] : "No description",
        path: `./Projects/${item}/README.md`
    });
}

let projectList = "";

if (projects.length === 0) {
    projectList = "No projects added yet.";
} else {
    for (const project of projects) {
        projectList += `- [${project.name}](${project.path})  \n`;
        projectList += `  ${project.description}\n\n`;
    }
}

let readme = fs.readFileSync(readmePath, "utf8");

const start = "<!-- PROJECTS_START -->";
const end = "<!-- PROJECTS_END -->";

const newSection =
`${start}\n\n${projectList}${end}`;

readme = readme.replace(
    /<!-- PROJECTS_START -->[\s\S]*?<!-- PROJECTS_END -->/,
    newSection
);

fs.writeFileSync(readmePath, readme);

console.log("README updated successfully.");