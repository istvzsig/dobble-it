export async function loadImage(url) {
    const image = new Image();
    image.src = "./img/" + url;
    return image;
}