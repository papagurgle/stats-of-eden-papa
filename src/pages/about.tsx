import { DEFAULT_THEME, Grid, List, Space, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { CHARACTER_EXP_FETCH_AMOUNT, PROFILE_EXP_FETCH_AMOUNT } from '~/constants';
import { theme } from '~/theme';

export default function AboutPage() {
  return (
    <>
      <style jsx>{`
        @media (min-width: ${theme.breakpoints?.md}) {
          .changelog-inner {
            direction: rtl;
            padding-inline-end: 2em;
          }
        }
      `}</style>
      {/* Why does this need to be a separate global...? */}
      <style jsx global>{`
        @media (min-width: ${theme.breakpoints?.md}) {
          .changelog-wrapper {
            border-inline-start: 1px solid ${DEFAULT_THEME.colors.gray[7]};
          }
        }
      `}</style>
      <div>
        <Head>
          <title>About | Stats of Eden</title>
          <meta
            name="description"
            content="About page for Stats of Eden, a website that provides statistics for the game Duelists of Eden"
          />
        </Head>
        <Grid>
          <Grid.Col span={{ md: 6 }} className="main">
            <Title order={2} size="h1">
              About
            </Title>
            <p>
              This site is a work in progress. Stats are refreshed hourly. Currently this is
              fetched:
            </p>
            <ul>
              <li>Top {CHARACTER_EXP_FETCH_AMOUNT} ranked players</li>
              <li>Top {PROFILE_EXP_FETCH_AMOUNT} experienced players</li>
              <li>Top {CHARACTER_EXP_FETCH_AMOUNT} players for each character</li>
            </ul>
            <p>I have plans to add:</p>
            <ul>
              <li>More than top {CHARACTER_EXP_FETCH_AMOUNT}</li>
              <li>Country pages</li>
              <li>
                Global stats (top exp, top played characters, matches played, aggregated stats, etc)
              </li>
              <li>
                A &quot;most played&quot;, or &quot;most experience&quot; feature to highlight
                active players
              </li>
            </ul>
            <p>
              If you have any feedback you can find me on the{' '}
              <Link target="_blank" href="https://www.discord.gg/OSFE">
                Duelists of Eden
              </Link>{' '}
              discord at Reese <code>(its.reese)</code> or DM me directly.
            </p>
          </Grid.Col>
          <Grid.Col span={{ md: 4 }} offset={{ md: 2 }} className="changelog-wrapper">
            <div className="changelog-inner">
              <Title order={3} size="h3">
                Changelog
              </Title>
              <Space h="xs" />
              <Text fw="bold" size="sm">
                June 22nd, 2024
              </Text>
              <Space h="xs" />
              <List size="xs">
                <List.Item>
                  Add <Link href="/characters">characters</Link> page
                </List.Item>
                <List.Item>
                  Add player titles & banners (If you don&apos;t see it, try reapplying it ingame)
                </List.Item>
                <List.Item>Add previously known names</List.Item>
              </List>
              <Space h="xs" />
              <Text fw="bold" size="sm">
                June 7th, 2024
              </Text>
              <Space h="xs" />
              <List size="xs">
                <List.Item>Increased players fetched from 250 to 500</List.Item>
                <List.Item>Added player sort</List.Item>
                <List.Item>Added &quot;load more&quot; button</List.Item>
                <List.Item>Updated &quot;last updated&quot; logic</List.Item>
              </List>
              <Space h="md" />
              <Text fw="bold" size="sm">
                May 19th, 2024
              </Text>
              <Space h="xs" />
              <List size="xs">
                <List.Item>Added table sort to homepage</List.Item>
                <List.Item>Added ranked history chart</List.Item>
                <List.Item>Add rank change indicator</List.Item>
              </List>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
