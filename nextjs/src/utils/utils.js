import axios from 'axios';

export const getProfile = async (token) => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/auth/profile", 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        // Kiểm tra phản hồi
        if (response.status !== 200) {
            return { success: false, user: null }; 
        }

        // Trả về dữ liệu JSON
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { success: false, user: null };
    }
};
