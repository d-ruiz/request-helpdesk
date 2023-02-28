import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import RequestList from "./RequestListComponent";
import { RequestState } from "../../redux/constants/requestActionTypes";
import { fetchRequests } from "../../redux/actions/requestCreators";
import LoadingOverlay from 'react-loading-overlay-ts';
import { Button } from "reactstrap";
import NewRequestContainer from "./NewRequestContainer";
import RequestObject from "../../model/Request";
import EditRequestContainer from "./EditRequestContainer";

interface RootState {
    requests: RequestState,
}

const mapStateToProps = (state: RootState) => ({
    requests: state.requests
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchRequests: () => dispatch(fetchRequests())
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux { }

type State = {
    refresh: boolean,
    isError: boolean,
    returnMsg: string,
    isLoading: boolean,
    isNew: boolean,
    selectedRequest: RequestObject | null | undefined
};

class RequestListContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            refresh: false,
            isError: false,
            returnMsg: '',
            isLoading: false,
            isNew: false,
            selectedRequest: null
        }
        this.onClick = this.onClick.bind(this);
        this.onNew = this.onNew.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        this.props.fetchRequests();
    }

    onClick(id?: number) {
        if (id) {
            const request = this.props.requests.records.find(item => item.id === id);
            this.setState({
                selectedRequest: request
            })
        }
    }

    onNew() {
        this.setState({
            isNew: true
        })
    }

    onBack() {
        this.props.fetchRequests()
            .then(() => {
                this.setState({
                    isNew: false,
                    selectedRequest: null
                })
            })
    }

    render() {

        if (this.state.isNew) {
            return <NewRequestContainer
                onBack={this.onBack} />;
        } else if (this.state.selectedRequest) {
            return <EditRequestContainer
                request={this.state.selectedRequest}
                onBack={this.onBack} />;
        }

        return (
            <LoadingOverlay
                active={this.props.requests.isLoading}
                spinner
                className="requests-loader"
                text='Fetching requests' >
                <RequestList
                    onClick={this.onClick}
                    requests={this.props.requests.records} />
                <div className="fab-container">
                    <Button color="primary" className="fab btn-circle btn-lg" onClick={this.onNew}><i className="fa fa-plus"></i></Button>
                </div>

            </LoadingOverlay>
        );
    }
}

export default connector(RequestListContainer);

