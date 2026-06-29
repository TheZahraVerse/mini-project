import { useState, useCallback } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);

  const open = useCallback((modalType, modalData, onConfirm) => {
    setType(modalType);
    setData(modalData);
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setType(null);
      setData(null);
      setOnConfirmCallback(null);
    }, 300);
  }, []);

  const confirm = useCallback(async () => {
    if (onConfirmCallback) {
      await onConfirmCallback(data);
    }
    close();
  }, [data, onConfirmCallback, close]);

  return {
    isOpen,
    type,
    data,
    open,
    close,
    confirm,
  };
};

export default useModal;