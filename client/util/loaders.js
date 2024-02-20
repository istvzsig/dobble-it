export async function loadImage(url) {
    const data = await fetch("./data/img/" + url);

    const image = new Image();
    image.src = URL.createObjectURL(await data.blob());

    return image;
}

export async function loadJSON(url) {
    const data = await fetch("./data/json/" + url + ".json");
    return data.json();
}