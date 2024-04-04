import React, { useEffect, useState } from "react";
import "./App.css";
import LogoutIcon from "./images/logout.svg";
import CartIcon from "./images/in_stock.svg";
import OutOfStock from "./images/out_of_stock.svg";
import DollarIcon from "./images/dollar-sign.svg";
import CategoryIcon from "./images/category.svg";
import EditIcon from "./images/edit.svg";
import EditUserIcon from "./images/edit_user.svg";
import DeleteIcon from "./images/delete.svg";
import DeleteDisableIcon from "./images/delete_user.svg";
import EnableIcon from "./images/enable.svg";
import EnableUserIcon from "./images/enable_user.svg";
import DisableIcon from "./images/disable.svg";
import CloseIcon from "./images/close.svg";

import HeaderComponent from "./components/HeaderComponent.js";
import ModalComponent from "./components/ModalComponent.js";
import WidgetComponent from "./components/WidgetComponent.js";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState(String(selectedItem?.category));
  const [price, setPrice] = useState(String(selectedItem?.price));
  const [quantity, setQuantity] = useState(String(selectedItem?.quantity));
  const [value, setValue] = useState(String(selectedItem?.value));

  useEffect(() => {
    if (products !== undefined && products.length !== 0) {
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";
    try {
      const response = await fetch(url);
      if (response.ok) {
        let jsonData = await response.json();
        loop(jsonData);
        setProducts(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  var iterator = 0; // id

  function addIdentifier(target) {
    target.id = iterator;
    iterator++;
  }

  function loop(obj) {
    for (var i in obj) {
      var c = obj[i];

      if (typeof c === "object") {
        if (c.length === undefined) {
          addIdentifier(c);
          c.disabled = false;
        }

        loop(c);
      }
    }
  }

  const parseValue = (value) => parseFloat(value.replace("$", ""));
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    let temp = products
      .filter((product) => product.disabled === false)
      .reduce((acc, cur) => acc + parseValue(cur.value), 0);
    setTotalValue(temp);
  }, [products]);

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSaveEdit = (id) => {
    let updatedProducts = products.map((product) => {
      if (product.id === id) {
        selectedItem.category =
          category === "undefined" ? product.category : category;

        selectedItem.price = price === "undefined" ? product.price : price;

        selectedItem.quantity =
          quantity === "undefined"
            ? parseInt(product.quantity)
            : parseInt(quantity);
        console.log(
          parseInt(product.price.slice(1)) * parseInt(product.quantity)
        );
        selectedItem.value =
          "$" +
          String(parseInt(product.price.slice(1)) * parseInt(product.quantity));
      }

      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDisable = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          if (product.disabled === false) {
            return { ...product, disabled: true };
          } else {
            products.length++;
            return { ...product, disabled: false };
          }
        }
        return product;
      })
    );
  };

  const renderProducts = () => {
    return products.map((product) => (
      <div
        className={`item-container ${product.disabled ? "disabled" : ""}`}
        key={product.id}
      >
        <div className=" col-3 content_heading_wrap">
          <div>{product.name}</div>
        </div>
        <div className="col-2 content_heading_wrap">
          <div>{product.category}</div>
        </div>
        <div className="col-2 content_heading_wrap">
          <div>{product.price}</div>
        </div>
        <div className="col-2 content_heading_wrap">
          <div>{product.quantity}</div>
        </div>
        <div className="col content_heading_wrap">
          <div>
            {parseInt(product.price.slice(1)) * parseInt(product.quantity)}
          </div>
        </div>
        <div className="col content_heading_wrap">
          <div className="actions">
            <div>
              <img
                className={isAdmin ? "editIcon" : "editUserIcon"}
                src={isAdmin ? EditIcon : EditUserIcon}
                alt="edit-icon"
                data-toggle="tooltip"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                title={isAdmin ? "Edit" : ""}
                onClick={() => {
                  if (isAdmin && !product.disabled) handleEdit(product);
                }}
              />
            </div>
            <div>
              <img
                className={isAdmin ? "deleteIcon" : "deletedisabled"}
                src={
                  isAdmin
                    ? product.disabled
                      ? DisableIcon
                      : EnableIcon
                    : EnableUserIcon
                }
                alt="enable-icon"
                data-toggle="tooltip"
                title={isAdmin ? (product.disabled ? "Enable" : "Disable") : ""}
                onClick={() => {
                  if (isAdmin) handleDisable(product.id);
                }}
              />
            </div>
            <div>
              <img
                className={isAdmin ? "deleteIcon" : "deletedisabled"}
                src={isAdmin ? DeleteIcon : DeleteDisableIcon}
                alt="edit-icon"
                data-toggle="tooltip"
                title={isAdmin ? "Delete" : ""}
                onClick={() => {
                  if (isAdmin && !product.disabled) handleDelete(product.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <HeaderComponent
        isAdmin={isAdmin}
        toggleAdmin={toggleAdmin}
        LogoutIcon={LogoutIcon}
      />
      <div className="heading">Inventory stats</div>
      <WidgetComponent
        CartIcon={CartIcon}
        products={products}
        DollarIcon={DollarIcon}
        totalValue={totalValue}
        OutOfStock={OutOfStock}
        CategoryIcon={CategoryIcon}
      />
      <div className="content_container">
        <div className="content_container_wrap">
          <div className="" style={{ display: "flex" }}>
            <div className=" col-3 ">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Name</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Category</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Price</span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Quantity</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Value</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="content_heading_wrap">
                <div>
                  <span className="content_heading">Actions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderProducts()}
        <ModalComponent
          showModal={showModal}
          setShowModal={setShowModal}
          CloseIcon={CloseIcon}
          selectedItem={selectedItem}
          setCategory={setCategory}
          setPrice={setPrice}
          setQuantity={setQuantity}
          setValue={setValue}
          handleSaveEdit={handleSaveEdit}
        />
      </div>
    </div>
  );
}

export default App;
