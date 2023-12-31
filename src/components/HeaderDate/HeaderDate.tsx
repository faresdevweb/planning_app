import "./HeaderDate.scss";
import { Modal } from "@mui/material";
import { useState } from "react";
import Form from "../Form/Form";
import { useDayStore } from "../../store/day";

const HeaderDate = () => {
  const { day } = useDayStore();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container_header_date">
      <h1 className="display_day">{day}</h1>
      <button className="show_form_button" onClick={() => setShowForm(true)}>
        +
      </button>
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <Form setShowForm={setShowForm} />
        </div>
      </Modal>
    </div>
  );
};

export default HeaderDate;
