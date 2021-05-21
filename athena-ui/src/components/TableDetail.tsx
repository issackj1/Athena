// @ts-nocheck
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import _ from "lodash";
import { Conditional } from "./Conditional";

type Props = {};

const axios = require("axios");

export const TableDetail: React.FC<Props> = (props: Props) => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});

  const memoizedFetchTable = useCallback(async () => {
    setIsLoading(true);
    await axios.post("/api/v1/getCubeMetaData/" + productId).then(
      (result: any) => {
        return JSON.stringify(data);
      },
      (error: any) => {}
    );
    setIsLoading(false);
  }, [productId]);

  useEffect(() => {
    memoizedFetchTable().then(
      (result: any) => {
        if (result.data.status === "FAILED") {
          setResponse(result.data.object.split(".")[0]);
        } else {
          setResponse(result.data.object);
        }
      },
      (error: any) => {}
    );
  }, [memoizedFetchTable]);

  const details = (response) => {
    return (
      <>
        <p>{response.cubeTitleEn}</p>
        <p>{response.productId}</p>
        <p>{response.archiveStatusEn}</p>
        <p>{`From: ${response.cubeStartDate} to ${response.cubeEndDate}`}</p>
        <p>Released: {response.releaseTime}</p>
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box my={20}>
        {isLoading ? (
          <Conditional isLoading={isLoading} />
        ) : !_.isEmpty(response) ? (
          details(response)
        ) : (
          <h1>Something went wrong...</h1>
        )}
      </Box>
    </Container>
  );
};
