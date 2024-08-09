import React, { useState } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";

interface ModalProps {
  title: string;
  buttonText: string;
  content: string[];
}

const StyledButton = styled(Button)`
`;

const StyledModal = styled(Modal)`
`;

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
      <StyledButton type="primary" onClick={showModal}>
        {buttonText}
      </StyledButton>
      <StyledModal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </StyledModal>
    </>
  );
};

export default ModalComponent;
