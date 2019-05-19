export abstract class Action<T> {
    public Request: T;

    constructor(pRequestMessage: T) {
        this.Request = pRequestMessage;
    }

    abstract Start(): void;
}