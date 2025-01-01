import type { Book } from "../core/types/Book"

export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch("https://gutendex.com/books/?page=2")
    const data: {
        results: Book[]
    } = await response.json()

    return data.results
}