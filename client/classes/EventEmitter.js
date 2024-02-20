export default class EventEmitter {
    emit(canvas, eventName, callback, ...args) {
        canvas.addEventListener(eventName, event => {
            callback(event, ...args);
        });
    }
}