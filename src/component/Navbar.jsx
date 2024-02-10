import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navbar extends Component {
   
    render() {
        return (
            <nav className={`navbar navbar-expand-lg bg-${this.props.modeVariable} navbar-${this.props.modeVariable}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Samachar
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">
                                    Sports
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">
                                    Technology
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">
                                    Business
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">
                                    Entertainment
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">
                                    Health
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">
                                    Science
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onClick={this.props.modeMethod}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                        ></label>
                    </div>
                </div>
            </nav>
        );
    }
}
