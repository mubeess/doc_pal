import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;
export default function Details({ params }) {
  const { state } = useLocation();

  const [value, setValue] = useState(state.data);

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
          console.log(value);
        }}
        style={{ marginBottom: 10, marginTop: 10, width: "95%", height: 50 }}
      >
        Save
      </Button>
      <Button type="primary" style={{ width: "95%", height: 50 }}>
        Share
      </Button>

      <Button type="dashed" style={{ width: "95%", height: 50, marginTop: 10 }}>
        Retake
      </Button>
    </div>
  );
}
