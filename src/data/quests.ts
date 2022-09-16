export const quests = {
  simple: [
    {title: 'Simple 1', description: 'Description Simple 1'},
    {title: 'Simple 2', description: 'Description Simple 2'},
    {title: 'Simple 3', description: 'Description Simple 3'},
    {title: 'Simple 4', description: 'Description Simple 4'},
  ],
  medium: [
    {title: 'Medium 1', description: 'Description Medium 1'},
    {title: 'Medium 2', description: 'Description Medium 2'},
    {title: 'Medium 3', description: 'Description Medium 3'},
    {title: 'Medium 4', description: 'Description Medium 4'},
  ],
  hard: [
    {title: 'Hard 1', description: 'Description Hard 1'},
    {title: 'Hard 2', description: 'Description Hard 2'},
    {title: 'Hard 3', description: 'Description Hard 3'},
    {title: 'Hard 4', description: 'Description Hard 4'},
  ],
  ultra: [
    {title: 'Ultra 1', description: 'Description Ultra 1'},
    {title: 'Ultra 2', description: 'Description Ultra 2'},
  ],
} as QuestsType

type QuestsType = {
  simple: Array<QuestType>,
  medium: Array<QuestType>,
  hard: Array<QuestType>,
  ultra: Array<QuestType>,
}

export type KeysQuestsType = keyof QuestsType

export type QuestType = {
  title: string
  description: string
}