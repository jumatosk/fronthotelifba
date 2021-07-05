import React, { useState, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap';
import { Layout, Menu } from 'antd';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import './styles.css';
import { Context } from '../../context/authContext';
import api from '../../services/api';

function Login() {
    const { handleLogin } = useContext(Context);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { Header, Content } = Layout;

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        setLoading(true);

        const response = handleLogin(data);

        response.then(res => {
            if (res && res.status === 400) {
                toast.error("Credenciais informadas estão incorretas");
            } else {
                history.replace("/");
            }
        })
        setLoading(false);
    }

    return (
        <Fragment>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" onClick={() => history.replace('/')}>
                        Início
                    </Menu.Item>
                    <Menu.Item className="login-btn" key="1" onClick={() => history.replace('/cadastro')}>
                        Cadastrar-se
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ height: '80vh' }}>
                <Content style={{ padding: 100 }}>
                    <Container className="container-custom-login">
                        <div className="card-login">
                            <span className="login-title">Olá, bem vindo&#40;a&#41; :&#41;</span>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Nome
                                        </Form.Label>
                                        <Form.Control
                                            {...register("username")}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            {...register("email")}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Senha
                                        </Form.Label>
                                        <Form.Control
                                            {...register("password")}
                                            type="password"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button type="submit" className="button-custom" variant="secondary" block>
                                            {loading ? <Spinner size="sm" animation="border" /> : "Entrar"}
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </div>
                    </Container>
                </Content>
            </Layout>
            <Footer />
        </Fragment >
    );
}

export default Login;