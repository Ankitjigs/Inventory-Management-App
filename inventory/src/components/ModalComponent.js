import React from "react";

import { Button, Modal } from "react-bootstrap";

export default function ModalComponent({
  showModal,
  setShowModal,
  CloseIcon,
  selectedItem,
  setCategory,
  setPrice,
  setQuantity,
  setValue,
  handleSaveEdit,
}) {
  return (
    <>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit product</Modal.Title>
          <img
            className="closeIcon"
            src={CloseIcon}
            alt="close-icon"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </Modal.Header>
        <div className="editModalItemHeading">
          <h3 className="itemName">{selectedItem?.name}</h3>
        </div>
        <Modal.Body>
          {/* Your edit form or content goes here */}
          <div className="edit-fields-row1">
            <div className="edit-field-div">
              <div className="edit-field-text">Category</div>
              <div>
                <input
                  className="edit-field-input"
                  defaultValue={selectedItem?.category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="edit-field-div">
              <div className="edit-field-text">Price</div>
              <div>
                <input
                  className="edit-field-input"
                  defaultValue={selectedItem?.price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="edit-fields-row1">
            <div className="edit-field-div">
              <div className="edit-field-text">Quantity</div>
              <div>
                <input
                  className="edit-field-input"
                  defaultValue={selectedItem?.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="edit-field-div">
              <div className="edit-field-text">Value</div>
              <div>
                <input
                  className="edit-field-input"
                  defaultValue={
                    parseInt(selectedItem?.price.slice(1)) *
                    parseInt(selectedItem?.quantity)
                  }
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancelButton" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              handleSaveEdit(selectedItem.id);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
