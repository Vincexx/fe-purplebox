import { FaUser, FaImage, FaSlack, FaVenusMars, FaDollarSign, FaPenFancy } from "react-icons/fa";

export const orderFields = [
  {
    ph: "Customer Name",
    icon: <FaUser />,
    field: "custName",
  },
  {
    ph: "Product Image",
    icon: <FaImage />,
    field: "prodImage",
  },
  {
    ph: "Product Name",
    icon: <FaSlack />,
    field: "prodName",
  },
  {
    ph: "Quantity",
    icon: <FaVenusMars />,
    field: "qty",
  },
  {
    ph: "Total Price",
    icon: <FaDollarSign />,
    field: "totalPrice",
  },
  {
    ph: "Status",
    icon: <FaPenFancy />,
    field: "status",
    dropdown: true
  },
];
