const fs = require("fs");
const path = require("path");


function scanFolder(folder, root) {

    const items = fs.readdirSync(folder, {
        withFileTypes: true
    })
    .filter(item => item.name !== "README.md")
    .sort((a, b) => {

        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }

        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }

        return a.name.localeCompare(b.name);

    });


    return items.map((item, index) => {

        const fullPath = path.join(
            folder,
            item.name
        );


        const relative = path
            .relative(root, fullPath)
            .replace(/\\/g, "/");


        const node = {

            name: item.name,

            path: "./" + relative,

            type: item.isDirectory()
                ? "folder"
                : "file",

            last: index === items.length - 1

        };


        if (item.isDirectory()) {

            node.children = scanFolder(
                fullPath,
                root
            );

        }


        return node;

    });

}


module.exports = {
    scanFolder
};