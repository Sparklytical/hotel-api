import React from "react";
import NextLink from "next/link";
import Link from "next/link";
import styled from "styled-components";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;

  h2 {
    color: #847d7f;
    cursor: pointer;
  }
`;

const Header = (props) => {
  return (
    <Navbar>
      <NextLink href="/">
        <h2>Hotels</h2>
      </NextLink>
    </Navbar>
  );
};

export default Header;
