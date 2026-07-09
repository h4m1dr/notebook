const fs = require("fs");
const path = require("path");


const IGNORE = [
    ".git",
    "node_modules",
    "Automation",
    "README.md"
];



function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function scanFolder(folderPath, rootPath) {


    const node = {

        type: "folder",

        name: formatName(
            path.basename(folderPath)
        ),

        link: "./" + path
            .relative(rootPath, folderPath)
            .replace(/\\/g, "/"),

        children: []

    };



    const items = fs.readdirSync(
        folderPath,
        {
            withFileTypes: true
        }
    )
    .filter(item =>
        !IGNORE.includes(item.name)
    )
    .sort((a, b) => {


        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }


        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }


        return a.name.localeCompare(b.name);

    });



    for (const item of items) {


        const fullPath = path.join(
            folderPath,
            item.name
        );


        if (item.isDirectory()) {


            node.children.push(
                scanFolder(
                    fullPath,
                    rootPath
                )
            );

        }



        if (
            item.isFile() &&
            item.name.endsWith(".md") &&
            item.name !== "README.md"
        ) {


            node.children.push({

                type: "file",

                name: formatName(
                    item.name
                ),

                link: "./" + path
                    .relative(rootPath, fullPath)
                    .replace(/\\/g, "/")

            });


        }


    }


    return node;

}



module.exports = {
    scanFolder
};