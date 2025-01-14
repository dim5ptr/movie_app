import React from 'react';
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const { data, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: mutationLogin,
    });

    const navigate = useNavigate();

    const handleLogin = async () => {
        await mutate();
        localStorage.setItem('guest_session_id', data.guest_session_id);
        navigate("/");
    };

    return (
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="violet" textAlign='center'>
                    Welcome! Login by registering as Guest below.
                </Header>
                <Segment stacked style={{ backgroundColor: 'violet', borderRadius: 10 }}>
                    <Form size='large'>
                        <Button color='violet' size='large' fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};
