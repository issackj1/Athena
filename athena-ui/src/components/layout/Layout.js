import React from "react";
import { Container } from "@material-ui/core";

function Header() {
  return null;
}

function Footer() {
  return null;
}

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
