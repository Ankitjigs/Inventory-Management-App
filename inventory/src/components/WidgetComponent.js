import React from "react";

export default function WidgetidgetComponent({
  CartIcon,
  products,
  DollarIcon,
  totalValue,
  OutOfStock,
  CategoryIcon,
}) {
  return (
    <>
      <div className="widgets">
        <div className="widgetWrap">
          <div className="widgetIconWrapClass">
            <img className="widgetIconClass" src={CartIcon} alt="widget-icon" />
          </div>
          <div className="widgetContent">
            <div className="widgetText"> Total Product</div>
            <div className="widgetQuantity">
              <div>
                {
                  products.filter((product) => product.disabled === false)
                    .length
                }
              </div>
            </div>
          </div>
        </div>
        <div className="widgetWrap">
          <div className="widgetIconWrapClass">
            <img
              className="widgetIconClass"
              src={DollarIcon}
              alt="widget-icon"
            />
          </div>
          <div className="widgetContent">
            <div className="widgetText"> Total Store Value</div>
            <div className="widgetQuantity">
              <div>{totalValue}</div>
            </div>
          </div>
        </div>
        <div className="widgetWrap">
          <div className="widgetIconWrapClass">
            <img
              className="widgetIconClass"
              src={OutOfStock}
              alt="widget-icon"
            />
          </div>
          <div className="widgetContent">
            <div className="widgetText"> Out of Stock</div>
            <div className="widgetQuantity">
              <div>
                {
                  products.filter(
                    (product) =>
                      product.disabled === false && product.quantity === 0
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
        <div className="widgetWrap">
          <div className="widgetIconWrapClass">
            <img
              className="widgetIconClass"
              src={CategoryIcon}
              alt="widget-icon"
            />
          </div>
          <div className="widgetContent">
            <div className="widgetText"> No of Categories</div>
            <div className="widgetQuantity">
              <div>
                {
                  Array.from(
                    new Set(
                      products
                        .filter((product) => product.disabled === false)
                        .map((product) => product.category)
                    )
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
