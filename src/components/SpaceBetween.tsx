import React from "react";
import { Space } from "antd";
import styled, { css } from "styled-components";

export interface SpaceBetweenProps {
  direction?: "horizontal" | "vertical"; 
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"; 
  align?: "start" | "center" | "end" | "baseline" | "stretch"; 
  gap?: number | string; 
  children: React.ReactNode;
  style?: React.CSSProperties; 
}

const StyledSpace = styled(Space)<{
  justify: string;
  direction: "horizontal" | "vertical";
  align?: string;
  gap?: number | string;
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "vertical" ? "column" : "row"};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align || (props.direction === "vertical" ? "stretch" : "center")};
  gap: ${(props) => props.gap || "16px"}; 
  height: 100%;
  width: 100%;
  
  ${(props) =>
    props.direction === "vertical" &&
    css`
      height: auto;
      width: 100%;
    `}
`;

const SpaceBetween: React.FC<SpaceBetweenProps> = ({
  direction = "horizontal", 
  justify = "start", 
  align,
  gap,
  children,
  style,
}) => {
  return (
    <StyledSpace
      direction={direction}
      justify={justify}
      align={align}
      gap={gap}
      style={style}
    >
      {children}
    </StyledSpace>
  );
};

export default SpaceBetween;
