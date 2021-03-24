import { noop } from "lodash";
import React from "react";
import { DealType } from "../../../types";

import "./DealsTableRow.scss";

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

type DealsTableRowProps = {
  deal: DealType;
  handleRemove: (deal: DealType) => any;
  handleUpdate: (deal: DealType) => any;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  const {
    deal: { institution, dealType, dealSize, isPublished },
    handleRemove = noop,
    handleUpdate = noop
  } = props;

  return (
    <tr className='DealsTableRow'>
      <td className='DealsTableRow--cell'>{institution}</td>
      <td className='DealsTableRow--cell'>{dealType}</td>
      <td className='DealsTableRow--cell'>
        {currencyAmountToString(dealSize)}
      </td>
      <td className='DealsTableRow--cell'>{isPublished ? "Yes" : "No"}</td>
      <td className='DealsTableRow--cell'>
        <button className='DealsTableRow--publishButton' disabled={isPublished} onClick={() => { handleUpdate({...props.deal, isPublished: true}); } }>
        Publish Deal
        </button>
        <button className='DealsTableRow--removeButton' onClick={() => { handleRemove(props.deal); } } >
        Remove Deal
        </button>
      </td>
    </tr>
  );
};

export default DealsTableRow;
