import React from "react";

type Member = {
  nameTH: string;
  nameEN: string;
  heightCm: number;
  age: number;
  imageUrl?: string;
  group?: string;
};

type MemberListProps = {
  members: Member[];
  groupName: string;
};

const MemberList: React.FC<MemberListProps> = ({ members, groupName }) => {
  // filter เฉพาะสมาชิกที่อยู่ใน group ที่ส่งมา
  const filteredMembers = members.filter(
    (member) => member.group?.toLowerCase() === groupName.toLowerCase()
  );

  return (
    <ul>
      {filteredMembers.map((member, index) => (
        <li
          key={index}
          className={groupName === "BUS" ? "green-txt" : "blue-txt"}
        >
          {member.nameTH} ({member.nameEN})
          <br />
          <img
            src={member.imageUrl}
            alt={member.nameEN}
            style={{ maxHeight: "100px", width: "auto" }}
          />
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
