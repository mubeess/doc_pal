import React from "react";
import "../App.css";
import { Divider, Typography, notification } from "antd";

import { useState } from "react";
import useQuery from "../hooks/useQuery";
import UploadCard from "../components/UploadCard";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
function Home() {
  const { query, loading } = useQuery();
  const [loadFirst, setLoadFirst] = useState(false);
  const [loadSecond, setLoadSecond] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="head">
        <img src="docpal.png" id="logo" />
      </div>
      <Title style={{ color: "#fff", fontSize: 30 }}>
        Your Trusted Medical Companion
      </Title>
      <UploadCard
        loading={loading && loadFirst}
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          if (e.target.files.length) {
            setLoadFirst(true);
            const response = await query({
              method: "POST",
              file: selectedFile,
              url: "/upload-image",
            });
            setLoadFirst(false);
            if (response.success) {
              navigate("/details", {
                state: {
                  data: response.data.message,
                },
              });
            } else {
              notification.error({
                message: `Error`,
                description: "Error uploading image, please try again.",
                placement: "topRight",
              });
            }
          }
        }}
        onClick={(ref) => {
          ref.current.click();
          console.log(ref.current);
          // openCamera();
        }}
        body="  You can transcribe you image by snapping or scanning using your
        camera"
        title="Snap Your Document"
      />
      <Divider plain style={{ borderColor: "#fff", color: "#fff" }}>
        OR
      </Divider>
      <UploadCard
        loading={loading && loadSecond}
        onChange={async (e) => {
          const selectedFile = e.target.files[0];
          if (e.target.files.length) {
            setLoadSecond(true);
            const response = await query({
              method: "POST",
              file: selectedFile,
              url: "/upload-image",
            });
            setLoadSecond(false);
            console.log(response);
          }
        }}
        onClick={(ref) => {
          ref.current.click();
        }}
        body="You can also transcribe you document by uploading your scanned image"
        upload
        title="Uplaod Your Document"
      />
    </div>
  );
}

export default Home;
