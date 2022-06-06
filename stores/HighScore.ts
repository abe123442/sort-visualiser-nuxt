import { defineStore } from 'pinia'

export interface IScoreState {
    score: number
}

export const useScore = defineStore('score', {
    state: (): IScoreState => ({
        score: 0,
    }),
    actions: {
        setNewScore(score: number) {
          this.score=score
        },
    },
})
