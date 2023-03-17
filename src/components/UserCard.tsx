import { useState } from "react";

import {
  useDeleteUserMutation,
  usePostUserOverMutation,
} from "../rtkQueryCalls/apiSlice";

import { DataType } from "../interfaces/index";

interface UserCardInterface {
  data: DataType;
  listId: number;
}

const UserCard = ({ data, listId }: UserCardInterface) => {
  const [deleteUser] = useDeleteUserMutation();
  const [postUser] = usePostUserOverMutation();
  
  const [isDropping, setIsDropping] = useState(false);

  // drog start of a card
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData("data", JSON.stringify(data));
    deleteUser({ id: listId, details: data });
  };

  // the dragged card dropped over a card
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDropping(false);
    const dataTransferObject = JSON.parse(e.dataTransfer.getData("data"));
    postUser({ id: listId, overId: data.id, details: dataTransferObject });
  };

  // dragged card hover over other card
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDropping(true);
  };

  return (
    <div
      className="row container border"
      draggable
      onDragLeaveCapture={() => setIsDropping(false)}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        marginTop: isDropping ? "25px" : "0px",
        transition: "margin-top 1s",
      }}
    >
      <img
        draggable={false}
        className="col"
        src={data.avatar}
        alt="user avatar"
      />
      <div className="col">
        <h4 className="text-sm-center">
          {data.first_name} {data.last_name}
        </h4>
        <p className="text-sm-center overflow-auto">{data.email}</p>
        <p className="text-sm-center"> birth_date : {data.birth_date}</p>
      </div>
    </div>
  );
};

export default UserCard;
