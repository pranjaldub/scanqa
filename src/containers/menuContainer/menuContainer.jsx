import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import FaqContainer from "../faqContainer/faqContainer";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import { useMediaQuery } from "react-responsive";

import TextQAContainer from "../textQAConainer/textQAContainer";
import ImageQAContainer from "../imageQAContainer/imageQAContainer";
import SummaryContainer from "../summaryContainer/summaryContainer";
import Home from "../homeContainer/home";

export default function MenuContainer({ setComponent , toText ,setToText  }) {
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  
function changeCP(){
  setSelectedIndex(1)
  setComponent(<Home  setComponent={setComponent} setToText={setToText} />)
  setToText(false)
}
  // React.useEffect(()=>{},[changedToText])
  const handleListItemClick = (event, index) => {
    
    console.log("menu event", event.target.childNodes[0]);
    if (  index === 1) {
      
      setComponent(<Home  setComponent={setComponent} setToText={setToText} />);
      
    }
    if ( toText || index === 0) {
      setToText(false)
      
      setComponent(<TextQAContainer  />);
     
    }
    if (index === 2) {
      setComponent(<ImageQAContainer />);
    }
    if (index === 3) {
      setComponent(<SummaryContainer />);
    }
    if (index === 4) {
      setComponent(<FaqContainer />);
    }
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        width: isTabletOrMobile ? "100%" : "100%",
        bgcolor: "#EFEBF5",
        display: "flex",
        justifyContent: "center",
        height: "35%",
      }}
    >
      <List
        aria-label="main mailbox folders"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: isTabletOrMobile ? "row" : "column",
          padding: 0,
        }}
        xs={3}
      >
            <ListItemButton
          selected={selectedIndex === 1 && !toText}
          onClick={(event) => {changeCP()}}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            width: "90%",
            height: 30,
            "&.Mui-selected": {
              backgroundColor: "#BF6FC9",
            },
            
          }}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 0 || toText}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            width: "90%",
            height: 30,
            "&.Mui-selected": {
              backgroundColor: "#BF6FC9",
            },
            
          }}
        >
          <ListItemText primary="TextQA" />
        </ListItemButton>
    
        {/* --------------------------------------- */}
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            width: "90%",
            height: 30,
            "&.Mui-selected": {
              backgroundColor: "#BF6FC9",
            },
          }}
        >
          <ListItemText primary="PdfQA" />
        </ListItemButton>
        {/* ---------------------------------------- */}
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            width: "90%",
            height: 30,
            "&.Mui-selected": {
              backgroundColor: "#BF6FC9",
            },
          }}
        >
          <ListItemText primary="Summary" />
        </ListItemButton>

        {/* --------------------------------- */}
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            width: "90%",
            height: 30,
            "&.Mui-selected": {
              backgroundColor: "#BF6FC9",
            },
          }}
        >
          <ListItemText primary="FAQ" />
        </ListItemButton>
        {/* <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton> */}
      </List>
      <Divider />
      {/* <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List> */}
    </Box>
  );
}
