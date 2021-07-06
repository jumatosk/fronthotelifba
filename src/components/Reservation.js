import React, { useEffect, useState } from 'react';
import Modal from './ModalCompanies';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import { STRINGS } from '../util/strings';
import api, { baseURL } from '../services/api';

function Reservation({ companyId, onHide, show }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    useEffect(() => {
        const getServices = async () => {
            try {
                const { data } = await api.get("/servicos/");
                setServices(data);
            } catch (error) {
                console.log(error);
            }
        }
        getServices();
    }, [])

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const { status } = await api.post("/reservas/", {
                id: user.id,
                empresa: `${baseURL}empresas/${companyId}/`,
                cliente: `${baseURL}clientes/${user.id}/`,
                n_pessoas: formData.numberOfPeople,
                data_entrada: expectedDate(formData.entryDate),
                data_saida: expectedDate(formData.exitDate),
                servico: `${baseURL}servicos/${1}/`,
                cartao_credito: formData.creditCard
            })
            if (status === 201) {
                toast.success("Reserva realizada com sucesso!");
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const expectedDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            title="Reserva de estadia"
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Número de Pessoas
                        </Form.Label>
                        <Form.Control
                            {...register("numberOfPeople", { required: STRINGS.REQUIRED_FIELD })}
                            type="number"
                            placeholder="Informe o número de pessoas"
                        />
                        <span className="field-error">
                            <ErrorMessage errors={errors} name="numberOfPeople" />
                        </span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Data de entrada
                        </Form.Label>
                        <br />
                        <Controller
                            control={control}
                            name="entryDate"
                            rules={{ required: STRINGS.REQUIRED_FIELD }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(e) => field.onChange(e)}
                                    className="input-custom-to-date"
                                    locale="pt-BR"
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Selecionar a data"
                                />
                            )}
                        />
                        <span className="field-error">
                            <ErrorMessage errors={errors} name="entryDate" />
                        </span>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Data de saída
                        </Form.Label>
                        <br />
                        <Controller
                            control={control}
                            name="exitDate"
                            rules={{ required: STRINGS.REQUIRED_FIELD }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(e) => field.onChange(e)}
                                    className="input-custom-to-date"
                                    locale="pt-BR"
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Selecionar a data"
                                />
                            )}
                        />
                        <span className="field-error">
                            <ErrorMessage errors={errors} name="exitDate" />
                        </span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Serviços
                        </Form.Label>
                        <Form.Control
                            {...register("services", { required: STRINGS.REQUIRED_FIELD })}
                            as="select"
                        >
                            <Form.Control
                                as="option"
                                label="Escolha uma das opções"
                                vaue=""
                            />
                            {services.map((service, index) => (
                                <Form.Control
                                    as="option"
                                    value={index}
                                    label={service}
                                />
                            ))}
                        </Form.Control>
                        <span className="field-error">
                            <ErrorMessage errors={errors} name="services" />
                        </span>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Nº do cartão de crédito
                        </Form.Label>
                        <Form.Control
                            {...register("creditCard", { required: STRINGS.REQUIRED_FIELD })}
                            type="number"
                            placeholder="Informe o número do cartão de crédito"
                            minLength={16}
                        />
                        <span className="field-error">
                            <ErrorMessage errors={errors} name="creditCard" />
                        </span>
                    </Form.Group>
                </Form.Row>
                <Button block type="submit">
                    {loading ? <Spinner animation="border"/> : "Reservar"}
                </Button>
            </Form>
        </Modal>
    );
}

export default Reservation;