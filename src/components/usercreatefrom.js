import { useEffect,useState } from "react";
import axios from "axios";
import "./usercreatefrom.css";
import { useLocation } from "react-router-dom"; // For reading URL params

export default function UserForm({ qrUrl }) {
    // const [searchParams] = useSearchParams(); // Hook to get URL parameters
    const [formData, setFormData] = useState({
        userFirstName: "",
        userLastName: "",
        userNumber: "",
        userEmail: "",
        userAddress: "",
        userDateOfJoin: "",
        userIDProof: null,
        userPaymentDueDate: "",
        userStatus: "Active",
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const location = useLocation(); // Get current URL
    const [roomID, setRoomID] = useState("");
    const [token, setToken] = useState("");

     // Read URL parameters when the page loads
    //  useEffect(() => {
    //     const roomIDParam = searchParams.get("roomID");
    //     const tokenParam = searchParams.get("token");

    //     if (roomIDParam) setRoomID(roomIDParam);
    //     if (tokenParam) setToken(tokenParam);
    // }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setRoomID(params.get("roomID") || ""); // Get roomID from URL
        setToken(params.get("token") || "");   // Get token from URL
    }, [location.search]);

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.userFirstName.trim()) {
            newErrors.userFirstName = "First name is required";
            valid = false;
        }
        if (!formData.userLastName.trim()) {
            newErrors.userLastName = "Last name is required";
            valid = false;
        }
        if (!/^[0-9]{10}$/.test(formData.userNumber)) {
            newErrors.userNumber = "Enter a valid 10-digit phone number";
            valid = false;
        }
        if (!formData.userEmail.includes("@")) {
            newErrors.userEmail = "Enter a valid email address";
            valid = false;
        }
        if (!formData.userAddress.trim()) {
            newErrors.userAddress = "Address is required";
            valid = false;
        }
        if (!formData.userDateOfJoin) {
            newErrors.userDateOfJoin = "Joining date is required";
            valid = false;
        }
        if (!formData.userPaymentDueDate) {
            newErrors.userPaymentDueDate = "Payment due date is required";
            valid = false;
        }
        if (!formData.userIDProof) {
            newErrors.userIDProof = "Please upload an ID proof";
            valid = false;
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, userIDProof: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
          
        if (!roomID) {
            alert("Room ID is missing!");
            return;
        }

        const userPayload = {
            room: { roomID: roomID }, // Use roomID from URL params
            ...formData,
        };

        try {
            await axios.post("http://localhost:8080/rentmanagementsystem/createuser", userPayload,{
                headers: {
                    Authorization: `Bearer ${token}`, // Include token for authentication if required
                },
            });
            alert("User Created Successfully!");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>User Registration</h2>

            <form onSubmit={handleSubmit}>
                {/* Row 1: First Name & Last Name */}
                <div className="form-group">
                    <input type="text" name="userFirstName" placeholder="First Name" value={formData.userFirstName} onChange={handleChange} className="input-field" required />
                    <input type="text" name="userLastName" placeholder="Last Name" value={formData.userLastName} onChange={handleChange} className="input-field" required />
                </div>

                {/* Row 2: Phone Number & Email */}
                <div className="form-group">
                    <input type="text" name="userNumber" placeholder="Phone Number" value={formData.userNumber} onChange={handleChange} className="input-field" required />
                    <input type="email" name="userEmail" placeholder="Email" value={formData.userEmail} onChange={handleChange} className="input-field" required />
                </div>

                {/* Row 3: Address */}
                <div className="form-group full-width">
                    <textarea name="userAddress" placeholder="Address" value={formData.userAddress} onChange={handleChange} className="input-field" required />
                </div>

                {/* Row 4: Date of Joining & Payment Due Date */}
                <div className="form-group">
                    <input type="date" name="userDateOfJoin" value={formData.userDateOfJoin} onChange={handleChange} className="input-field" required />
                    <input type="date" name="userPaymentDueDate" value={formData.userPaymentDueDate} onChange={handleChange} className="input-field" required />
                </div>

                {/* Row 5: Upload ID Proof */}
                <label className="file-upload">
                    Upload ID Proof
                    <input type="file" name="userIDProof" onChange={handleFileChange} required />
                </label>

                {/* Row 6: Submit & Cancel Buttons */}
                <div className="form-group">
                    <button type="submit" className="btn-primary">Submit</button>
                    <button type="button" onClick={() => setShowModal(true)} className="btn-secondary">Cancel</button>
                </div>
            </form>

            {/* Modal for Cancel Confirmation */}
            {showModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to cancel?</p>
                        <div className="form-group">
                            <button onClick={() => window.close()} className="btn-primary">Yes</button>
                            <button onClick={() => setShowModal(false)} className="btn-secondary">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

