function formatName(name) {

    if (typeof name === "object") {

        name = name.name;

    }


    return String(name)
        .replace(/[-_]/g, " ")
        .replace(".md", "")
        .replace(/\b\w/g, c => c.toUpperCase());

}



function getPrefix(level, last) {

    if (!level) {
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




function renderTree(
    item,
    link,
    children,
    level = 0,
    last = false,
    isFile = false
) {


    const name = formatName(item);


    const prefix = getPrefix(
        level,
        last
    );


    if (isFile) {


        return `

<div style="margin-left:${level * 25}px">

${prefix}
📄 <a href="${link}">
${name}
</a>

</div>

`;

    }



    return `

<details>

<summary>

${prefix}
📁 <a href="${link}">
${name}
</a>

</summary>


<div style="margin-left:${(level + 1) * 25}px">

${children}

</div>


</details>


`;

}




function renderRoot(
    title,
    link,
    children
) {


    return `

<details open>

<summary>

📚 <a href="${link}">
${title}
</a>

</summary>


<div style="margin-left:25px">

${children}

</div>


</details>


`;

}



module.exports = {

    renderTree,
    renderRoot

};