import { useState } from 'react';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import styles from './PlayersTable.module.css';  

const orderBy = (players, value, direction) => {
    if (direction === 'asc') {
        return [...players].sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }

    if (direction === 'desc') {
        return [...players].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }
    
    return players;
};

// determine arrow direction
const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>
    }

    if (direction === 'desc') {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        )
    }
}

const PlayersTable = ({ players }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState(); 

    const orderedPlayers = orderBy(players, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection('desc');
        } else if (direction === 'desc') {
            setDirection('asc')
        } else {
            setDirection(null);
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    // format score numbers to have commas
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    };

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_profile_pic}></div>

                <button className={styles.heading_username} onClick={() => setValueAndDirection("username")}>
                    <div>Player</div>

                    {value === "username" && <SortArrow direction={direction} />}
                </button>
                <button className={styles.heading_games_won} onClick={() => setValueAndDirection("games_won")}>
                    <div>Games Won</div>

                    {value === "games_won" && <SortArrow direction={direction} />}
                </button>
                <button className={styles.heading_games_lost} onClick={() => setValueAndDirection("games_lost")}>
                    <div>Games Lost</div>

                    {value === "games_lost" && <SortArrow direction={direction} />}
                </button>
                <button className={styles.heading_score} onClick={() => setValueAndDirection("score")}>
                    <div>Score</div>

                    {value === "score" && <SortArrow direction={direction} />}
                </button>
                <button className={styles.heading_seconds_played} onClick={() => setValueAndDirection("seconds_played")}>
                    <div>Time</div>

                    {value === "seconds_played" && <SortArrow direction={direction} />}
                </button>
            </div>
            {orderedPlayers.map((player) => (
                <div key={player.uid}>
                    <div className={styles.row}>
                        <div className={styles.rank}>{player.rank}</div>

                        <div className={styles.profile_pic}>
                            <img src={`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/img/${player.uid}.png`} alt={player.username} />
                        </div>

                        <div className={styles.username}>{player.username}</div>
                        
                        <div className={styles.games_won}>{player.games_won}</div>

                        <div className={styles.games_lost}>{player.games_lost}</div>

                        <div className={styles.score}>{formatNumber(player.score)}</div>

                        {/* format seconds played to hh:mm:ss */}
                        <div className={styles.seconds_played}>{new Date((player.seconds_played) * 1000).toISOString().substr(11, 8)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlayersTable;