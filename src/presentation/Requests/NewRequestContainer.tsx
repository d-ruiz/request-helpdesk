import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay-ts';
import NewRequestComponent from "./NewRequestComponent";
import { UserState } from "../../redux/constants/userActionTypes";
import { fetchRequestTypeAndConfindentiality, saveRequest } from "../../redux/actions/requestInfoCreators";
import { RequestInfoState } from "../../redux/constants/requestInfoActionTypes";
import RequestObject from "../../model/Request";
import { Button } from "reactstrap";

interface RootState {
    users: UserState,
    requestInfo: RequestInfoState
}

const mapStateToProps = (state: RootState) => ({
    users: state.users,
    requestInfo: state.requestInfo
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchRequestTypeAndConfindentiality: () => dispatch(fetchRequestTypeAndConfindentiality()),
        saveRequest: (request: RequestObject) => dispatch(saveRequest(request))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    onBack: () => void
 }

type State = {
    refresh: boolean,
    isError: boolean,
    returnMsg: string,
    isLoading: boolean,
    request: RequestObject,
    goBack: boolean
};

class NewRequestContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            request: new RequestObject(),
            refresh: false,
            isError: false,
            returnMsg: '',
            isLoading: true,
            goBack: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.requestInfo.confidentialities.length <= 0) {
            this.props.fetchRequestTypeAndConfindentiality()
                .then(() => {
                    this.setState({
                        isLoading: false
                    })
                })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    handleSubmit() {
        this.props.saveRequest(this.state.request)
            .then((response: any) => {
                let responseMsg;
                let isResponseError;
                if (response === 'Unauthorized') {
                    responseMsg = 'Something went wrong. Try again';
                    isResponseError = true;
                } else {
                    responseMsg = response.summary;
                    isResponseError = response.isError;
                }
                this.setState({
                    returnMsg: responseMsg,
                    isError: isResponseError,
                    goBack: !isResponseError
                });
            });

    }

    render() {

        if (this.state.goBack) {
            this.props.onBack();
        }

        return (
            <LoadingOverlay
                active={this.state.isLoading}
                spinner
                className="request-loader"
                text='Fetching requests' >
                <NewRequestComponent
                    userName={this.props.users.currentUser?.username}
                    types={this.props.requestInfo.types}
                    confidentialities={this.props.requestInfo.confidentialities}
                    returnMsg={''}
                    request={this.state.request}
                    isError={false} />

                <div className="fab-container">
                    <Button color="primary" className="fab btn-circle btn-lg" onClick={this.handleSubmit}><i className="fa fa-save"></i></Button>
                </div>
            </LoadingOverlay>
        );
    }
}

export default connector(NewRequestContainer);
