import React from 'react';

import withConfirm, { WithConfirmType } from 'utils/withConfirm';

const VisitsRegistrationTable = (props: { confirm: WithConfirmType }) => {
  // const { loadingVisits, visits, setVisits } = useMyVisits();
  // const [
  //   urlQueryParams,
  //   setUrlQueryParams,
  // ] = useQueryParams<UrlQueryParamsType>(DefaultQueryParams);
  // const { api } = useDataApiWithFeedback();

  // if (!visits) {
  //   return <UOLoader />;
  // }

  // const columns = [
  //   { title: 'Proposal', field: 'proposal.title' },
  //   { title: 'Instrument', field: 'proposal.instrument.name' },
  //   { title: 'Visit status', field: 'status' },
  // ];

  // const deleteHandler = (visitToDelete: RegistrationBasic) => {
  //   props.confirm(
  //     () => {
  //       api('Visit deleted')
  //         .deleteVisit({
  //           visitId: visitToDelete.visitId,
  //         })
  //         .then((data) => {
  //           if (!data.deleteVisit.rejection) {
  //             setVisits(
  //               visits.filter((visit) => visit.visitId !== visitToDelete.visitId)
  //             );
  //           }
  //         });
  //     },
  //     {
  //       title: 'Are you sure?',
  //       description: `Are you sure you want to delete the visit?`,
  //     }
  //   )();
  // };

  // const createModal = (
  //   onUpdate: (
  //     object: RegistrationBasic,
  //     shouldCloseAfterUpdate: boolean
  //   ) => void,
  //   onCreate: (
  //     object: RegistrationBasic,
  //     shouldCloseAfterCreation: boolean
  //   ) => void,
  //   editVisit: RegistrationBasic
  // ) => (
  //   <CreateUpdateVisitRegistration
  //     registration={editVisit}
  //     onCreate={(visit) => onCreate({ ...visit }, false)} // clone the object because it is immutable because of immer
  //     onUpdate={(visit) => onUpdate({ ...visit }, false)} // clone the object because it is immutable because of immer
  //   />
  // );

  return (
    <div data-cy="visits-table">
      {/* <SuperMaterialTable
        setData={setVisits}
        createModal={createModal}
        hasAccess={{ update: true, create: true, remove: true }}
        icons={tableIcons}
        localization={tableLocalization}
        title="Visits"
        columns={columns}
        isLoading={loadingVisits}
        data={visits}
        urlQueryParams={urlQueryParams}
        setUrlQueryParams={setUrlQueryParams}
        actions={[
          (rowData) => {
            const readOnly = rowData.status === VisitStatus.ACCEPTED;

            return {
              icon: Delete,
              tooltip: 'Delete visit',
              onClick: (_event, rowData) =>
                deleteHandler(rowData as RegistrationBasic),
              disabled: readOnly,
            };
          },
        ]}
      /> */}
    </div>
  );
};

export default withConfirm(VisitsRegistrationTable);
