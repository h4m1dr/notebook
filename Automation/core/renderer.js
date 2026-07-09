function formatName(name) {

    return name
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function renderTree(node, level = 0, isRoot = false) {


    let output = "";


    const indent = "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(level);



    if (node.type === "folder") {


        output += `<details${isRoot ? " open" : ""}>\n`;

        output += `<summary>\n`;

        output += `${indent}📁 <a href="${node.path}">${formatName(node.name)}</a>\n`;

        output += `</summary>\n\n`;



        if (node.children && node.children.length > 0) {


            output += `<div style="margin-left:${25 * (level + 1)}px">\n\n`;


            node.children.forEach((child, index) => {


                const last = index === node.children.length - 1;


                output += renderTree(
                    child,
                    level + 1,
                    false
                );


            });


            output += `</div>\n\n`;

        }



        output += `</details>\n\n`;


    }



    if (node.type === "file") {


        output += `${indent}📄 <a href="${node.path}">${formatName(node.name)}</a>\n\n`;


    }



    return output;

}



module.exports = {
    renderTree
};