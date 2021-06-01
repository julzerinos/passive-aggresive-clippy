import { phrases } from './phrases'
import { Detected } from '@/types/Detected'
import { Mark } from '@/types/Mark'

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

export const parseMarksIntoDOM = function(input: string): Array<Mark> {
    const splits = []
    for (const d of testString(input))
        splits.push({
            splits: splitByIndicies(input, d.indices),
            id: `${d.indices[0]}i${d.indices[1]}`,
            phrase: d.phrase,
        })

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
]

const addTag = (splits: Array<string>, tag: string): string =>
    splits[0] + '<' + tag + '>' + splits[1] + '</' + tag + '>' + splits[2]
