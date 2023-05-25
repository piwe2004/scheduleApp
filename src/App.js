import { useState } from "react";
import Calendar from "./component/Calendar";

function App() {
    const [currentDate, setCurrentDate] = useState(new Date())

    return (
        <Calendar currenDate={currentDate} />
    );
}

export default App;
