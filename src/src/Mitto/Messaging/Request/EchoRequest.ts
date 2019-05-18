import { RequestMessage } from './RequestMessage';

export class EchoRequest extends RequestMessage  {
    Message!: string;

    constructor(pMessage: string) {
        super();
        this.Message = pMessage;
    }
}