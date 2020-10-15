import { Card, Button } from "antd";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import useSWR from "swr";

import Layout from "../src/components/Layout";
import styles from "../styles/Home.module.css";
import styled from "styled-components";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const LH = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
`;

const Home = () => {
  const { data, error } = useSWR(
    "http://fake-hotel-api.herokuapp.com/api/hotels?count=10",
    fetcher
  );

  if (error)
    return (
      <Layout>
        <div>Failed to load</div>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  console.log("Data", data);

  const retrievedHotels = data.map((item) => (
    <Card
      title={item.name}
      style={{ maxWidth: 200, width: 200, margin: 30, height: 400 }}
      key={item.id}
      cover={
        <img
          alt="example"
          src="https://source.unsplash.com/200x300/?hotel"
          style={{
            margin: "2rem 4rem",
            width: "auto",
            maxWidth: "200px",
            justifyContent: "center",
            display: "flex",
            height: 200,
            maxHeight: 200,
          }}
        />
      }
    >
      <Button>
        <NextLink href="hotel/[id]" as={`hotel/${item.id}`}>
          Reviews
        </NextLink>
      </Button>
    </Card>
  ));

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Hotels</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <LH className={styles.main}>
          <div className="hotel">{retrievedHotels}</div>
        </LH>

        <footer className={styles.footer}>Made by me</footer>
      </div>
    </Layout>
  );
};

export default Home;
