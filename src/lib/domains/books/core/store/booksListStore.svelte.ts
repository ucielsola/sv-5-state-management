import { StoreStateMachine, State } from "$lib/utils/StoreStateMachine.svelte";
import type { Book } from "$lib/domains/books/core/types/Book";

class BooksListStore extends StoreStateMachine {
    #list: Book[] = $state([])

    constructor() {
        super();
    }

    get books(): Book[] {
        return this.#list;
    }

    public hydrate(newList: Book[]): void {
        this.#list = newList;
        this.state = State.Idle
    }
}

const booksListStore = new BooksListStore();

export default booksListStore;