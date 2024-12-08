"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export const Header = () => {
    const router = useRouter();

    // const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            // const name = localStorage.getItem("name");
            // setName(name || "noname");
            const image = localStorage.getItem("image");
            setImage(image);
        }
    }, []);

    const Logout = async () => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Cookies.remove("token");
            localStorage.removeItem("image");
            localStorage.removeItem("name");
            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
            router.push("/login");
        }
    };

    return (
        <div>
            <header>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl" href="/">User Management</a>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={`http://127.0.0.1:8000/Storage/${image}`}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">Profile</a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={Logout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
        
            </header >
        </div >
    );
};
