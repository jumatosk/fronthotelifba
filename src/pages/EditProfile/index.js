import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { ErrorMessage } from '@hookform/error-message';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import { STRINGS } from '../../util/strings';
import api from '../../services/api';

function EditProfile({ userId }) {
    const { Content, } = Layout;
    const [loading, setLoading] = useState(false);

    const { control, register, reset, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {

    }, []);

    const onSubmit = async (formData) => {
        try {
            const { status } = await api.put("", {
                id: 18,
                nome: "novoromildo",
                passaporte: "333333",
                identidade: "11111111",
                data_identidade: "2021-07-02",
                nacionalidade: "Portugues",
                data_nascimento: "2021-07-02",
                telefone: "71993589437",
                endereço: "rua abc",
                email: "jumatosk@gmail.com"
            })

            if (status === 200) {
                toast.success("Perfil atualizado com sucesso");
            }
        } catch (error) {
            toast.error("Erro ao atualizar o perfil");
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        Nome*
                    </Form.Label>
                    <Form.Control
                        {...register("name", { required: STRINGS.REQUIRED_FIELD })}
                        placeholder="Informe o nome do cliente"
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="name" />
                    </span>
                </Form.Group>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        Nacionalidade*
                    </Form.Label>
                    <Form.Control
                        {...register("nacionality", { required: STRINGS.REQUIRED_FIELD })}
                        placeholder="Informe a nacionalidade do cliente"
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="nacionality" />
                    </span>
                </Form.Group>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Group as={Col} md={2}>
                    <Form.Label>
                        Data de nascimento*
                    </Form.Label>
                    <br />
                    <Controller
                        control={control}
                        name="birthDate"
                        rules={{ required: STRINGS.REQUIRED_FIELD }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(e) => field.onChange(e)}
                                className="input-custom-to-date"
                                locale="pt-BR"
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Selecionar a data"
                                maxDate={new Date()}
                            />
                        )}
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="birthDate" />
                    </span>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                    <Form.Label>
                        Endereço*
                    </Form.Label>
                    <Form.Control
                        {...register("address", { required: STRINGS.REQUIRED_FIELD })}
                        placeholder="Informe o endereço do cliente"
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="address" />
                    </span>
                </Form.Group>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        Telefone*
                    </Form.Label>
                    <Form.Control
                        {...register("phone", { required: STRINGS.REQUIRED_FIELD })}
                        placeholder="Informe o telefone do cliente"
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="phone" />
                    </span>
                </Form.Group>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        Nº de identidade*
                    </Form.Label>
                    <Form.Control
                        {...register("identity", { required: STRINGS.REQUIRED_FIELD })}
                        placeholder="Informe o numero de identidade do cliente"
                    />
                    <span className="field-error">
                        <ErrorMessage errors={errors} name="phone" />
                    </span>
                </Form.Group>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        Passaporte
                    </Form.Label>
                    <Form.Control
                        {...register("passport")}
                        placeholder="Informe o número do passaporte do cliente"
                    />
                </Form.Group>
                <Form.Group as={Col} md={4}>
                    <Form.Label>
                        E-mail
                    </Form.Label>
                    <Form.Control
                        {...register("email")}
                        placeholder="Informe o email do cliente"
                    />
                </Form.Group>
            </Form.Row>
            <br />
            <Col md={8}>
                <div className="container-btns">
                    <Button variant="success" type="submit">
                        {loading ? <Spinner size="sm" animation="border" /> : "Salvar"}
                    </Button>
                </div>
            </Col>
        </Form>
    );
}

export default EditProfile;