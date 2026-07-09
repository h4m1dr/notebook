function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function treeLine(level, last) {

    if (level === 0) {
        return "";
    }


    let line = "";


    for (let i = 1; i < level; i++) {

        line += "│   ";

    }


    line += last
        ? "└── "
        : "├── ";


    return line;

}



function renderTree(node, level = 0, isRoot = false, last = true) {


    let output = "";


    const prefix = treeLine(
        level,
        last
    );



    if (node.type === "folder") {


        output += `<details${isRoot ? " open" : ""}>\n`;

        output += `<summary>\n`;

        output += `${prefix}📁 <a href="${node.path}">${formatName(node.name)}</a>\n`;

        output += `</summary>\n\n`;



        if (node.children && node.children.length) {


            node.children.forEach((child, index) => {


                output += renderTree(
                    child,
                    level + 1,
                    false,
                    index === node.children.length - 1
                );


            });


        }


        output += `</details>\n\n`;

    }



    if (node.type === "file") {


        output += `${prefix}📄 <a href="${node.path}">${formatName(node.name)}</a>\n\n`;

    }



    return output;

}



module.exports = {
    renderTree
};