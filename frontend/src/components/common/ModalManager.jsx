import React from "react";
import ConfirmModal from "./ConfirmModal";
import { getModalConfig } from "../../constants/modalConfigs";

const ModalManager = ({ modal, onClose, onConfirm }) => {
  const { isOpen, type, data } = modal;

  if (!isOpen || !type) return null;

  const config = getModalConfig(type, data);
  if (!config) return null;

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={config.title}
      message={config.message}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
      variant={config.variant}
    />
  );
};

export default ModalManager;