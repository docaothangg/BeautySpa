import React from 'react'

const SearchBar = () => {
    return (
        <div>
            SearchProduct
        </div>
    )
}

export default SearchBar




// import React, { useState } from "react";
// import axios from "axios";

// const SearchBar = ({ onSearch }) => {
//     const [query, setQuery] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSearch = async () => {
//         if (!query.trim()) return;

//         setLoading(true);
//         try {
//             const response = await axios.get("http://localhost:4000/api/search", {
//                 params: { query, type: "all" },
//             });
//             onSearch(response.data.data); // Truyền kết quả tìm kiếm ra ngoài
//         } catch (error) {
//             console.error("Lỗi khi tìm kiếm:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Nhập từ khóa tìm kiếm..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="border p-2 w-full"
//             />
//             <button
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="bg-blue-500 text-white px-4 py-2 mt-2"
//             >
//                 {loading ? "Đang tìm..." : "Tìm kiếm"}
//             </button>
//         </div>
//     );
// };

// export default SearchBar;