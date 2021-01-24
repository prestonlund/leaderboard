import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import PlayersTable from '../components/PlayersTable/PlayerTable';

export default function Home({ players }) {

  const [keyword, setKeyword] = useState("");

  // display only players that match the input
  const filteredPlayers = players.filter((player) =>
    player.username.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Top {players.length} players</div>

        <div className={styles.input}><SearchInput placeholder='Find a Player' onChange={onInputChange} /></div>

      </div>

      <PlayersTable players={filteredPlayers} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/");
  const result = await res.json();

  // convert json to array ordered in descending order by games won
  const rankOrder = [...result].sort((a, b) => (a.games_won > b.games_won ? -1 : 1));

  // add key of rank and values matching their index + 1 since it's ordered by games won
  const players = rankOrder.map(function(el) {
    const o = Object.assign({}, el);
    o.rank = (rankOrder.indexOf(el) + 1);
    return o;
  });
  
  return {
    props: {
      players,
    },
  };
};