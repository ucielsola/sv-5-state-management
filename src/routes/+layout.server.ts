import { getBooks } from '$lib/domains/books/api/getBooks';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    const books = await getBooks()

    return { books };
}) satisfies LayoutServerLoad;