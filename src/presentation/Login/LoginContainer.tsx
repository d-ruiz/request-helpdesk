import * as React from "react";
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { AuthState } from "../../redux/constants/authenticatorActionTypes";
import { UserState } from "../../redux/constants/userActionTypes";
import { verifyLogin } from "../../redux/actions/authenticatorCreators";
import { URLS } from "../../shared/baseData";

interface RootState {
    authenticator: AuthState,
    users: UserState
}

const mapStateToProps = (state: RootState) => ({
    authenticator: state.authenticator,
    users: state.users,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        verifyLogin: (username: string, password: string) => dispatch(verifyLogin(username, password))
    }
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
}

type State = {
    isValidUsername: boolean,
    isValidPassword: boolean,
    username: string,
    password: string
};

class LoginContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isValidUsername: true,
            isValidPassword: true,
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(username: string, password: string) {
        const isUserNameValid = !this.isFieldEmpty(username);
        const isPasswordValid = !this.isFieldEmpty(password);

        if (isUserNameValid && isPasswordValid) {
            this.props.verifyLogin(username, password);
        }

        this.setState({
            username: username,
            password: password,
            isValidUsername: isUserNameValid,
            isValidPassword: isPasswordValid,
        });
    }

    isFieldEmpty(value: string): boolean {
        return !value || value.length <= 0;
    }  

    render() {
        if (this.props.users.currentUser !== undefined) {
            return <Redirect to={URLS.Requests} />;
        }

        return (
            <LoginComponent
                username={this.state.username}
                password={this.state.password}
                isValidUsername={this.state.isValidUsername}
                isValidPassword={this.state.isValidPassword}
                loginErrorMessage={this.props.authenticator.errMsg}
                onSubmit={this.handleSubmit} />
        );
    }
}

export default connector(LoginContainer);
