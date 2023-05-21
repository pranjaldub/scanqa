import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "./text.svg";
import TextAreaComponent from "../../components/textArea";
import { motion } from "framer-motion";
import SummaryCard from "../../components/summaryCard";
import CustomizedSlider from "../../components/slider";
import Divider from "@mui/material/Divider";
import { useState , useEffect } from "react";
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

export default function SummaryContainer() {
  const { classes } = useStyles();
  const spring = {
    type: "spring",
    damping: 15,
    stiffness: 100,
  };

  const [content, setContent] = useState();
 
  const [answerObj, setAnswer] = useState({});
  const [loading , setLoading] = useState(false)
  const [enableButton , setEnableButton] = useState(false)
  useEffect(()=>{
   if(content?.target?.value.length>0 ){
     setEnableButton(true)
   }
   else{
     setEnableButton(false)
   }
  },[content ])
  async function getAnswer() {
    setLoading(true)
    const url =
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
    const data = {
      inputs: content.target.value,
      
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer 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"
      },
      body: JSON.stringify(data),
    });
    // console.log(content.target.value);
    //console.log(await response.json());
    const resp = await response.json()
    setAnswer(resp[0]);
    console.log(resp)
    setLoading(false)
  }
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
              A{" "}
              <span
                className={classes.highlight}
                style={{ backgroundColor: "#DCB0E2", color: "black" }}
              >
                Summarization
              </span>{" "}
              model <br /> for generating content summary
            </Title>
            <Text color="dimmed" mt="md">
              Unleash the power of NLP with our abstractive summary generator.
              Automatically generate concise and coherent summaries from text,
              condensing information for quick insights and efficient knowledge
              consumption.
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
                alignItems: "center",
              }}
            >
              
                <TextAreaComponent rows={5} label="Content"  set={setContent}   />
              
                {/* <Divider orientation="vertical" flexItem /> */}
                
              
              &nbsp; &nbsp;
                <Button
                  radius="xl"
                  size="md"
                  className={classes.control}
                  style={{ backgroundColor: "#C96FA7" }}
                  onClick={getAnswer}
                  disabled={!enableButton}
                >
                   {loading && "Getting Answer"}
                {!loading && "Generate Answer"}
                </Button>
              {/* <CustomizedSlider /> */}
              &nbsp; &nbsp;
              <div style={{ display: "block" }}>
                <SummaryCard body={answerObj.summary_text} />
              </div>
            </List>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </motion.div>
  );
}
