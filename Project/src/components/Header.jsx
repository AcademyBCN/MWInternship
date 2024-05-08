import React, { useState, useEffect } from "react";
import './HeaderStyles.css'
import logo from "../images/FSP_logo_2023.png"

function Header() {

    return (
        <div className = "headerContainer">
            <img src={logo} className = "FSPLogo"></img>
            <div className = "titleContainer">
                <h1>intern recruitment exercise</h1>
            </div>
        </div>
    )
}

export default Header;