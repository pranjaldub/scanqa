import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MenuContainer from "../menuContainer/menuContainer";
import FaqContainer from "../faqContainer/faqContainer";

import { useMediaQuery } from "react-responsive";
import Home from "./home";
import MenuSmall from "../menuContainer/menuSmall";
import TextQAContainer from "../textQAConainer/textQAContainer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function HomeContainer() {
  const [toText , setToText] = React.useState(false)
  const [component, setComponent] = React.useState(<Home setComponent={toTextComponenet} setToText={setToText}/>);

  function toTextComponenet(){
    setComponent(<TextQAContainer/>)
  }
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EFEBF5",
          }}
        >
          <Item
            sx={{
              backgroundColor: "#EFEBF5",
              display: "flex",

              justifyContent: "center",
              height: isTabletOrMobile ? "10vh" : "110vh",
              alignItems: "center",
              borderBottom: "none",
            }}
          >
            {isTabletOrMobile && <MenuSmall setComponent={setComponent} />}
            {!isTabletOrMobile && <MenuContainer setComponent={setComponent} toText={toText} setToText={setToText} />}
          </Item>
        </Grid>
        <Grid item xs={12} md={12} lg={9}>
          <Item sx={{ backgroundColor: "white", height: "100%" }}>
            {component}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeContainer;
