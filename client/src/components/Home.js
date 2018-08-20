import React from "react";
import { Container, Header, Icon, Divider } from "semantic-ui-react";

function style() {
  return {
    container: {
      background: "white",
      margin: "3em"
    },
    header: { padding: "2em" },
    pTag: { padding: "2em" }
  };
}

const Home = () => {
  const styles = style();
  return (
    <Container textAlign="center" style={styles.container}>
      <Header as="h1" style={styles.header}>
        Welcome, User
      </Header>
      <Divider />
      <p>There are 4 products in transit</p>
    </Container>
  );
};

export default Home;
