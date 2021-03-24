import React, { useEffect, useState, useRef } from "react";
import { DealType } from "../../types";
import DealsTableRow from "./DealsTableRow/DealsTableRow";
import "./DealsTable.scss";
import { noop } from "lodash";
import SortIcon from '../../assets/SortIcon';

type DealsTableProps = {
  deals: DealType[];
  onRemoveDeal: (deal: DealType) => any;
  onUpdateDeal: (deal: DealType) => any;
  onSortDeals: (selected: string, asc: boolean) => any;
};

const DealsTable = (props: DealsTableProps) => {
  const { deals, onRemoveDeal = noop, onUpdateDeal = noop, onSortDeals = noop} = props;
  const [asc, setAsc ] = useState(false);
  const [selected, setSelected] = useState('');

  const initialRender = useRef(true);

  const dealsTableRows = deals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} handleRemove={onRemoveDeal} handleUpdate={onUpdateDeal} />
  ));

  const iconToDisplay = (column: string) => (column === selected && asc) ?
    <div><SortIcon direction={ "up" }/></div> :  <div><SortIcon direction={ "down" }/></div>;


  const handleSort = (column: string) => {
    setSelected(column);
    setAsc(!asc);
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      onSortDeals(selected, asc);
    }
  }, [selected, asc, onSortDeals]);


  return (
    <div className="tile">
      <div className="tile--header">Deal Portfolio</div>
      <table className='DealsTable'>
        <thead>
          <tr>
            <th className='DealsTable--headerCell' onClick={() => handleSort('institution')}>Institution {iconToDisplay('institution')}</th>
            <th className='DealsTable--headerCell' onClick={() => handleSort('dealType')}>Deal Type {iconToDisplay('dealType')}</th>
            <th className='DealsTable--headerCell' onClick={() => handleSort('dealSize')}>Deal Size {iconToDisplay('dealSize')}</th>
            <th className='DealsTable--headerCell' onClick={() => handleSort('isPublished')}>Is Published? {iconToDisplay('isPublished')}</th>
            <th className='DealsTable--headerCell'>Make Changes </th>
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
