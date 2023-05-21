import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "./scan.svg";
import { motion } from "framer-motion";
import TextQAContainer from "../textQAConainer/textQAContainer";
import React, { useLayoutEffect , useEffect} from "react";
const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: "theme.primaryColor",
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function Home({ setComponent,setToText }) {
  console.log("home rendered")
  //console.log(setToText)
  // React.useEffect(()=>{setToText(false)},[])
  
  const { classes } = useStyles();
  const spring = {
    type: "spring",
    damping: 15,
    stiffness: 100,
  };
  function changeComponent(){
    setToText(true)
    setComponent(<TextQAContainer />);
    
    
    
  }
  // useEffect(()=>{setToText(false)},[])
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={spring}
    >
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              An{" "}
              <span
                className={classes.highlight}
                style={{ backgroundColor: "#DCB0E2", color: "black" }}
              >
                AI
              </span>{" "}
              based <br /> document query
            </Title>
            <Text color="dimmed" mt="md">
              Elevate your document and image question answering capabilities
              with HuggingFace powered AI-powered model. Harness the power of
              state-of-the-art natural language and computer vision
              understanding to effortlessly retrieve accurate answers from both
              textual and visual content. Experience a seamless integration of
              advanced AI technology for comprehensive information retrieval.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon
                  size={20}
                  radius="xl"
                  style={{ backgroundColor: "#C96FA7" }}
                >
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <List.Item style={{ display: "flex" }}>
                <b>Text QA</b> – Question answering from text data
              </List.Item>
              <List.Item style={{ display: "flex" }}>
                <b>Pdf QA</b> – Question answering from PDFs such as
                research papers
              </List.Item>
              <List.Item style={{ display: "flex" }}>
                <b>Text Summarize</b> – Limit content length with generative AI
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                style={{ backgroundColor: "#C96FA7" }}
                onClick={()=> {changeComponent()}}
              >
                Get started
              </Button>
              <a href="https://github.com/pranjaldub/scanqa">
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                style={{ color: "#C96FA7" }}
              >
                Source code
              </Button>
              </a>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </motion.div>
  );
}
