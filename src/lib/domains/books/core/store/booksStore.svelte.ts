import { StoreStateMachine, State } from "$lib/utils/StoreStateMachine.svelte";
import { getBook } from "$lib/domains/books/api/getBook";
import type { Book } from "$lib/domains/books/core/types/Book";

class BookStore extends StoreStateMachine {
    #current: Book = $state(null!)

    constructor() {
        super();
    }

    get book(): Book {
        return this.#current
    }

    get loading(): boolean {
        return this.state === State.Loading
    }

    public async loadBookById(id: number, callback?: () => void) {
        if (this.#current?.id === id) return

        this.state = State.Loading
        try {
            this.#current = await getBook(id)

            this.state = State.Success
            callback?.()
        } catch (error) {
            this.state = State.Error
        }

    }
}

const bookStore = new BookStore();

export default bookStore;