// @ts-nocheck
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Conditional } from "../components/Conditional";

interface Props {}

const axios = require("axios");

const schema = Yup.object({
  productId: Yup.number().required("Id must be 8 digits long"),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const GetCubeMetaData: React.FC<Props> = () => {
  const [response, setResponse] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { name } = useParams();

  const handleSubmit = async (id: string) => {
    if (response.productId === id) {
      setToastMessage("Item already exists");
      setShow(true);
      return;
    }
    setIsLoading(true);
    await axios.post("/api/v1/getCubeMetaData/" + id).then(
      (result: any) => {
        if (result.data.status === "FAILED") {
          setResponse(result.data.object.split(".")[0]);
        } else {
          setResponse(result.data.object);
        }
      },
      (error: { message: any }) => {
        setToastMessage(error.message);
        setShow(true);
      }
    );
    setIsLoading(false);
  };

  return (
    <>
      <Grid container direction={"column"} spacing={2}>
        <Grid container item direction={"column"} xs={12}>
          <Formik
            initialValues={{ productId: "" }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values.productId);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="productId"
                  label={"Product Id"}
                  variant="standard"
                  InputProps={{ notched: true }}
                />
                <Button
                  className={"mt-2 ml-1"}
                  variant="contained"
                  type="submit"
                  color={"primary"}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid container item direction={"column"} xs={12}>
          {toastMessage ? (
            <Snackbar
              className={"mx-auto"}
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
            >
              <Alert severity={"error"}>
                <strong>{toastMessage}</strong>
              </Alert>
            </Snackbar>
          ) : null}
        </Grid>
        <Grid container item xs={12} sm={12}>
          {!isLoading && !_.isEmpty(response) ? (
            <Card>
              <CardActionArea
                style={{ textDecoration: "none" }}
                component={Link}
                to={`/athena/${name}/detail/${response.productId}`}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {response.cubeTitleEn}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Product ID: {response.productId}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Status: {response.archiveStatusEn}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`From: ${response.cubeStartDate} to ${response.cubeEndDate}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <small>Released: {response.releaseTime}</small>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            <Conditional isLoading={isLoading} />
          )}
        </Grid>
      </Grid>
    </>
  );
};
