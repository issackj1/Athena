import React from "react";
import { Container } from "@material-ui/core";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  auth: boolean;
  logout: () => void;
  children: any;
}

export const Layout: React.FC<Props> = ({ auth, logout, children }) => {
  return (
    <Container>
      <Header auth={auth} logout={logout} />
      {children}
      <Footer />
    </Container>
  );
};
