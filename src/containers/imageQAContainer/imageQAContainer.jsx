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
import { ToastContainer, toast } from 'react-toastify';
import image from "./text.svg";
import TextAreaComponent from "../../components/textArea";
import { motion } from "framer-motion";
import DropzoneButton from "../../components/fileUpload";
import React, { useEffect, useRef,useState } from 'react';
import TextAnswer from "../../components/textAnswer";
import { fetchPdfAnswer } from "../../api/api";
import { Loader } from '@mantine/core';
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

export default function ImageQAContainer() {
  const [content, setContent] = useState('');
  const [question, setQuestion] = useState();
  const [answerObj, setAnswer] = useState({});
  const [loading , setLoading] = useState(false)
const [pdfFile, setPdfFile] = useState([])
const [file,setFile] = useState(false)

const [enableButton , setEnableButton] = useState(false)
 useEffect(()=>{
  if(question?.target?.value.length>0 && file){
    setEnableButton(true)
  }
  else{
    setEnableButton(false)
  }
 },[ question , file])
  // ===============================================================
  async function loadPdfWorkers(){
    const pdfJS = await import('pdfjs-dist/build/pdf');
			pdfJS.GlobalWorkerOptions.workerSrc =
				window.location.origin + '/pdf.worker.min.js';
  }
useEffect(() => {
 
  loadPdfWorkers();
 
}, [])

useEffect(() => {
 
  if(pdfFile.length){
    
    getTextFromPdf()
    //console.log(pdfFile)
  }
 
}, [pdfFile])


	async function getTextFromPdf() {
    try{
			// We import this here so that it's only loaded during client-side rendering.
			const pdfJS = await import('pdfjs-dist/build/pdf');
			pdfJS.GlobalWorkerOptions.workerSrc =
				window.location.origin + '/pdf.worker.min.js';
       
			const doc = await pdfJS.getDocument({url : URL.createObjectURL(pdfFile[0].file)}).promise;
      let pageTexts = Array.from({length: doc.numPages}, async (v,i) => {
        return (await (await doc.getPage(i+1)).getTextContent()).items.map(token => token.str).join('');
    });
    const text = await Promise.all(pageTexts)
    setContent(text)
    console.log("text",text.join(''))
		setFile(true)
  }
  catch (error) {
   //alert(error.message)
   toast.error(error.message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
   setPdfFile([])
   setFile(false)
  
 }
		};
	
// ==================================================================
async function getAnswer() {
  setLoading(true)
  try{
  const data =await fetchPdfAnswer(question.target.value,content)
  // console.log(content.target.value);
  //console.log(await response.json());
  setAnswer(data);
  setLoading(false)
  }
  catch (error) {
    //alert("something went wrong, please try again")
    toast.error("something went wrong. Please try again later.", {
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
  const { classes } = useStyles();
  const spring = {
    type: "spring",
    damping: 15,
    stiffness: 100,
  };
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
                PdfQA
              </span>{" "}
              model <br /> for document based query
            </Title>
            <Text color="dimmed" mt="md">
              Experience the cutting-edge of computer vision with our extractive
              question answering model. Effortlessly retrieve accurate answers
              from pdfs, revolutionizing information retrieval and unlocking
              new possibilities for visual data analysis.
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
              <DropzoneButton setPdfFile={setPdfFile} />
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

              <TextAreaComponent rows={2} label="Question" set={setQuestion} />
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
               {loading && <Loader color="white" variant="dots" /> }
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
