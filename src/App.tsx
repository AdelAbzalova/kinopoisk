import { FC } from 'react';
import FilmPage from "./components/FilmPage";
import { Route, Routes } from "react-router-dom";
import RandomPage from "./components/RandomPage";
import Main from './components/Main';

const App:FC = () => {

// const token=process.env.REACT_APP_API_TOKEN;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/:id" element={<FilmPage />} />
        <Route path="/chance" element={<RandomPage />} />
      </Routes>
    </div>
  );
};

export default App;
