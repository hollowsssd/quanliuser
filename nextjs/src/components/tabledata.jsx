"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios' //npm install axios 
import Link from "next/link";

export default function Users() {
    const [userData, setUSerData] = useState([]);
    const [pagination, setPageData] = useState({});
    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async (url = "http://127.0.0.1:8000/api/users") => {
        try {
            const result = await axios.get(url);
            // console.log(result.data.results.data);
            setUSerData(result.data.results.data);
            setPageData(result.data.results);
            console.log(result.data.results);
        } catch (err) {
            console.log("something Wrong");
        }
    }
    const handleNextPage = () => {
        fetchData(pagination.next_page_url);
        window.scroll(0, 0);
    }
    const handlePreviousPage = () => {
        fetchData(pagination.prev_page_url);
        window.scroll(0, 0);

    }

    const handleDelete = async (id) => {
        // console.log(id);
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);
        const newUserData = userData.filter((item) => {
            return (
                item.id !== id
            )
        })
        setUSerData(newUserData);
    }
    return (
        <div>
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
                    {userData.map((rs, index) => (
                        <tr key={rs.id} className="bg-white border-b">
                            <td className="py-3 px-6">{index + 1}</td>
                            <td className="py-3 px-6">{rs.name}</td>
                            <td className="py-3 px-6">{rs.email}</td>
                            <td className="flex justify-center gap-1 py-3">
                                <Link
                                    href={`view/${rs.id}`}
                                    className="btn btn-info">
                                    View
                                </Link>
                                <Link
                                    href={`edit/${rs.id}`}
                                    className="btn btn-warning">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(rs.id)} className="btn btn-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="join flex justify-center ">
                {pagination.prev_page_url ? (
                    <button className="join-item btn" onClick={handlePreviousPage}>«</button>
                ) : null}

                <button className="join-item btn">Page 
                    {/* {pagination.current_page} /{pagination.last_page} */}
                     </button>
                {pagination.next_page_url ? (
                    <button className="join-item btn" onClick={handleNextPage}>»</button>
                ) : null}
            </div>
        </div>
    );
}