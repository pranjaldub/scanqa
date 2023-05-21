import { createStyles, SegmentedControl, rem } from "@mantine/core";
import Home from "../homeContainer/home";
import TextQAContainer from "../textQAConainer/textQAContainer";
import ImageQAContainer from "../imageQAContainer/imageQAContainer";
import SummaryContainer from "../summaryContainer/summaryContainer";
import FaqContainer from "../faqContainer/faqContainer";
const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: "#DB7093", to: "#DDA0DD" }),
  },

  control: {
    border: "0 !important",
  },

  label: {
    "&, &:hover": {
      "&[data-active]": {
        color: theme.white,
      },
    },
  },
}));

export default function MenuSmall({ setComponent }) {
  const { classes } = useStyles();

  const changeComponent = (event) => {
    if (event.target.defaultValue === "Home") {
      setComponent(<Home />);
    }

    if (event.target.defaultValue === "TextQA") {
      setComponent(<TextQAContainer />);
    }
    if (event.target.defaultValue === "PdfQA") {
      setComponent(<ImageQAContainer />);
    }
    if (event.target.defaultValue === "Summary") {
      setComponent(<SummaryContainer />);
    }
    if (event.target.defaultValue === "FAQ") {
      setComponent(<FaqContainer />);
    }
  };
  return (
    <SegmentedControl
      radius="xl"
      size="sm"
      data={["Home", "TextQA", "PdfQA", "Summary", "FAQ"]}
      classNames={classes}
      onClick={changeComponent}
    />
  );
}
