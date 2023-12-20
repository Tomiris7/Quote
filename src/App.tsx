import './App.css';
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout.tsx";
import { AddQuote } from "./components/AddQuote/AddQuote.tsx";
import { Quotes } from "./components/Quotes/Quotes.tsx";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.tsx";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Quotes />} />
          <Route path="/quotes/add" element={<AddQuote />} />
          <Route path="/quotes/:categoryName/:quoteId/edit" element={<AddQuote />}/>
          <Route path="/quotes/:categoryName" element={<Quotes />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/*" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
