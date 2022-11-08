import styles from './styles/App.module.scss';
import Calendar from "./components/Calendar/Calendar";
import {useState} from "react";

function App() {
    const [date, setDate] = useState(()=>new Date());

    return (
        <div className={styles.App}>
           <Calendar value={date} onChange={setDate}/>
        </div>
    );
}

export default App;
