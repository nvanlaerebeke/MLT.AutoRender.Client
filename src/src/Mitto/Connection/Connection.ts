import { Guid } from "guid-typescript";
import * as RoutingFrame  from '../Routing/RoutingFrame';
import * as RequestManager from '../Messaging/Manager/RequestManager';
import * as blobUtil from 'blob-util'
import { EventEmitter } from 'events';

class WebSocketClient extends EventEmitter {
    public readonly ID: string;
    public Status: string = "Disconnected";
    private URL: string;
    private Client!: WebSocket;

    constructor(pUrl: string) {
        super();

        this.ID = Guid.create().toString();
        this.URL = pUrl;
    }

    Connect() {
        let main = this;

        this.Client = new WebSocket(this.URL);
        this.Client.onopen = () => {
            this.Status = "Connected";
            main.emit("connected");
        };

        this.Client.onmessage = evt => {
            blobUtil.blobToArrayBuffer(evt.data).then(function (arrayBuff) {
                let arrData: number[] = [];
                new Uint8Array(arrayBuff).forEach(b => arrData.push(b));
                RequestManager.Receive(RoutingFrame.CreateFromBytes(arrData).Data);
            }).catch(function (err) {
                main.emit('error', err);
            });
        };

        this.Client.onerror = evt => { };

        this.Client.onclose = () => {
            this.Status = "Disconnected";
            main.emit('closed');
        };
    }

    SendBytes(message: number[]) {
        let buffer = new Uint8Array(message).buffer;
        this.Client.send(buffer);
    }
}

let Client: WebSocketClient;
export function GetClient(pUrl?: string) {
    if(!Client && pUrl) {
        Client = new WebSocketClient(pUrl);
    }
    return Client;
}