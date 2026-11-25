const email = "anthony.rolland@proton.me";

const links = [
    { name: email, url: "mailto:" + email },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/anthony-rolland-info/" },
    { name: "GitHub", url: "https://github.com/anthonyroll" },
];

export function getLinks() {
    return links;
}
