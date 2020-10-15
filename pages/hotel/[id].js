import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import Link from "next/link";
import Layout from "../../src/components/Layout";
const Hotel = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log("Data", data);

  return (
    <Layout>
      <div className="reviews-page">
        <h1 className="review-heading">Reviews</h1>
        {data.map((item, index) => (
          <div key={index}>
            {/* <h3 style={{ cursor: "pointer", textTransform: "capitalize" }}>
            {item.name}
          </h3> */}

            <blockquote
              className={
                item.positive ? "otro-blockquote green" : "otro-blockquote red"
              }
            >
              {item.comment ? item.comment : "No Comment"}

              <span>{item.name}</span>
            </blockquote>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Hotel;
