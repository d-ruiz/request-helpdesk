import React from 'react';
import { FormGroup, Label, Input, Form, Button } from 'reactstrap';
import RequestObject from '../../model/Request';

type FormProps = {
    isError: boolean,
    returnMsg: string,
    request: RequestObject,
    onSave: (result: string) => void
};

function EditComponent({ returnMsg, isError, request, onSave }: FormProps) {

    let result = '';

    return (
        <Form>
            <h1 className="mb-5">Request {request.DocumentNo}</h1>
            <FormGroup tag="fieldset">
                <legend>Request Information</legend>
                <FormGroup row>
                    <FormGroup className="col-sm-6">
                        <Label for="type">Request Type: </Label>
                        <Label for="type">{request.R_RequestType_ID.identifier}</Label>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <Label for="conf">Confidentiality: </Label>
                        <Label for="type">{request.ConfidentialType.identifier}</Label>
                    </FormGroup>
                </FormGroup>

                <FormGroup>
                    <Label for="summary">Summary</Label>
                    <Input
                        id="summary"
                        name="text"
                        type="textarea"
                        readOnly={true}
                        value={request.Summary ? request.Summary : ""} />
                </FormGroup>
            </FormGroup>

            <FormGroup tag="fieldset">
                <legend>Result</legend>
                <FormGroup>
                    <Label for="followup">Follow-up</Label>
                    <Input
                        id="followup"
                        name="text"
                        type="textarea"
                        maxlength="1500"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => result = event.target.value}
                    />
                </FormGroup>

            </FormGroup>

            <div className="fab-container">
                <Button color="primary" className="fab btn-circle btn-lg" onClick={() => onSave(result)}><i className="fa fa-save"></i></Button>
            </div>

        </Form>
    );
}

export default EditComponent;