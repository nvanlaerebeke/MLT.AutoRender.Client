//Main
import * as React from 'react';

//Layout
import "./EditText.css";

//Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//Props and state
export interface EditTextProps { 
    Text: string
};

export interface EditTextItemState { 
    Text: string
    Editing: boolean
};

export class EditText extends React.Component<EditTextProps, EditTextItemState> {
    OriginalText: string;
    constructor(props: EditTextProps) {
        super(props);
        
        this.OriginalText = props.Text;
        this.state = {
            Text: props.Text,
            Editing: false
        }
    }

    private StartEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.setState({
            Editing: true
        });
    }

    private CancelEdit = () => {
        this.setState({
            Text: this.OriginalText,
            Editing: false
        });
    }

    private ConfirmEdit = () => {
        this.setState({Editing: false});
    }

    private UpdateText = () => {
        console.log('Updated');
    }

    render() {
        return (<div className="edittext">{this.GetElement()}</div>);
    }

    private GetElement = () => {
        if(this.state.Editing) {
            return (<>
                <div className="edittext_input"><input type="text" value={this.state.Text} onChange={this.UpdateText}/></div>
                <div onClick={this.CancelEdit}><FontAwesomeIcon icon={faWindowClose} className="edittext-cancel" /></div>
                <div onClick={this.ConfirmEdit}><FontAwesomeIcon icon={faCheck} className="edittext-confirm" /></div>
            </>);
        } else {
            return (<>
                <div>{this.state.Text}</div>
                <div onClick={this.StartEdit}><FontAwesomeIcon icon={faEdit} className="edittext-edit" /></div>
            </>);
        }
    }
}