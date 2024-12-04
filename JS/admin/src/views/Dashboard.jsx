import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  envFilePresent,
  googleCredentialsPresent,
  redisCredentialsPresent,
  uploadENVFile,
  uploadGoogleCredentials,
} from '../controllers/adminSlice';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function Dashboard() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleUploadENVFile = (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    dispatch(uploadENVFile(file));
  };

  const handleUploadGoogleCreds = (e) => {
    e.preventDefault();
    dispatch(uploadGoogleCredentials());
  };

  useEffect(() => {
    dispatch(envFilePresent());
  }, []);

  useEffect(() => {
    dispatch(googleCredentialsPresent());
  }, []);

  useEffect(() => {
    dispatch(redisCredentialsPresent());
  }, []);

  return (
    <>
      <div class="dashboard">
        <h2>Dashboard</h2>

        <div className="upload-env">
          <h3>Upload ENV File</h3>

          <form action="">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".env"
              required
            />
            <button onClick={handleUploadENVFile} type="submit" id="submit">
              Upload
            </button>
          </form>
        </div>

        <div class="google-creds" id="google_creds">
          <h3>Google Service Account</h3>
          <h4 id="google_creds_message"></h4>

          <form
            class="google-creds-upload"
            id="google_creds_upload"
            enctype="multipart/form-data">
            <input type="file" name="file" id="file" required />
            <button onClick={handleUploadGoogleCreds} type="submit" id="submit">
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
