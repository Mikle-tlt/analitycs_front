import React, { useState } from 'react';
import axios from 'axios';
import {useUserStore} from "../../../services/user/user-service";
import {toast} from "react-toastify";
import {options} from "../../elements/alert/alert-settings";

const FileUpload = ({ getClients }) => {
  const [file, setFile] = useState(null);
  const {user} = useUserStore();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);
    const userId = user.id;
    try {
      await axios.post(`http://localhost:8080/clients/upload-excel/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      getClients(userId);
      toast.success("Продукт успешно добавлен!", options)
    } catch (error) {
      toast.error(error.response?.data, options)
    }
  };

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col">
          <input
            type="file"
            name="excelFile"
            accept=".xlsx, .xls"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">Импорт Excel</button>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
