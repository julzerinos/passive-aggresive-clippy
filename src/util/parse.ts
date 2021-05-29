import { phrases, Phrase, Detected } from './phrases'

export const testString = (message: string): Array<Detected> => {
    const detected: Array<Detected> = []
    let matches
    for (const p of phrases)
        if ((matches = message.matchAll(p.detect))) {
            for (const m of matches)
                if (m.index !== undefined)
                    detected.push({
                        indices: [m.index, m.index + m[0].length],
                        phrase: p,
                    })
        }

    return detected
}

export const parseMarksIntoDOM = function(input: string) {
    const splits = []
    for (const d of testString(input))
        splits.push(splitByIndicies(input, d.indices))

    return splits
}

export const parseMarksIntoHTML = (input: string): string => {
    const mark = 'mark style="color: transparent; background-color: #05123322"'

    for (const d of testString(input)) {
        input = addTag(splitByIndicies(input, d.indices), mark)
    }

    return input
}

const splitByIndicies = (
    string: string,
    indices: Array<number>,
): Array<string> => [
    string.slice(0, indices[0]),
    string.slice(indices[0], indices[1]),
    string.slice(indices[1]),
    `${indices[0]}i${indices[1]}`
]

const addTag = (splits: Array<string>, tag: string): string =>
    splits[0] + '<' + tag + '>' + splits[1] + '</' + tag + '>' + splits[2]
