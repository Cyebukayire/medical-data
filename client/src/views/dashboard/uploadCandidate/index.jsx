import React, { useState } from "react";
import Layout from "../../../components/layout";
import "./styles.css"

const UploadCandidate = ({ message }) => {
    const [ userData, setUserData ] = useState(
        {
            message:"",
            profileURL:""
        }
    )
    return(
        <Layout>
            <div className="upload-candidate-container">
                <form className = "upload-candidate-form">
                    <textarea type="text" value={message} className="candidate-message" name="candidate-message" placeholder="Enter your message" />
                    <label for="profile" className="upload-candidate-label">
                        Select image
                        <input className="candidate-profile-input" type="file" id="profile" />
                    </label>
                    <input className="submit-candidate" type="submit" />
                </form>
            </div>
        </Layout>
    )
}

export default UploadCandidate;