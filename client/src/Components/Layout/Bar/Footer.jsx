// Create a Footer component for the application here
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Footer = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 AQ Company. All rights reserved.</p>
                <ul className="flex justify-center space-x-4 mt-2">
                    <li>
                        <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;