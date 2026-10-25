'use client'

import React, { useContext } from 'react'
import Table, { Irow, TableActionType } from '@components/table'
import { BsEye } from 'react-icons/bs';
import { BiAddToQueue, BiEdit, BiTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { ConfirmContext, ConfirmContextType } from '@components/confirm/context';
import { MessageContext, MessagesContextType } from '@components/toast/context';
import FetchAdventistBeliefs, { DeleteBeliefs } from '@data/adventist_beliefs';
import { BeliefsType } from 'types/detailsType';

const Page = () => {
  const router = useRouter();
  const dialog = useContext(ConfirmContext) as ConfirmContextType;
  const Messages = useContext(MessageContext) as MessagesContextType;
  const [beliefs, setBeliefs] = React.useState<BeliefsType[] | null>(null);

  React.useEffect(() => {
    const fetchBeliefs = async () => {
      const data = await FetchAdventistBeliefs();
      setBeliefs(data || null);
    };
    fetchBeliefs();
  }, []);

  const DeleteMutation = async (data: BeliefsType) => {
    try {
      const status = await DeleteBeliefs(data);
      if (status.success) {
        Messages.setSuccess(`Successfully deleted belief ${data.name}`);
        router.back();
      } else {
        Messages.setErrors(`Failed to delete belief ${data.name}`);
      }
    } catch (e: any) {
      console.log(e);
      if (e['networkError']) {
        Messages.setErrors([e['networkError']]);
      }
      if (e['message']) {
        Messages.setErrors([e['message'].split('\n')[0]]);
      }
    }
  };

  const DeleteRecord = (slug: string) => {
    const data = beliefs?.filter((belief) => belief.slug === slug)[0];
    data &&
      dialog.setConfirmMessage(
        `Do you wish to delete belief ${data.name}`,
        '',
        () => DeleteMutation(data)
      );
  };

  const Actions = [
    {
      type: TableActionType.Link,
      title: 'View',
      icon: <BsEye size={20} />,
      basePath: '/account/beliefs/',
      className: 'text-yellow-400 focus:ring-2 focus:ring-yellow-400',
      visible: true,
    },
    {
      type: TableActionType.Link,
      title: 'Edit',
      icon: <BiEdit size={20} />,
      basePath: '/account/beliefs/',
      className: 'text-blue-400 focus:ring-2 focus:ring-blue-400',
      pathSuffix: '/edit',
      visible: false,
    },
    {
      type: TableActionType.Action,
      title: 'Delete',
      icon: <BiTrash size={20} />,
      basePath: '/account/beliefs/',
      className: 'text-red-400 focus:ring-2 focus:ring-red-400',
      visible: false,
      action: (slug: string) => DeleteRecord(slug),
    },
  ];

  return (
    <Table
      columns={column()}
      rows={beliefs || []}
      table_header={`All Beliefs`}
      export_csv_file={`All Beliefs`}
      use_row_actions
      row_actions={Actions}
      other_links={[
        { link: `/account/beliefs/new`, name: 'New', title: 'New', icon: <BiAddToQueue /> },
      ]}
    />
  );
};
function column() {
  return [
    {
      use_in_display: true,
      field: "sequenceNo",
      use: "Sequence No.",
      user_primary: true,
      use_in_sorting: true
    }, 
    {
      use_in_display: true,
      field: "slug",
      use: "Slug",
      primary: true,
      use_in_sorting: true
    },
    {
       use_in_display: true,
      field: "name", //Object destructure
      use: "Name",
      use_in_search: true,
      use_in_sorting: true
    },
    {
      field: "categoryName",
      use: "Category",
      use_in_search:true,
      use_in_sorting: true
    },
    {
      use_in_display: false,
      field:'canModify',
      use_in_visibility: true
    }
  ]
}

export default Page
