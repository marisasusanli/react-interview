import { DealType } from "../types";

export const CREATE_DEAL = "CREATE_DEAL";
export const REMOVE_DEAL = "REMOVE_DEAL";
export const PUBLISH_DEAL = "PUBLISH_DEAL";
export const SORT_DEALS = "SORT_DEALS";

export const createDeal = (deal: DealType) => {
  return {
    type: CREATE_DEAL,
    payload: {
      deal,
    },
  };
};

export const removeDeal = (deal: DealType) => {
  return {
    type: REMOVE_DEAL,
    payload: {
      deal,
    }
  }
}

export const publishDeal = (deal: DealType) => {
  return {
    type: PUBLISH_DEAL,
    payload: {
      deal,
    }
  }
}

export const sortDeals = (selected: string, asc: boolean) => {
  return {
    type: SORT_DEALS,
    payload: {
      selected,
      asc,

    }
  }
}
