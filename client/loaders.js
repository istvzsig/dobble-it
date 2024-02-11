export async function loadImage(url) {
    const image = new Image();
    image.src = "./img/" + url;
    return image;
}

export async function loadJSON(url) {
    const data = await fetch("./json/" + url + ".json");
    return data.json();
}