import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

export function reduce(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.LOGIN:
            newAppState.userType = action.payload;
            break;
        case ActionType.IS_COMPANY:
            newAppState.isCompany = action.payload;
            break;
        case ActionType.ADD_USER:
            newAppState.user = action.payload;
            break;
    }

    return newAppState;
}