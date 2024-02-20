export default class EventManager {
    emit(canvas, eventName, callback, ...args) {
        canvas.addEventListener(eventName, event => {
            callback(event, ...args);
        });
    }
}