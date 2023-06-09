import {
  createStyles,
  Text,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

export default function SummaryCard({ body }) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment} style={{display:"flex",justifyContent:"flex-start",flexDirection:"column"}}>
      <Group>
        <div>
          <Text fz="sm">"Your summary will be generate here"</Text>
          {/* <Text fz="xs" c="dimmed">
              {postedAt}
            </Text> */}
     &nbsp;
     
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
          
        />
        </div>
      </Group>
    </Paper>
  );
}
