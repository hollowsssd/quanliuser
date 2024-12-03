"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; //npm install axios 
import { useRouter } from 'next/router';
import { Header } from "@/components/Header";

export default function ViewUserPage() {
    const router = useRouter();
    const { id } = router.query;

    // Kiểm tra nếu id chưa có giá trị (undefined), không thực hiện fetch
    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });

    const fetchUser = async () => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
            console.log(result.data.users);
            setUserField(result.data.users);
        } catch (err) {
            console.log("Something went wrong while fetching user.");
        }
    };

    // Hàm xử lý sự kiện thay đổi giá trị của các input (đảm bảo đúng kiểu sự kiện)
    const changeUserFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý sự kiện submit form
    const onSubmitChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngừng hành vi mặc định của form (reload trang)
        try {
            await axios.put(`http://127.0.0.1:8000/api/usersupdate/${id}`, userField);
            router.push('/'); // Sau khi cập nhật xong, chuyển hướng về trang chủ
        } catch (err) {
            console.log("Something went wrong while updating user.");
        }
    };

    if (!id) {
        return <div>Loading...</div>; // Hiển thị loading khi chưa có id
    }

    return (
        <div>
            <Header />

            <div className="max-w-md mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">Edit Form</h1>
                <form onSubmit={onSubmitChange}>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">ID:</label>
                        <input
                            type="text"
                            id="id" name="id"
                            value={id}
                            className="input input-bordered w-full max-w-xs"
                            disabled />
                        
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">Full Name:</label>
                        <input
                            type="text"
                            className="input input-bordered input-primary w-full max-w-xs"
                            placeholder="Enter Your Full Name"
                            name="name"
                            value={userField.name}
                            onChange={changeUserFieldHandler}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">Email:</label>
                        <input
                            type="email"
                            className="input input-bordered input-primary w-full max-w-xs"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={userField.email}
                            onChange={changeUserFieldHandler}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="block text-sm font-medium text-gray-900">Password:</label>
                        <input
                            type="password"
                            className="input input-bordered input-primary w-full max-w-xs"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            value={userField.password} // Thêm giá trị cho password
                            onChange={changeUserFieldHandler}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}
