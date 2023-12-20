import { FC, useEffect, useState } from "react";
import axios from "axios";
import { TQuote } from "../../types/quote.ts";
import { Quote } from "../Quote/Quote.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Preloader } from "../Preloader/Preloader.tsx";
import styles from "./Quotes.module.css";

export const Quotes: FC = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<TQuote[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const deleteQuote = async (category: string, id: string | undefined) => {
    try {
      await axios.delete(
        `https://quotes-1a97b-default-rtdb.europe-west1.firebasedatabase.app/quotes/${category}/${id}.json`
      );
      await fetchQuotes();
    } catch (e) {
      console.log(e);
    }
  };

  const editQuote = (quote: TQuote) => {
    navigate(`/quotes/${quote.category.replace("/", "")}/${quote.id}/edit`, {
      state: {
        id: quote.id,
        category: quote.category,
        author: quote.author,
        quoteText: quote.quoteText,
      },
    });
  };

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      let url = `https://quotes-1a97b-default-rtdb.europe-west1.firebasedatabase.app/quotes.json`;

      if (selectedCategory !== "") {
        url = `https://quotes-1a97b-default-rtdb.europe-west1.firebasedatabase.app/quotes/${selectedCategory}.json`;
      }

      const response = await axios.get(url);
      const data = response.data;

      if (selectedCategory === "") {
        const newQuotes: TQuote[] = Object.keys(data).flatMap((category) =>
          Object.keys(data[category]).map((key) => ({
            id: key,
            category,
            author: data[category][key].author,
            quoteText: data[category][key].quoteText,
          }))
        );
        setQuotes(newQuotes);
      } else {
        const newQuotes: TQuote[] = Object.keys(data).map((key) => ({
          id: key,
          category: data[key].category,
          author: data[key].author,
          quoteText: data[key].quoteText,
        }));

        setQuotes(newQuotes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavLinkClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetchQuotes();
  }, [selectedCategory]);

  return (
    <div className="container">
      <div className={styles["quotes-container"]}>
        <div className={styles["menu"]}>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes"
            end
            onClick={() => handleNavLinkClick("")}
          >
            All
          </NavLink>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes/starwars"
            onClick={() => handleNavLinkClick("starwars")}
          >
            Star Wars
          </NavLink>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes/famouspeople"
            end
            onClick={() => handleNavLinkClick("famouspeople")}
          >
            Famous People
          </NavLink>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes/saying"
            onClick={() => handleNavLinkClick("saying")}
          >
            Saying
          </NavLink>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes/humor"
            onClick={() => handleNavLinkClick("humour")}
          >
            Humour
          </NavLink>
          <NavLink
            className={styles["menu-link"]}
            to="/quotes/motivational"
            onClick={() => handleNavLinkClick("motivational")}
          >
            Motivational
          </NavLink>
        </div>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className={styles["quotes"]}>
            {quotes.map((quote) => (
              <Quote
                key={quote.id}
                author={quote.author}
                category={quote.category}
                quoteText={quote.quoteText}
                deleteQuote={() => deleteQuote(quote.category, quote.id)}
                editQuote={() => editQuote(quote)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
