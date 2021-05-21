export interface Phrase {
    detect: RegExp
    strength: number
    why: string
    replace: Array<string>
}

export interface Detected {
    indicies: Array<number>
    phrase: Phrase
}

export const phrases: Array<Phrase> = [
        {
            detect: /thanks in advance|tia/ig,
            strength: 1,
            why: "Assumptive and directive. It may be interpreted as \"I'm assuming you will do this\".",
            replace: [],
        },
]

export default phrases