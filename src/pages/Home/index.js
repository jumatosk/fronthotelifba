import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Footer from '../../components/Footer';
import Info from '../GeneralInfo';
import EditProfile from '../EditProfile';
import './styles.css';
import { Context } from '../../context/authContext';
import { Button } from 'react-bootstrap';

function Home() {
    const { isLogged, handleLogout } = useContext(Context);
    const [info, setInfo] = useState(false);
    const [menuKey, setMenuKey] = useState(1);
    const { Header, Content, Sider } = Layout;

    return (
        <Layout className="layout-custom">
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">
                        <Link to="/">
                            Início
                        </Link>
                    </Menu.Item>
                    {!isLogged &&
                        <>
                            <Menu.Item className="login-btn">
                                <Link to="/login">
                                    Entrar
                                </Link>
                            </Menu.Item>
                            <Menu.Item className="register-btn">
                                <Link to="/cadastro">
                                    Cadastrar-se
                                </Link>
                            </Menu.Item>
                        </>
                    }
                    {isLogged &&
                        <Menu.Item className="login-btn">
                            <Link replace="/" onClick={() => handleLogout()}>
                                Sair
                            </Link>
                        </Menu.Item>
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background custom-sider">
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        defaultSelectedKeys={['1']}
                        onSelect={(e) => {
                            switch (e.key) {
                                case "1": setMenuKey(1);
                                    break;
                                case "2": setMenuKey((2))
                                    break;
                                case "3": setMenuKey((3))
                                    break;
                                default: break;
                            }
                        }}
                    >
                        <Menu.Item key="1" onClick={() => setInfo(true)}>
                            <Link to="/">
                                Consultar empresas
                            </Link>
                        </Menu.Item>
                        {isLogged && (
                            <>
                                <Menu.Item key="2">
                                    <Link to="/">
                                        Minhas reservas
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/">
                                        Editar perfil
                                    </Link>
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            marginTop: 20,
                            minHeight: 280,
                        }}
                    > {menuKey === 1 ? (
                        <Info />
                    ) : menuKey === 2 ? (
                        <p>teste</p>
                    ) : (
                        <EditProfile />
                    )}
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
}

export default Home;