import Head from 'next/head';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <div>
        <Head>
          <title>About | Stats of Eden</title>
          <meta
            name="description"
            content="About page for Stats of Eden, a website that provides statistics for the game Duelists of Eden"
          />
        </Head>
        <h1>About</h1>
        <p>This site is a work in progress. Stats are refreshed hourly.</p>
        <p>So far I have plans to add:</p>
        <ul>
          <li>More than top 250. Currently I don&#39;t think I can host more on a free plan</li>
          <li>Historical graphs on player rank, matches played, etc</li>
          <li>Character pages</li>
          <li>
            Global stats (top exp, top played characters, matches played, aggregated stats, etc)
          </li>
        </ul>
        <p>
          If you have any feedback you can find me on the{' '}
          <Link target="_blank" href="https://www.discord.gg/OSFE">
            Duelists of Eden
          </Link>{' '}
          discord at Reese <code>(its.reese)</code> or DM me directly.
        </p>
      </div>
    </>
  );
}
