import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { categoriesType } from "../components/models/categoriesType";

export const categories = [
  {
    id: categoriesType.FOODANDDDRINK,
    icon: <LocalDiningIcon />,
    label: "Food and Drink",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
  },
  {
    id: categoriesType.HOBBIES,
    icon: <SportsSoccerIcon />,
    label: "Hobbies",
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
  },
  {
    id: categoriesType.CLOTHES,
    icon: <CheckroomIcon />,
    label: "Clothes",
    backgroundColor: "rgba(255, 206, 86, 0.2)",
    borderColor: "rgba(255, 206, 86, 1)",
  },
  {
    id: categoriesType.MARKET,
    icon: <StorefrontIcon />,
    label: "Market",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  {
    id: categoriesType.ONLINE,
    icon: <CreditCardIcon />,
    label: "Online",
    backgroundColor: "rgba(153, 102, 255, 0.2)",
    borderColor: "rgba(153, 102, 255, 1)",
  },
  {
    id: categoriesType.OTHER,
    icon: <AttachMoneyIcon />,
    label: "Other",
    backgroundColor: "rgba(255, 159, 64, 0.2)",
    borderColor: "rgba(255, 159, 64, 1)",
  },
];
