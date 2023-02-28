import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { UserState } from "../../redux/constants/userActionTypes";
import { saveRequest } from "../../redux/actions/requestInfoCreators";
import { RequestInfoState } from "../../redux/constants/requestInfoActionTypes";
import RequestObject from "../../model/Request";
import EditRequestComponent from "./EditRequestComponent";

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
        saveRequest: (request: RequestObject) => dispatch(saveRequest(request))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
    onBack: () => void,
    request: RequestObject
}

type State = {
    refresh: boolean,
    isError: boolean,
    returnMsg: string,
    goBack: boolean
};

class EditRequestContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            refresh: false,
            isError: false,
            returnMsg: '',
            goBack: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(result: string) {
        this.props.request.LastResult = result;
        this.props.saveRequest(this.props.request)
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
            <EditRequestComponent
                returnMsg={''}
                request={this.props.request}
                onSave={this.handleSubmit}
                isError={false} />
        );
    }
}

export default connector(EditRequestContainer);
