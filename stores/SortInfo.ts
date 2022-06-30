import { defineStore } from "pinia";
import SortInfoJSON from "@/PagesInfo/SortInfo.json";

export interface ICurrentSort {
	info: Object,
	sortState: number
};

export const useCurrentSortInfo = defineStore('SortInfo', {
	state: (): ICurrentSort => ({
		info: {},
		sortState: 0
	}),
	actions: {
		UpdateCurrentSort(newSort: string) {
			switch (newSort) {
				case "bubble":
					this.info = SortInfoJSON.bubble;
					break;
				case "selection":
					this.info = SortInfoJSON.selection;
					break;
				case "insertion":
					this.info = SortInfoJSON.insertion;
					break;
				default:
					break;
			}
		},
		IncrementSortState() {
			if (this.sortState == Object.keys(this.info).length - 1) return;
			this.sortState++;
		},
		DecrementSortState() {
			this.sortState--;
		}
	}
});
