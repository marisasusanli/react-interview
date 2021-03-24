import React, { useState } from "react";
import noop from "lodash/noop";
import { DealType, ErrorType } from "../../types";
import "./NewDealForm.scss";

type DealFormProps = {
  onCreateDeal: (deal: DealType) => any;
};

const DEFAULT_DEAL: DealType = {
  institution: "",
  dealType: "",
  dealSize: "",
  isPublished: false,
};

const DEFAULT_ERRORS: ErrorType = {
  institution: "",
  dealType: "",
  dealSize: "",
};

const DealForm = (props: DealFormProps) => {
  const { onCreateDeal = noop } = props;
  const [newDeal, setNewDeal] = useState(DEFAULT_DEAL);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  const handleUpdateProperty = (property: string) => (
    e: React.ChangeEvent<any>
  ) => setNewDeal({ ...newDeal, [property]: e.target.value });


  const handleCreateDeal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {institution, dealType, dealSize} = newDeal;
    setErrors({ ...DEFAULT_ERRORS });
    // This could get unwieldy if there are a lot of additional ways in which the data needs to be validated
    // If that were the case, I would create a separate function to check for validation
    if (!institution) {
      setErrors({...errors, institution: 'This field is required.'})
    } else if (!dealType){
      setErrors({...errors, dealType: 'This field is required.'})
    } else if (!dealSize) {
      setErrors({...errors, dealSize: 'This field is required.'})
    } else if (isNaN(Number(dealSize))) {
      setErrors({...errors, dealSize: 'Please enter a valid number for deal size'})
    } else {
      onCreateDeal({ ...newDeal });
      // Reset state for the next deal input.
      setNewDeal({ ...DEFAULT_DEAL });
      setErrors({ ...DEFAULT_ERRORS });
    }
  };

  return (
    <form className='NewDealForm tile'>
      <div className='tile--header'>Add New Deal</div>
      <div className='NewDealForm--div'>
        <label className={errors.institution ? 'NewDealForm--error' : 'NewDealForm--label'}>Institution</label>
        <input
          className={errors.institution ? 'NewDealForm--errorInput' : 'NewDealForm--input'}
          value={newDeal.institution}
          placeholder='LS Credit Union'
          onChange={handleUpdateProperty("institution")}
          required
        />
        <span className="NewDealForm--error">{errors.institution}</span>
      </div>
      <div className='NewDealForm--div'>
        <label className={errors.dealType ? 'NewDealForm--error' : 'NewDealForm--label'}>Deal Type</label>
        <input
          className={errors.dealType ? 'NewDealForm--errorInput' : 'NewDealForm--input'}
          value={newDeal.dealType}
          placeholder='Consumer Auto'
          onChange={handleUpdateProperty("dealType")}
          required
        />
        <span className="NewDealForm--error">{errors.dealType}</span>
      </div>
      <div className='NewDealForm--div'>
        <label className={errors.dealSize ? 'NewDealForm--error' : 'NewDealForm--label'}>Deal Size</label>
        <input
          className={errors.dealSize ? 'NewDealForm--errorInput' : 'NewDealForm--input'}
          value={newDeal.dealSize}
          placeholder='$1,000,000'
          onChange={handleUpdateProperty("dealSize")}
          required
        />
        <span className="NewDealForm--error">{errors.dealSize}</span>
      </div>
      <button className='NewDealForm--button' onClick={handleCreateDeal}>
        Create Deal
      </button>
    </form>
  );
};

export default DealForm;
