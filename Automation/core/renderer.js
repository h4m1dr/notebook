function formatName(name) {

    return String(name)
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function treePrefix(level, last) {

    if (level === 0) {
        return "";
    }


    let prefix = "";


    for (let i = 1; i < level; i++) {

        prefix += "│   ";

    }


    prefix += last
        ? "└── "
        : "├── ";


    return prefix;

}



function renderTree(node, level = 0) {

    let output = "";


    const prefix = treePrefix(
        level,
        node.last
    );


    const icon = node.type === "file"
        ? "📄"
        : "📁";



    if (node.type === "folder") {


        output += `<details>\n`;

        output += `<summary>\n`;

        output += `${prefix}${icon} <a href="${node.path}">${formatName(node.name)}</a>\n`;

        output += `</summary>\n\n`;



        if (
            node.children &&
            node.children.length > 0
        ) {


            node.children.forEach(child => {

                output += renderTree(
                    child,
                    level + 1
                );

            });


        }


        output += `</details>\n\n`;


    }
    else {


        output += `${prefix}${icon} <a href="${node.path}">${formatName(node.name)}</a>\n\n`;

    }



    return output;

}



module.exports = {
    renderTree
};