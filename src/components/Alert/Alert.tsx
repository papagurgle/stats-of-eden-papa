import { Alert as MantineAlert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

type AlertProps = {
  title: string;
  children: React.ReactNode;
};

export default function Alert({ title, children }: AlertProps) {
  return (
    <MantineAlert variant="light" color="pink" title={title} icon={<IconInfoCircle />}>
      {children}
    </MantineAlert>
  );
}
