/**
 * ToDo: Put the action logic in the WorkspaceItem class
 * This is a generic text input should not contain any actual
 * business logic
 *
 * WorkspaceItem should raise an event/call something that causes
 * an action in the Runtime classes, that way the UI is decoupled
 * from the business logic, for now this is a POC so doesn't matter
 */

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
    OnChange: ((Value: string) => void)
};
export interface EditTextState {
    Text: string
    Editing: boolean
};
//classes
export class EditText extends React.Component<EditTextProps, EditTextState> {
    private OriginalText: string;
    private OnChange: ((Value: string) => void);

    constructor(props: EditTextProps) {
        super(props);
        this.OriginalText = props.Text;
        this.OnChange = props.OnChange;

        this.state = {
            Text: props.Text,
            Editing: false
        }
    }

    /**
     * ToDo: this shouldn't be the way to do this, figure out what's wrong
     * and why the next state doesn't have the new selected value
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: EditTextProps, nextState:EditTextState) {
        if(nextProps.Text !== nextState.Text) {
            this.setState({Text: nextProps.Text});
        }
        return true;
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
        this.OnChange(this.state.Text)
        this.setState({Editing: false});
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({Text: e.target.value});
    }

    render() {
        return (<div className="edittext">{this.GetElement()}</div>);
    }

    private GetElement = () => {
        if(this.state.Editing) {
            return (<>
                <div className="edittext_input"><input type="text" value={this.state.Text} onChange={this.handleChange}/></div>
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