import { defineStore } from 'pinia';


export const algorithmNames = ["bubble", "insertion", "selection"];
export let currentAlgorithm: string;
export interface IReactiveProps {
	visible: boolean,
	algorithm: string
};

export const useReactiveProps = defineStore('visibility', {
	state: (): IReactiveProps => ({
		visible: true,
		algorithm: ""
	}),
	actions: {
		toggle() {
			this.visible = !this.visible;
		},
		setAlgorithm(name: string) {
			this.algorithm = name;
		}
	}
});