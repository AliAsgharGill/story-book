import { CSSProperties, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  bgColor?: string;
  textColor: string;
}>;

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  bgColor: bgColor = "blue",
  textColor: textColor = "white",
}: ButtonProps) => {
  const variantStyles: Record<ButtonProps["variant"], CSSProperties> = {
    primary: {
      // color: "white",
    },
    secondary: {
      color: "black",
      fontWeight: "bold",
    },
  };

  const sizeStyles: Record<ButtonProps["size"], CSSProperties> = {
    sm: {
      padding: "0.5rem",
    },
    md: {
      padding: "0.75rem",
    },
    lg: {
      padding: "1rem",
    },
  };

  return (
    <button
      style={{
        color: textColor,
        outline: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: 10,
        backgroundColor: bgColor,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
