import React from "react";
import { Space } from "antd";
import styled from "styled-components";

export interface SpaceBetweenProps {
  direction: "horizontal" | "vertical";
  justify:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  children: React.ReactNode;
}

const StyledSpace = styled(Space)<{
  justify: string;
  direction: "horizontal" | "vertical";
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "vertical" ? "column" : "row"};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) =>
    props.direction === "vertical" ? "stretch" : "center"};
  height: 100%;
  width: 100%;
`;

const SpaceBetween: React.FC<SpaceBetweenProps> = ({
  direction,
  justify,
  children,
}) => {
  return (
    <StyledSpace direction={direction} justify={justify}>
      {children}
    </StyledSpace>
  );
};

export default SpaceBetween;
