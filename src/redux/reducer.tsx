import { CREATE_DEAL, REMOVE_DEAL, PUBLISH_DEAL, SORT_DEALS } from "./actions";
import { DealType, DealsListType } from "../types";

let nextDealId = 4;

export const initialState: DealsListType = {
  deals: [
    {
      id: 1,
      institution: "LS Credit Union",
      dealSize: "1000000",
      dealType: "Consumer Auto",
      isPublished: true,
    },
    {
      id: 2,
      institution: "LS Credit Union",
      dealSize: "5000000",
      dealType: "Real Estate",
      isPublished: false,
    },
    {
      id: 3,
      institution: "Greenpoint Credit Union",
      dealSize: "3000000",
      dealType: "Personal",
      isPublished: false,
    },
  ],
};

type ActionType = {
  type: string;
  payload: { deal: DealType }
} & {
  type: string;
  payload: { selected: string, asc: boolean }
};

function sortHelper(arr: any[], field: string, asc: boolean) {
  return arr.sort(function (a, b) {
    let element1 = a[field];
    let element2 = b[field];
    if (field === 'dealSize') {
      element1 = parseInt(element1);
      element2 = parseInt(element2);
    }
    if (element1 > element2) {
      if (asc) return 1;
      return  -1;
    }
    if (element2 > element1) {
      if (asc) return -1;
      return 1;
    }
    return 0;
  })
}

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CREATE_DEAL:
      return {
        ...state,
        deals: [...state.deals, { ...action.payload.deal, id: nextDealId++ }],
      };
    case REMOVE_DEAL:
      return {
        ...state,
        deals: state.deals.filter((deal) => deal.id !== action.payload.deal.id),
      }
    case PUBLISH_DEAL:
      return {
        ...state,
        deals: state.deals.map((deal) => deal.id === action.payload.deal.id ? action.payload.deal : deal),
      }
    case SORT_DEALS:
      let sortedArr = sortHelper([...state.deals], action.payload.selected, action.payload.asc);
      return {
        ...state,
        deals: sortedArr,
      }
    default:
      return state;
  }
};
