import React, { Fragment, useState } from 'react';
import { Button, Modal as ReactStrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default function Modal({ disabled, label, title, actionButton, children }) {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show)
  }

  return (
    <Fragment>
      <Button disabled={disabled} className="w-50 h-25 mx-auto mb-4" onClick={toggle}>{label}</Button>
      <ReactStrapModal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          {actionButton  }{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </ReactStrapModal>
    </Fragment>
  )
}