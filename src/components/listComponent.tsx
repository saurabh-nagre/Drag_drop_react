import { useState } from "react";

import UserCard from "./UserCard";

import {
  useDeleteListMutation,
  useGetUsersListQuery,
  usePushUserMutation,
} from "../rtkQueryCalls/apiSlice";

import { DataType } from "../interfaces";

import * as constants from "../constants/constants";

interface ListComponentInterface {
  ListId: number;
}

const ListComponent = ({ ListId }: ListComponentInterface) => {
  const { data } = useGetUsersListQuery(ListId);

  const [pushUser] = usePushUserMutation();
  const [deleteList] = useDeleteListMutation();
  
  const [listSelected, setListSelected] = useState();

  const handleDrop = (e: any) => {
    e.preventDefault();
    const dataTransferObject = JSON.parse(e.dataTransfer.getData("data"));
    pushUser({ id: ListId, details: [dataTransferObject] });
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setListSelected(e.target.value);
  };

  const handleCopy = () => {
    if (listSelected !== constants.No_SELECT) {
      pushUser({ id: listSelected, details: data });

      deleteList(ListId);
    }
  };

  return (
    <div className="col border">
      <div className="row align-items-center">
        <h2 className="text-center">User List {ListId + 1}</h2>

        <h4 className="col fs-5 text-center">Copy list to </h4>
        <select className="col" value={listSelected} onChange={handleChange}>
          <option value={constants.No_SELECT}>{constants.No_SELECT}</option>
          {Array(4)
            .fill(0)
            .map((value, index) =>
              index !== ListId ? (
                <option value={index}>List {index + 1}</option>
              ) : (
                <></>
              )
            )}
        </select>

        <button
          title="Copy"
          className="btn col btn-primary m-2"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      
      {data && data.length > 0 ? (
        data.map((value: DataType, index: number) => (
          <UserCard data={value} key={index} listId={ListId} />
        ))
      ) : (
        <div
          className="text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            draggable={false}
            src={constants.PROFILEADD}
            className="img-thumbnail"
            alt="Drop User"
          />
        </div>
      )}

      <div
        style={{ height: "100%" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      ></div>
    </div>
  );
};
export default ListComponent;
