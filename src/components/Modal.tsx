import React, { useState, ReactNode } from "react";
import { Button, Modal, Spin, Alert, Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;

interface ModalProps {
  title: string;
  buttonText: string;
  buttonStyle?: React.CSSProperties;
  modalStyle?: React.CSSProperties;
  width?: number;
  closable?: boolean;
  footer?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  centered?: boolean;
  maskClosable?: boolean;
  afterClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  showAlert?: boolean;
  alertType?: "success" | "info" | "warning" | "error";
  alertMessage?: string;
  showText?: boolean;
  textToShow?: string;
  children?: ReactNode;
}

const StyledButton = styled(Button)`
  ${(props) => props.style && { ...props.style }};
`;

const StyledModal = styled(Modal)`
  ${(props) => props.style && { ...props.style }};
`;

const ModalComponent: React.FC<ModalProps> = ({
  title,
  buttonText,
  buttonStyle,
  modalStyle,
  width = 520,
  closable = true,
  footer,
  okText = "OK",
  cancelText = "Cancel",
  centered = false,
  maskClosable = true,
  afterClose,
  onOk,
  onCancel,
  loading = false,
  showAlert = false,
  alertType = "info",
  alertMessage = "This is an alert",
  showText = false,
  textToShow = "This is some dynamic text",
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledButton type="primary" onClick={showModal} style={buttonStyle}>
        {buttonText}
      </StyledButton>
      <StyledModal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
        closable={closable}
        footer={footer} // If footer is not provided, it defaults to OK and Cancel buttons
        okText={okText}
        cancelText={cancelText}
        centered={centered}
        maskClosable={maskClosable}
        afterClose={afterClose}
        style={modalStyle}
      >
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <>
            {showAlert && (
              <Alert message={alertMessage} type={alertType} showIcon />
            )}
            {children}
            {showText && <Text>{textToShow}</Text>}
          </>
        )}
      </StyledModal>
    </>
  );
};

export default ModalComponent;
