import { ReportsActions } from "./reportsActions";

export const reducer = (state: any, action: any) => {
	switch (action.type) {
		case ReportsActions.SHOW_MODAL:
			return { ...state, isShowModal: true };
		case ReportsActions.HIDE_MODAL:
			return { ...state, isShowModal: false };
		default:
			throw new Error("Unexpected action");
	}
};
