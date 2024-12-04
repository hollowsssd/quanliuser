"use client";

import React from "react";
import Cookies from "js-cookie"; 
import { useRouter } from "next/navigation"; // Sử dụng useRouter để chuyển hướng
import axios from "axios";

export const Header = () => {
    const router = useRouter();

    const Logout = async () => {
        const token = Cookies.get("token");
        // console.log(token);
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            // Gọi API logout
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/logout", 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header
                    },
                }
            );
            Cookies.remove("token");
            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
            // Nếu có lỗi xảy ra, vẫn chuyển hướng về trang login
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
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://i.pinimg.com/736x/f8/16/c9/f816c9a2846546a3b2a70e0bdfdd8e20.jpg" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={Logout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};