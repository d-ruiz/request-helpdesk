class RequestObject {
    id?: number;
    DocumentNo?: string;
    R_RequestType_ID?: any;
    ConfidentialType?: any;
    Summary?: string | null;
    LastResult?: string | null;

    setDocumentNo(documentNo: string) {
        this.DocumentNo = documentNo;
    }

    setRequestType(requestType: any) {
        this.R_RequestType_ID = requestType;
    }

    setConfidentialityType(confidentiality: any) {
        this.ConfidentialType = confidentiality;
    }

    setSummary(summary: string) {
        this.Summary = summary;
    }
}

export default RequestObject;
