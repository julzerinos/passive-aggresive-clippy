import { Phrase } from './Phrase'

export interface Mark {
    splits: Array<string>
    id: string
    phrase: Phrase
}
