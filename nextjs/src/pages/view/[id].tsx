"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios' //npm install axios 
import Link from "next/link";
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router';
import { Header } from "@/components/Header";
import Users from '@/components/tabledata';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    image?: string;

}

export default function ViewUserPage() {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/users/" + id);
            console.log(result.data.users);
            setUser(result.data.users)

        } catch (err) {
            console.log("Something Wrong");
        }
    }

    return (
        <div>
            <Header />
            <div className="max-w-2xl mx-auto mt-5">
                <h1 className="text-2xl text-center mb-2">View User</h1>
                <table className="table table-zebra">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Avatar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user?.id}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.created_at}</td>
                            <td><div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${user?.image}`}
                                        alt='No Avatar'
                                    />
                                </div>
                            </div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    );
}