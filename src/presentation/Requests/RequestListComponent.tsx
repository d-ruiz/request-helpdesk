import React from 'react';
import { Badge, Card, CardBody, CardColumns, CardTitle } from 'reactstrap';
import RequestObject from '../../model/Request';

type RequestListProps = {
    requests: Array<RequestObject>,
    onClick: (id?: number) => void
};

function RequestList({ requests, onClick }: RequestListProps) {

    const renderCard = requests.map((item) => {
        const documentNo = item.DocumentNo;
        const requestType = item.R_RequestType_ID.identifier;
        const confidentiality = item.ConfidentialType.identifier;
        const badgeColor = item.ConfidentialType.id === 'I' ? 'secondary' : item.ConfidentialType.id === 'C' ? 'danger' : 'success';

        return (
            <Card body outline className="list-card" onClick={() => onClick(item.id)} key={item.id} >
                <div className="card-horizontal">
                    <CardBody>
                        <CardTitle>{documentNo}</CardTitle>
                        <div className="card-bottom mt-2">
                            <div className="requestType">{requestType}</div>
                            <div className="conf">
                                <Badge color={badgeColor} pill>{confidentiality}</Badge>
                            </div>
                        </div>
                    </CardBody>
                </div>
            </Card>
        );
    });

    return (
        <>
            <h1>Requests</h1>
            <CardColumns>{renderCard}</CardColumns>
        </>
    );
}

export default RequestList;