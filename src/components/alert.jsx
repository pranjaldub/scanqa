import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function AlertComponent({heading , message}) {
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="{heading}" color="pink" radius="lg" withCloseButton>
      {message}
    </Alert>
  );
}