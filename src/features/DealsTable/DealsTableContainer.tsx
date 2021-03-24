import { connect } from "react-redux";
import DealsTable from "./DealsTable";
import { DealsListType, DealType } from "../../types";
import { removeDeal, publishDeal, sortDeals } from "../../redux/actions";

type DispatchType = (arg0: {
  type: string;
  payload: { deal: DealType };
} | {
  type: string;
  payload: { selected: string, asc: boolean }
}) => any;


const mapStateToProps = (state: DealsListType) => {
  const { deals } = state;
  return {
    deals,
  };
};

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onRemoveDeal: (deal: DealType) => dispatch(removeDeal(deal)),
  onUpdateDeal: (deal: DealType) => dispatch(publishDeal(deal)),
  onSortDeals: (selected: string, asc: boolean) => dispatch(sortDeals(selected, asc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);
