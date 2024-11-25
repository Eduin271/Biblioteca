import React, { useEffect, useState } from "react";
import { getBooks } from "../services/api";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Lista de Libros</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.idLibro}>{book.nombreLibro}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
