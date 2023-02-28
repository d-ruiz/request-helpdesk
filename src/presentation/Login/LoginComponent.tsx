import * as React from "react";
import { Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";


type LoginProps = {
    isValidUsername: boolean,
    isValidPassword: boolean,
    loginErrorMessage?: string | undefined,
    username: string,
    password: string,
    onSubmit: (username: string, password: string) => void
};

function LoginComponent({ isValidUsername, isValidPassword, loginErrorMessage, onSubmit, username, password }: LoginProps) {

    let usernameFieldValue = username;
    let passwordFieldValue = password;

    return (
        <div className="login-page">
            <Card outline color="secondary">
                <CardHeader tag="h4">
                    Login
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username"
                                name="username"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => usernameFieldValue = event.target.value}
                                invalid={!isValidUsername} />
                            <FormFeedback>This field is mandatory</FormFeedback>
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password"
                                name="password"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => passwordFieldValue = event.target.value}
                                id="password" invalid={!isValidPassword} />
                            <FormFeedback>This field is mandatory</FormFeedback>
                        </FormGroup>
                        {loginErrorMessage && <div className="text-danger"><span>{loginErrorMessage}</span></div>}
                        <Button onClick={() => onSubmit(usernameFieldValue, passwordFieldValue)}
                            className="mt-3 float-right"
                            color="primary" >
                            Log In
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

//
export default LoginComponent;
