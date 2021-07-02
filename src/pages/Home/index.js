import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Footer from '../../components/Footer';
import Info from '../GeneralInfo';
import './styles.css';

function Home() {
    const [info, setInfo] = useState(false);
    const { Header, Content, Sider } = Layout;
    const { SubMenu } = Menu;

    return (
        <Layout className="layout-custom">
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">
                        <Link to="/">
                            Início
                        </Link>
                    </Menu.Item>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background custom-sider">
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1" onClick={() => setInfo(true)}>
                            <Link to="/info">
                                Informações do hotel
                            </Link>
                        </Menu.Item>
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
                    >
                        <Info />
                    </Content>
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
}

export default Home;