import { FC, ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { TQuote } from "../../types/quote.ts";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddQoute.module.css";

interface IAddQuoteProps {
  id?: string;
  category?: string;
  author?: string;
  quoteText?: string;
}

export const AddQuote: FC<IAddQuoteProps> = ({
  id,
  category,
  author,
  quoteText,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = Boolean(location.state);

  useEffect(() => {
    if (location.state) {
      const { id, category, author, quoteText } = location.state;
      setQuoteId(id);
      setQuoteCategory(category);
      setQuoteAuthor(author);
      setText(quoteText);
    }
  }, [location.state]);

  const [quoteId, setQuoteId] = useState(id);
  const [quoteCategory, setQuoteCategory] = useState(category || "/starwars");
  const [quoteAuthor, setQuoteAuthor] = useState(author || "");
  const [text, setText] = useState(quoteText || "");

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuoteCategory(e.target.value);
  };

  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setQuoteAuthor(e.target.value);
    }
  };

  const handleChangeQuoteText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim() !== "") {
      setText(e.target.value);
    }
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (quoteAuthor !== undefined && text !== undefined) {
        if (quoteAuthor.trim() !== "" && text.trim() !== "") {
          const newQuote: TQuote = {
            category: quoteCategory,
            author: quoteAuthor,
            quoteText: text,
          };

          if (quoteId) {
            await axios.put(
              `https://quotes-1a97b-default-rtdb.europe-west1.firebasedatabase.app/quotes/${quoteCategory}/${quoteId}.json`,
              newQuote
            );
          } else {
            await axios.post(
              `https://quotes-1a97b-default-rtdb.europe-west1.firebasedatabase.app/quotes/${quoteCategory}.json`,
              newQuote
            );
          }
        }

        setQuoteId("");
        setQuoteCategory("");
        setQuoteAuthor("");
        setText("");
        navigate("/");
      } else {
        alert("Заполните все поля");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h3>{isEditMode ? "Edit quote" : "Submit new quote"}</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="category">Category</label>
        <select
          value={quoteCategory}
          name="category"
          id="category"
          onChange={handleChangeCategory}
        >
          <option value="/starwars">Star Wars</option>
          <option value="/famouspeople">Famous people</option>
          <option value="/saying">Saying</option>
          <option value="/humour">Humour</option>
          <option value="/motivational">Motivational</option>
        </select>
        <label htmlFor="author">Author</label>
        <input
          className={styles["input-author"]}
          value={quoteAuthor}
          name="author"
          type="text"
          onChange={handleChangeAuthor}
        />

        <label htmlFor="quote">Quote text</label>
        <textarea
          value={text}
          name="quote"
          id="quote"
          onChange={handleChangeQuoteText}
        />
        <button className={styles["btn"]} type="submit">
          {isEditMode ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};
