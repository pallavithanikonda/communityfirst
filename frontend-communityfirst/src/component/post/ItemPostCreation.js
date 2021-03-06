import React, { useState } from "react";
import { Modal, Button, Form, ButtonGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

function ItemPostCreation({ onSubmit }) {

    const { register, handleSubmit, errors, reset } = useForm();
    const [item, setItem] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttons = (
        <div className="col-auto">
            <ButtonGroup>
                <Button type="button" variant="outline-dark post-creation-btn" onClick={() => {
                    setItem(itemType.REQUEST_ITEM);
                    handleShow();
                }}>
                    Request Item
                </Button>
                <Button type="button" variant="outline-dark post-creation-btn"
                    onClick={() => {
                        setItem(itemType.OFFER_ITEM);
                        handleShow();
                    }}>
                    Offer Item
                </Button>
            </ButtonGroup>
        </div>
    );

    const modal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="w-100">
                    <h5 className="text-center">{item === itemType.OFFER_ITEM ? 'Offering Item' : 'Requesting Item'}</h5>
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
                handleClose();
            })}>
                <Modal.Body>
                    <Form.Control type="hidden" name="itemType" value={item} ref={register}></Form.Control>
                    <Form.Group>
                        <Form.Control type="text" name="title" placeholder="Title"
                            ref={register({ required: true, minLength: 5, maxLength: 70 })} />
                        {errors.title && errors.title.type === "required" &&
                            <span className="form-error">Title is required</span>}
                        {errors.title && (errors.title.type === "minLength" || errors.title.type === "maxLength") &&
                            <span className="form-error">Character must be between 5 and 50 </span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" name="description" placeholder="Write something..."
                            style={{ resize: "none" }} rows="6"
                            ref={register({ required: true })} />
                        {errors.description && errors.description.type === "required" &&
                            <span className="form-error">Description is required</span>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="reset" variant="secondary" onClick={() => {
                        reset();
                        handleClose();
                    }}>Cancel</Button>
                    <Button type="submit" variant="warning">Post</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

    return (
        <>
            <div className="row justify-content-center mb-3">
                {buttons}
            </div>
            {modal}
        </>
    )
}

export const itemType = {
    REQUEST_ITEM: 'REQUEST_ITEM',
    OFFER_ITEM: 'OFFER_ITEM'
}

export default ItemPostCreation;
