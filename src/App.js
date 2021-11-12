import { useEffect, useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import Framework from "./components/framework";

const APPS = {
  react: {
    name: "React",
    iconPath: "/img/react.svg",
  },
  vue: {
    name: "Vue",
    iconPath: "/img/vue.svg",
  },
  angular: {
    name: "Angular",
    iconPath: "/img/angular.svg",
  },
};

const API_URL = process.env.NODE_ENV === "production" ? "https://ueye-api.hacksore.workers.dev" : "/stats";

const Headers = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        backgroundColor: "primary.main",
        display: "flex",
      }}
    >
      <Typography
        color="text.primary"
        variant="h4"
        sx={{
          pl: 2,
          pt: 1,
          pb: 1
        }}
      >
        <img src="/img/logo.svg" alt="you eye icon" />
      </Typography>
    </Box>
  );
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Headers />
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          {Object.entries(APPS).map(([k, v]) => (
            <Grid key={v.name} item md={4} xs={12}>
              <Framework data={data[k]} {...v} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
