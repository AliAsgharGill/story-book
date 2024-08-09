import React, { useState } from "react";
import { Button, Modal } from "antd";

interface ModalProps {
  title: string;
  buttonText: string;
  content: string[];
}

const ModalComponent: React.FC<ModalProps> = ({ title, buttonText, content }) => {
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

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </Modal>
    </>
  );
};

export default ModalComponent;
