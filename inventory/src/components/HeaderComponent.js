import React from "react";

export default function HeaderComponent({ isAdmin, toggleAdmin, LogoutIcon }) {
  return (
    <>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={isAdmin ? "admin" : "admin-disable"}>
            <span>Admin</span>
          </div>
          <div>
            <div className="toggle">
              <input type="checkbox" id="temp" />
              <label htmlFor="temp" onClick={toggleAdmin}></label>
            </div>
          </div>
          <div className={!isAdmin ? "user" : "user-disable"}>
            <span>User</span>
          </div>
        </div>

        <div>
          <img src={LogoutIcon} className="logoutIcon" alt="logoutIcon" />
        </div>
      </div>
    </>
  );
}
