import React, {FC} from 'react';
import AppRouter from "./router/AppRouter";
import './index.scss'

const App: FC = () => {
    return (
        <div className="app">
            <AppRouter/>
        </div>
    );
}

export default App;
