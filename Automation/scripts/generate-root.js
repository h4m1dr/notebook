const fs = require("fs");
const path = require("path");

const { scanFolder } = require("../core/scanner");
const { renderTree } = require("../core/renderer");


const ROOT = path.join(__dirname, "../../");

const README = path.join(
    ROOT,
    "README.md"
);


const START = "<!-- TREE_START -->";
const END = "<!-- TREE_END -->";



const SHOW_ROOT = [
    {
        folder: "Guides",
        icon: "📚"
    },
    {
        folder: "Projects",
        icon: "🚀"
    },
    {
        folder: "Templates",
        icon: "🧩"
    }
];



function generateRootTree() {


    let output = "";


    for (const item of SHOW_ROOT) {


        const folderPath = path.join(
            ROOT,
            item.folder
        );


        let tree = scanFolder(
            folderPath,
            ROOT
        );


        tree.name = item.icon + " " + item.folder;


        output += `<details open>\n`;

        output += `<summary>\n`;

        output += `<a href="./${item.folder}">${tree.name}</a>\n`;

        output += `</summary>\n\n`;


        tree.children.forEach((child, index) => {


            output += renderTree(
                child,
                0,
                index === tree.children.length - 1
            );


        });


        output += `</details>\n\n`;

    }


    return output;

}



function updateReadme() {


    let content = fs.readFileSync(
        README,
        "utf8"
    );


    const tree = generateRootTree();



    content = content.replace(
        new RegExp(
            `${START}[\\s\\S]*?${END}`
        ),
        `${START}\n\n${tree}${END}`
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