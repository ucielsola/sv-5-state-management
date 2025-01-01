import type { Notification } from "$lib/domains/notifications/core/types/Notification";

class NotificationsStore {
    static Duration = 1500;
    #list: Notification[] = $state([])
    #cleanupFn: () => void;

    constructor() {
        this.#cleanupFn = $effect.root(() => {
            $effect(() => {
                if (this.#list.length === 0) return;

                const timer = setTimeout(() => {
                    this.#list.shift();
                }, NotificationsStore.Duration);

                return () => clearTimeout(timer);
            });
        });
    }

    get notifications(): Notification[] {
        return this.#list;
    }

    public addNotification(notification: Notification): void {
        this.#list.push(notification);
    }

    destroy(): void {
        this.#cleanupFn();
    }
}

const notificationsStore = new NotificationsStore();

export default notificationsStore;