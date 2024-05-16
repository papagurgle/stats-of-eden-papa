import {
  Anchor,
  Burger,
  Center,
  Container,
  Drawer,
  Flex,
  Grid,
  Group,
  Text,
  Title,
  type MantineSize,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import Search from '~/components/Search/Search';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import styles from './header.module.scss';

export default function Header() {
  const breakpoint: MantineSize = 'xs';
  const [opened, { toggle, close }] = useDisclosure(false);
  const Links = () => (
    <Anchor href="/about" component={Link} className={styles.link}>
      About
    </Anchor>
  );

  return (
    <>
      <Drawer opened={opened} onClose={close} size="80%">
        <Links />
      </Drawer>
      <Container component="header" mt="xs" mb="xl">
        <Grid>
          <Grid.Col span="content" className={styles.logoWrapper}>
            <Flex gap="sm">
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom={breakpoint}
                aria-label="Open menu"
              />
              <Anchor href="/" component={Link} className={styles.logo} underline="never" unstyled>
                <Title size="h3">Stats of Eden</Title>
                <Text size="xs" component="span" className={styles.logoNote}>
                  (beta)
                </Text>
              </Anchor>
            </Flex>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              [breakpoint]: 'auto',
            }}
          >
            <Search />
          </Grid.Col>
          <Grid.Col visibleFrom={breakpoint} span="content">
            <Center>
              <Group ml="xs" gap="md">
                <Links />
                <ColorSchemeToggle />
              </Group>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
