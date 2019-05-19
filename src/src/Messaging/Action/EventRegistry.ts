import { EventEmitter } from 'events';

class EventRegistry extends EventEmitter {
    Raise(pName:string, pEventArgs: any) {
        this.emit(pName, pEventArgs);
    }
}

let objEventRegistry = new EventRegistry();
export function Get() {
    return objEventRegistry;
}

export function Raise(pName: string, pEventArgs: any) {
    objEventRegistry.Raise(pName, pEventArgs);
}