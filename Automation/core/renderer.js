function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}



function renderTree(node, level = 0, isLast = true) {

    let output = "";


    const indent = "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(level);


    const branch = level === 0
        ? ""
        : (isLast ? "└── " : "├── ");



    if (node.type === "folder") {


        output += `<details>\n`;

        output += `<summary>\n`;

        output += `${indent}${branch}📁 <a href="${node.link}">${escapeHtml(node.name)}</a>\n`;

        output += `</summary>\n\n`;


        if (node.children && node.children.length) {


            node.children.forEach((child, index) => {

                output += renderTree(
                    child,
                    level + 1,
                    index === node.children.length - 1
                );

            });

        }


        output += `</details>\n\n`;

    }



    if (node.type === "file") {


        output += `${indent}${branch}📄 <a href="${node.link}">${escapeHtml(node.name)}</a>\n\n`;

    }


    return output;

}



module.exports = {
    renderTree
};