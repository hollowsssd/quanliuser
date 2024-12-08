"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // npm install axios 
import Link from "next/link";

export default function Users() {
    const [userData, setUserData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const fetchData = async (url = "http://127.0.0.1:8000/api/users") => {
        setIsLoading(true);
        try {
            const result = await axios.get(url, {
                params: { email: searchQuery }, // Truyền query tìm kiếm nếu có
            });
            setUserData(result.data.results.data || []);
            setPagination(result.data.results || {});
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading(false); // Dữ liệu đã tải xong
        }
    };

    const handleNextPage = () => {
        if (pagination.next_page_url) fetchData(pagination.next_page_url);
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    };

    const handlePreviousPage = () => {
        if (pagination.prev_page_url) fetchData(pagination.prev_page_url);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/usersdelete/${id}`);
            setUserData((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-end">
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {isLoading ? (
                <span className="loading loading-dots loading-lg"></span>
            ) : (
                <>
                    <table className="table table-zebra">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="py-3 px-6">#</th>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={user.id} className="bg-white border-b">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="flex justify-center gap-1 py-3">
                                        <Link href={`view/${user.id}`} className="btn btn-info">View</Link>
                                        <Link href={`edit/${user.id}`} className="btn btn-warning">Edit</Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="btn btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="join flex justify-center mt-4">
                        {pagination.prev_page_url && (
                            <button className="join-item btn" onClick={handlePreviousPage}>
                                «
                            </button>
                        )}
                        <button className="join-item btn">
                            Page {pagination.current_page || 1} / {pagination.last_page || 1}
                        </button>
                        {pagination.next_page_url && (
                            <button className="join-item btn" onClick={handleNextPage}>
                                »
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
