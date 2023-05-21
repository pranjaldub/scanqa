import {
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
} from "@mantine/core";
import image from "./image.svg";
import {motion} from "framer-motion"

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

const placeholder ={

  question1:"Ensure the grammar is accurate and use relevant keywords in the question. When working with PDF inputs, strive to maintain an alphabetical focus and keep the PDF clean.",
question2:"The Text QA model used is DistilBERT-base-cased-distilled-SQuAD. The same model is applied to PDFs, but specifically on OCRed text. The text summarizer relies on Facebook's BART-large-CNN model.",
question3:"Currently, the functionality is restricted to PDFs due to limited resources. However, we have plans to incorporate image functionality in the future.",
question4:"Uploaded files are not being transmitted anywhere; they are solely processed on the client side.",
question5:"In future implementations, potential enhancements may involve text paraphrasing with improved grammar, transitioning from extractive question answering to generative question answering, and expanding question answering tasks to include table data."}

export default function FaqContainer() {
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
     className={classes.wrapper}>
      <Container size="md">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password" >
                <Accordion.Control>
                  How can I get the best result?
                </Accordion.Control>
                <Accordion.Panel >{placeholder.question1}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>
                  Which models are working behind the scenes ?
                </Accordion.Control>
                <Accordion.Panel>{placeholder.question2}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Can I perform document question answering from image file?
                </Accordion.Control>
                <Accordion.Panel>{placeholder.question3}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Do you store files uploaded for processing?
                </Accordion.Control>
                <Accordion.Panel>{placeholder.question4}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>
                  What could be the future implementations?
                </Accordion.Control>
                <Accordion.Panel>{placeholder.question5}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </motion.div>
  );
}
