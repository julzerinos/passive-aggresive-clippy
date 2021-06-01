import { Phrase } from '@/types/Phrase'

export const strengths: Record<number, string> = {
    1: '#BFF0D4',
    2: '#B8E2C8',
    3: '#ABC8C7',
    4: '#A5B5BF',
    5: '#B0A1BA',
}

export const phrases: Array<Phrase> = [
    {
        detect: /(thanks|thx|(thank you)) in advance|tia/gi,
        strength: 1,
        why:
            'Assumptive and directive. Might as well tell them you know they have no choice.',
        replace: [],
    },
    {
        detect: /supposed to be done by you|you are supposed to do this/gi,
        strength: 3,
        why: 'Do not use this unless you are the boss.',
        replace: [],
    },
    {
        detect: /per my last email|as (discussed|stated|talked) (recently|previously)|as (recently|previously) (discussed|stated|talked)/gi,
        strength: 2,
        why:
            'This may be interpreted as an accusation of failed reading skills.',
        replace: [],
    },
    {
        detect: /(going|moving) forwards?,? (i would)|(i'?d) prefer( that you)?/gi,
        strength: 3,
        why: 'Who are you to tell them what to do?',
        replace: ['Tell them this in person.'],
    },
    {
        detect: /(as no doubt,? you are aware)|(as you no doubt are aware)/gi,
        strength: 3,
        why:
            'Implies a given. The recipient may feel inferior if they had missed the memo.',
        replace: [],
    },
    {
        detect: /obviously/gi,
        strength: 3,
        why: "If it's obvious, why is there an email thread?",
        replace: [],
    },
    {
        detect: /for your convenience/gi,
        strength: 3,
        why:
            'You may come off as pretentious for having to do their job for them.',
        replace: [],
    },
    {
        detect: /correct me,? if i'?m wrong/gi,
        strength: 1,
        why: "If you know you're correct, don't entice a debate.",
        replace: [],
    },
    {
        detect: /(i )?(apologi(z|s)e|sorry|apologies) for (the|my) (delayed|late) (response|reply)/gi,
        strength: 1,
        why:
            "Are you sure you want to let them know this wasn't a prioity for you?",
        replace: [],
    },
    {
        detect: /(i )?(apologi(z|s)e|sorry|apologies) for being unclear/gi,
        strength: 1,
        why:
            'They may feel they have inconvenienced you with their lack of understanding.',
        replace: [],
    },
    {
        detect: /does that make sense\?/gi,
        strength: 1,
        why: 'This may come across as condescending.',
        replace: [
            "If you have any questions, let's discuss this over the phone.",
        ],
    },
    {
        detect: /to put it more simply/gi,
        strength: 3,
        why: 'Yeah. No.',
        replace: [],
    },
    {
        detect: /:\)/gi,
        strength: 2,
        why: 'Careful there partner.',
        replace: [],
    },
    {
        detect: /:-\)/gi,
        strength: 5,
        why: "Now that's unforgivable.",
        replace: [],
    },
    {
        detect: /friendly reminder/gi,
        strength: 3,
        why: "Reminders aren't anyone's friends.",
        replace: [],
    },
    {
        detect: /not sure if you saw my last email/gi,
        strength: 3,
        why: 'They saw it.',
        replace: [],
    },
    {
        detect: /any updates? on this/gi,
        strength: 3,
        why: "Pair this with a Friday 5 o'clock for extra points.",
        replace: [],
    },
    {
        detect: /please advise/gi,
        strength: 4,
        why: 'This is the essence of responsiblity transfer.',
        replace: [],
    },
    {
        detect: /hope you'?re ((having a( nice| good| great) day)|((doing )?(well|good)))/gi,
        strength: 3,
        why: "Do you really? They won't reply any faster y'know.",
        replace: [],
    },
    {
        detect: /(xo)+/gi,
        strength: 5,
        why: 'What are you even doing here?',
        replace: [],
    },
    {
        detect: /!{2,}|\?{2,}/gi,
        strength: 4,
        why: 'Calm down.',
        replace: [],
    },
    {
        detect: /\nregards/gi,
        strength: 4,
        why:
            "What? Not even a 'kind' or a 'warm'? What did they do to hurt you?",
        replace: [],
    },
    {
        detect: /i hope you don'?t mind/gi,
        strength: 4,
        why: 'Which of the ten commandments have you broken now?',
        replace: [],
    },
    {
        detect: /(with respect)|(with all due respect)/gi,
        strength: 5,
        why: 'All 0% of it.',
        replace: [],
    },
    {
        detect: /to whom it may concern/gi,
        strength: 3,
        why: 'The void thanks you for your contribution.',
        replace: [],
    },
    {
        detect: /let'?s circle back (on|to) this/gi,
        strength: 3,
        why: 'In about 80 days around the world.',
        replace: [],
    },
    {
        detect: /in order to set expectations/gi,
        strength: 3,
        why: "They've never been set any lower.",
        replace: [],
    },
    // {
    //     detect: /according to my records/gi,
    //     strength: 3,
    //     why: ".",
    //     replace: [],
    // },
    {
        detect: /just/gi,
        strength: 3,
        why:
            "Looks like you're hesitant about something. Can I help you with that?.",
        replace: [],
    },
    {
        detect: /hopefully/gi,
        strength: 3,
        why: 'Hopefully you can stop writing terrible emails.',
        replace: [],
    },
    {
        detect: /(asap)|(as soon as possible)/gi,
        strength: 4,
        why: 'Got it - as soon as I finish clearing out my inbox.',
        replace: [],
    },
    {
        detect: /sent from my/gi,
        strength: 3,
        why: 'Wow, what a hero.',
        replace: [],
    },
    {
        detect: /howdy/gi,
        strength: 3,
        why: 'Yee haw 🤠',
        replace: [],
    },
]
