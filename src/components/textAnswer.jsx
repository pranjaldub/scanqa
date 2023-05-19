import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { useMediaQuery } from "react-responsive";
const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export default function TextAnswer({ stat }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <Paper withBorder radius="md" p="xs" key={stat.label}>
      <Group>
        {stat.answer && (
          <RingProgress
            size={70}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={<Center>{stat.progressLabel}%</Center>}
          />
        )}

        <div>
          <Text color="black" size="xs" transform="uppercase" weight={400}>
            {!stat.answer ? "Your answer will be generated here" : stat.label}
          </Text>
          <Text weight={500} size={isTabletOrMobile ? "xs" : "md"}>
            {stat.answer}
          </Text>
        </div>
      </Group>
    </Paper>
  );

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stat}
    </SimpleGrid>
  );
}
