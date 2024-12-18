import styled from "styled-components";
import { ReactNode } from "react";

interface LinkStyledProps {
  className?: string;
  children: ReactNode;
}

export const LinkStyled = ({ className, children }: LinkStyledProps) => {
  return <StyledLink className={className}>{children}</StyledLink>;
};

const StyledLink = styled.div`
  color: white;
  text-decoration: none;

  &:hover {
    color: lightgray;
  }
`;
