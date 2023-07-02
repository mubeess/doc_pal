import React, { useRef } from "react";
import { CameraOutlined, FileImageOutlined } from "@ant-design/icons";
import { Typography, Divider } from "antd";
import Lottie from "react-lottie-player";
import animationData from "../assets/lottie/lottie.json";

const { Title, Text } = Typography;
export default function UploadCard({
  title,
  upload = false,
  body = "",
  onClick,
  onChange,
  loading,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  const inputRef = useRef();
  return (
    <>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        onChange={onChange}
        type="file"
        accept="image/*"
      />
      <div
        onClick={() => onClick(inputRef)}
        className={`upload_card ${upload && "second"}`}
      >
        <div className="card_icon">
          <div className="card_icon_inner">
            {upload ? (
              <FileImageOutlined size={30} style={{ color: "#000" }} />
            ) : (
              <CameraOutlined size={30} style={{ color: "#000" }} />
            )}
          </div>
        </div>
        <Title style={{ fontSize: 20, color: "#fff" }}>{title}</Title>
        <Text style={{ color: "#fff" }}>{body}</Text>
        <div className={`card_loader ${loading && "active"}`}>
          <Lottie
            loop
            animationData={animationData}
            play
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </div>
    </>
  );
}
