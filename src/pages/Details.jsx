import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import TextToPdf from "../components/TextToPdf";
const { TextArea } = Input;
export default function Details({ params }) {
  const { state } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleExportPDF = async () => {
    const pdfBlob = await ReactPDF.renderToStream(<TextToPdf text={value} />);
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "example.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };
  const [value, setValue] = useState(state.data);
  const navigate = useNavigate();

  return (
    <div className="detail_container">
      <div className="head">
        <img src="docpal.png" id="logo" />
      </div>
      <textarea
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Details"
        rows={5}
      />
      <Button
        onClick={() => {
          showModal();
        }}
        style={{ marginBottom: 10, marginTop: 10, width: "95%", height: 50 }}
      >
        Save
      </Button>
      <Button type="primary" style={{ width: "95%", height: 50 }}>
        Share
      </Button>

      <Button
        onClick={() => {
          navigate("/");
          setValue("");
        }}
        type="dashed"
        style={{ width: "95%", height: 50, marginTop: 10 }}
      >
        Retake
      </Button>
      <Modal
        title="Select file type"
        open={isModalOpen}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Button
          onClick={() => handleCancel()}
          type="primary"
          style={{ marginRight: 20 }}
        >
          <PDFDownloadLink
            document={<TextToPdf text={value} />}
            fileName="docpal.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Pdf!"
            }
          </PDFDownloadLink>
        </Button>
        <Button>Save as Word</Button>
      </Modal>
    </div>
  );
}
