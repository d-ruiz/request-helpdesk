import React from 'react';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import RequestObject from '../../model/Request';

type FormProps = {
  isError: boolean,
  returnMsg: string,
  userName?: string,
  types: Array<any>,
  confidentialities: Array<any>,
  request: RequestObject
};

function NewRequestComponent({ returnMsg, isError, userName = '', types, confidentialities, request }: FormProps) {

  const typeOptions = types.map((type, index) => {
    if (index === 0) {
      request.setRequestType(type);
    }
    return (
      <option key={type.id}>{type.Name}</option>
    );
  });

  const confidentialityOptions = confidentialities.map((confidentialitiy, index) => {
    if (index === 0) {
      request.setConfidentialityType(confidentialitiy.value);
    }
    return (
      <option key={confidentialitiy.value}>{confidentialitiy.name}</option>
    );
  });

  return (
    <Form>
      <h1 className="mb-5">New Request</h1>
      {returnMsg && <h3 className={isError ? "text-danger" : "text-success"}><span>{returnMsg}</span></h3>}
      <FormGroup>
        <Label for="docno">From: {userName}</Label>
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>Request Information</legend>
        <FormGroup row>
          <FormGroup className="col-sm-6">
            <Label for="type">Request Type</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const selected = types.find((type) => type.Name === event.target.value);
                if (selected !== undefined) {
                    request.setRequestType(selected);
                }
              }}
            >
              {typeOptions}
            </Input>
          </FormGroup>
          <FormGroup className="col-sm-6">
            <Label for="conf">Confidentiality</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const selected = confidentialities.find((confidentialitiy) => confidentialitiy.name === event.target.value);
                if (selected !== undefined) {
                    request.setConfidentialityType(selected.value);
                }
              }}
            >
              {confidentialityOptions}
            </Input>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="summary">Summary</Label>
          <Input
            id="summary"
            name="text"
            type="textarea"
            maxlength="1500"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => request.Summary = event.target.value}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Label for="attachment">
          Attachment
        </Label>
        <Input
          id="attachment"
          name="file"
          type="file"
        />
      </FormGroup>
    </Form>
  );
}

export default NewRequestComponent;