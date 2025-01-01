import type { Book } from "../core/types/Book"

export const getBook = async (id: number): Promise<Book> => {
    const response = await fetch(`https://gutendex.com/books/?ids=${id}`)
    const data = await response.json()

    const book = data.results[0]

    if (book) {
        return book
    } else {
        throw new Error(`No book found with id: ${id}`)
    }
}