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
import image from "./text.svg";
import TextAreaComponent from "../../components/textArea";
import { motion } from "framer-motion";
import DropzoneButton from "../../components/fileUpload";

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
                ImageQA
              </span>{" "}
              model <br /> for Image based query
            </Title>
            <Text color="dimmed" mt="md">
              Experience the cutting-edge of computer vision with our extractive
              question answering model. Effortlessly retrieve accurate answers
              from images, revolutionizing information retrieval and unlocking
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
              <DropzoneButton />
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

              <TextAreaComponent rows={2} label="Question" />
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                style={{ backgroundColor: "#C96FA7" }}
              >
                Generate Answer
              </Button>
              <TextAreaComponent rows={2} label="Answer" />
            </Group>
          </div>

          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </motion.div>
  );
}