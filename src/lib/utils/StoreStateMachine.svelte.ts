export enum State {
    Initial = 'initial',
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export class StoreStateMachine {
    #current: State = $state(State.Initial);
    #cleanupFn: () => void;

    constructor() {
        this.#cleanupFn = $effect.root(() => {
            $effect(() => {
                if (this.#current === State.Success || this.#current === State.Error) {
                    this.#current = State.Idle;
                }
                console.log(`State change ${this.#current}`);
            });
        });
    }

    get state(): State {
        return this.#current;
    }

    set state(newState: State) {
        if (newState === this.#current) return;

        try {
            if (!this.canTransitionTo(newState)) {
                throw new Error(`Invalid state transition from ${this.#current} to ${newState}`);
            }

            this.#current = newState;
        } catch (error) {
            console.error(error);
            this.#current = State.Error;
        }
    }

    reset(): void {
        this.#current = State.Initial;
    }

    destroy(): void {
        this.#cleanupFn();
    }

    // Dynamic validation of state transitions
    private canTransitionTo(next: State): boolean {
        switch (this.#current) {
            case State.Initial:
                return [State.Idle, State.Loading].includes(next);
            case State.Idle:
                return [State.Loading].includes(next);
            case State.Loading:
                return [State.Success, State.Error].includes(next);
            case State.Success:
            case State.Error:
                return [State.Idle].includes(next);
            default:
                return false;
        }
    }
}