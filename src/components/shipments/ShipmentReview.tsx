import React, { useContext } from 'react';

import NavigationFragment from 'components/questionary/NavigationFragment';
import {
  createMissingContextErrorMessage,
  QuestionaryContext,
} from 'components/questionary/QuestionaryContext';
import QuestionaryDetails from 'components/questionary/QuestionaryDetails';

import { ShipmentContextType } from './ShipmentContainer';

interface ShipmentReviewProps {
  isReadonly: boolean;
}
function ShipmentReview({ isReadonly }: ShipmentReviewProps) {
  const { state, dispatch } = useContext(
    QuestionaryContext
  ) as ShipmentContextType;
  if (!state || !dispatch) {
    throw new Error(createMissingContextErrorMessage());
  }

  return (
    <div>
      <QuestionaryDetails questionaryId={state.shipment.questionaryId} />
      <div>
        <NavigationFragment
          disabled={isReadonly}
          back={undefined}
          saveAndNext={{
            callback: () => console.log('Submit shipment'), // TODO implement submitting the shipment
            label: 'Finish',
          }}
          isLoading={false}
        />
      </div>
    </div>
  );
}

export default ShipmentReview;
