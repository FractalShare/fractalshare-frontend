/** Every interactive step implements this tiny contract */
export interface Answerable<T = unknown> {
    /** current answer when the step mounts (can be null) */
    value?: T | null;
    /** call once the user has given a VALID answer */
    onAnswered?: (answer: T) => void;
  }
  