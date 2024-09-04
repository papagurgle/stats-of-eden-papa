import { Alert as MantineAlert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

type AlertProps = {
  title: string;
} & React.ComponentProps<typeof MantineAlert>;

export default function Alert({ title, children, ...props }: AlertProps) {
  return (
    <MantineAlert variant="light" color="pink" title={title} icon={<IconInfoCircle />} {...props}>
      {children}
    </MantineAlert>
  );
}
