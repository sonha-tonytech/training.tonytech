import React, { useRef, useEffect, useState } from "react";
type Props = {
  id?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  isAddNewMessage?: boolean;
  setIsAddNewMessage?: (flag: boolean) => void;
  handleInputSideBar?: (content: string) => void;
  handleInputContentBox?: (content: string) => void;
};

const Input = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddNewMessageBox = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      switch (props.id) {
        case "ip_sidebar":
          props.handleInputSideBar!(inputRef.current!.value);
          break;
        case "ip_content":
          props.handleInputContentBox!(inputRef.current!.value);
          break;
        default:
          return;
      }
      inputRef.current!.value = "";
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (props.isAddNewMessage === true) {
      props.handleInputContentBox!(inputRef.current!.value);
      inputRef.current!.value = "";
      props.setIsAddNewMessage!(false);
    }
  }, [props.isAddNewMessage]);

  return (
    <input
      ref={inputRef}
      id={`${props.id}`}
      className={`px-1 py-2 text-black rounded ${props.className || ""}`}
      type={props.type || ""}
      placeholder={props.placeholder || ""}
      onKeyDown={handleAddNewMessageBox}
    />
  );
};

export default Input;
