import React from "react";

interface IProps {
  text: string;
  onClick: (e:any) => void;
  className?: string;
}
const Button = ({ text, onClick, className }: IProps) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Button;
