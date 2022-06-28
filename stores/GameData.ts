import { defineStore } from 'pinia';


export const algorithms = ["bubble", "insertion", "selection"];

export interface IAppUseState {
	used: boolean
};

export const useStateCounter = defineStore('useCounter', {
	state: (): IAppUseState => ({
		used: false,
	}),
	actions: {
		toggle() {
			this.used = !this.used;
		}
	}
});