export async function loadImage(url) {
    const image = new Image();
    image.src = "./img/" + url;
    return image;
}

export async function loadJSON(url) {
    return await fetch("./json" + url)
        .then(data => data.json());
}