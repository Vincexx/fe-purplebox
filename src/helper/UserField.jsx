import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaAddressBook,
  FaAdjust,
  FaPhone,
} from "react-icons/fa";

export const userFields = [
  {
    ph: "FirstName",
    icon: <FaUser />,
    field: "first_name",
  },
  {
    ph: "MiddleName",
    icon: <FaUser />,
    field: "middle_name",
  },
  {
    ph: "LastName",
    icon: <FaUser />,
    field: "last_name",
  },
  {
    ph: "Address",
    icon: <FaAddressBook />,
    field: "address",
  },
  {
    ph: "Role",
    icon: <FaAdjust />,
    field: "role",
    dropdown: ["Admin", "User"],
  },
  {
    ph: "Contact Number",
    icon: <FaPhone />,
    field: "contact_num",
    type: "number",
  },
  {
    ph: "Email",
    icon: <FaEnvelope />,
    field: "email",
  },
  {
    ph: "Password",
    icon: <FaLock />,
    field: "password",
    type: "password",
  },
];
