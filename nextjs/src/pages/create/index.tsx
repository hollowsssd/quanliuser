"use client";

import React, { useState } from "react";
import axios from 'axios';
import { Header } from "@/components/Header";


const CreateUserPage = () => {
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: "",
        image: null as File | null,
    });

    const changeUserFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    };
    const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUserField({
                ...userField,
                image: e.target.files[0], // Gán tệp
            });
        }
    };

    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData=new FormData();
            formData.append("name",userField.name);
            formData.append("email",userField.email);
            formData.append("password",userField.password);
            if (userField.image) {
                formData.append("image", userField.image);
            }            
            console.log(userField);

             await axios.post("http://127.0.0.1:8000/api/addnew", formData);
            // console.log(response);
            window.location.href = '/';
        } catch (err) {
            console.log("Something Wrong");
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-md mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">Add New User</h1>
                <div>
                    <form onSubmit={onSubmitChange}>
                        <div className="mb-5">
                            <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>

                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email..."
                                    onChange={changeUserFieldHandler}
                                />
                            </label>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name..."
                                    onChange={changeUserFieldHandler}
                                />
                            </label>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password..."
                                    onChange={changeUserFieldHandler}
                                /> 
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Pick a Avatar</span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                                    onChange={changeFileHandler} />
                                <div className="label">
                                </div>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-outline btn-success">
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPage;
