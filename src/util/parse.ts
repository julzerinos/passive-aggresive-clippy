import { phrases, Phrase, Detected } from './phrases'

export const testString = (message: string): Array<Detected> => {
    const detected: Array<Detected> = []
    let matches
    for (const p of phrases)
        if ((matches = message.matchAll(p.detect))) {
            for (const m of matches)
                if (m.index !== undefined)
                    detected.push({
                        indicies: [m.index, m.index + m[0].length],
                        phrase: p,
                    })
        }

    return detected
}

export const parseMarksIntoDOM = function*(input: string) {
    for (const d of testString(input)) {
        yield {
            ...d,
        }
    }
}

export const parseMarksIntoHTML = (input: string): string => {
    const mark = 'mark style="color: transparent; background-color: #05123322"'

    for (const d of testString(input)) {
        input = addTag(input, d.indicies, mark)
    }

    return input
}

const addTag = (string: string, indices: Array<number>, tag: string): string =>
    string.slice(0, indices[0]) +
    '<' +
    tag +
    '>' +
    string.slice(indices[0], indices[1]) +
    '</' +
    tag +
    '>' +
    string.slice(indices[1])
