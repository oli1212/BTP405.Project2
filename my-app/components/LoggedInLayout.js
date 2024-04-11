import React from 'react';
import { Container } from 'react-bootstrap';
import LoggedInMainNav from './LoggedInMainNav';

export default function Layout(props) {
    return (
      <>
      <LoggedInMainNav />
        <br /><br /><br /><br />
        <Container>
            {props.children}
        </Container>
        <br />
      </>
    );
  }