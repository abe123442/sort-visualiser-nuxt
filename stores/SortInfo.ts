import { defineStore } from "pinia";
import SortInfoJSON from "@/PagesInfo/SortInfo.json";

export interface ICurrentSort {
	info: Object
};

export const useCurrentSortInfo = defineStore('SortInfo', {
	state: (): ICurrentSort => ({
		info: {}
	}),
	actions: {
		UpdateCurrentSort(newSort: string) {
			switch (newSort) {
				case "bubble":
					this.info = SortInfoJSON.bubble
					console.log(this.info);
					break;
				case "selection":
					this.info = SortInfoJSON.selection
					console.log(this.info);
					break;
				case "insertion":
					this.info = SortInfoJSON.insertion
					console.log(this.info);
					break;
				default:
					break;
			}
		}
	}
});
