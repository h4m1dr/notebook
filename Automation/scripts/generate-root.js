const fs = require("fs");
const path = require("path");

const { scanFolder } = require("../core/scanner");
const { renderTree } = require("../core/renderer");


const ROOT = path.join(__dirname, "../../");
const README = path.join(ROOT, "README.md");


const START = "<!-- TREE_START -->";
const END = "<!-- TREE_END -->";


const SHOW_ROOT = [
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



function generateRootTree() {

    let output = "";


    SHOW_ROOT.forEach(folder => {


        const fullPath = path.join(
            ROOT,
            folder.name
        );


        const node = {

            name: folder.name,

            path: "./" + folder.name,

            type: "folder",

            icon: folder.icon,

            children: scanFolder(
                fullPath,
                ROOT
            )

        };


        output += renderTree(
            node,
            0,
            true
        );


        output += "\n";

    });


    return output;

}




function updateReadme() {


    let content = fs.readFileSync(
        README,
        "utf8"
    );


    const tree = generateRootTree();



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



updateReadme();