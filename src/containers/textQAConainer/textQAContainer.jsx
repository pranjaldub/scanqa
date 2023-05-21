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
import Alert from "../../components/alert";
import { IconCheck } from "@tabler/icons-react";
import image from "./text.svg";
import TextAreaComponent from "../../components/textArea";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TextAnswer from "../../components/textAnswer";
import { fetchTextAnswer } from "../../api/api";
import { Loader } from '@mantine/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function TextQAContainer() {
 
  const { classes } = useStyles();
  const spring = {
    type: "spring",
    damping: 15,
    stiffness: 100,
  };

  const [content, setContent] = useState({});
  const [question, setQuestion] = useState({});
  const [answerObj, setAnswer] = useState({});
  const [loading , setLoading] = useState(false)
  const [enableButton , setEnableButton] = useState(false)

 useEffect(()=>{
  if(content?.target?.value.length>0 && question?.target?.value.length>0){
    setEnableButton(true)
  }
  else{
    setEnableButton(false)
  }
 },[content , question])
  async function  getAnswer() {
    setLoading(true)
    try{
    const data =await fetchTextAnswer(question.target.value,content.target.value)
   
    console.log(data)
    setAnswer(data);
    setLoading(false)
    }
    catch (error) {
   // alert("Might be a connection issue . Please try again later.")
   toast.error('🦄 Wow so easy!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
      setLoading(false)
    }
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
                TextQA
              </span>{" "}
              model <br /> for text question answer
            </Title>
            <Text color="dimmed" mt="md">
              Maximize your information extraction efficiency with an NLP-based
              extractive text question answering model. Seamlessly retrieve
              accurate answers from text documents, saving time and enhancing
              productivity.
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
              {/* <List.Item style={{ display: "flex" }}>
                <b>Text QA</b> – Question answering from text data
              </List.Item>
              <List.Item style={{ display: "flex" }}>
                <b>Image QA</b> – Question answering from images such as
                invoices
              </List.Item>
              <List.Item style={{ display: "flex" }}>
                <b>Text Summarize</b> – Limit content length with generative AI
              </List.Item> */}
              <TextAreaComponent rows={5} label="Content" set={setContent} setButton={setEnableButton} />
              <br />
              <TextAreaComponent rows={2} label="Question" set={setQuestion}/>
            </List>
            <Group mt={30} style={{ display: "flex", justifyContent: "center" }}>
             
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                style={{ backgroundColor: "#C96FA7" }}
                onClick={getAnswer}
               disabled={!enableButton}
              >
                 {loading && <Loader  color="white" variant="dots" /> }
                {!loading && "Generate Answer"}
              </Button>
              <ToastContainer />
              <TextAnswer
                stat={{
                  label: "answer",
                  color: "green",
                  answer: answerObj.answer,
                  progress: answerObj.score * 100,
                  progressLabel: Math.trunc(answerObj.score * 100),
                }}
              />
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </motion.div>
  );
}
