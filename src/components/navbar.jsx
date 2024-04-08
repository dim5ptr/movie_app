import { Button, Menu, Icon, Header } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("guest_session_id");
        navigate("/auth");
    }

    return (
        <Menu fixed='top' size='large' inverted color='blue' borderless>
            <Menu.Item as={Link} to='/' style={{ fontSize: '1.5rem' }}>
                <Icon name='home' />
                Home
            </Menu.Item>

            <Menu.Item as={Link} to='/rated' style={{ fontSize: '1.5rem' }}>
                <Icon name='star' />
                Rated
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <Header as='h2' inverted style={{ margin: 0 }}>Movie App</Header> {/* Judul */}
                </Menu.Item>
                {isLoggedIn ? (
                    <Menu.Item as={Button} style={{ fontSize: "1.5rem" }} onClick={logout}>
                        <Icon name='sign-out' />
                        Logout
                    </Menu.Item>
                ) : (
                    <Menu.Item as={Link} to='/auth' style={{ fontSize: '1.5rem' }}>
                        <Icon name='user' />
                        Auth
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    )
}
