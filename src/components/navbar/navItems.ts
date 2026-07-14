import { IconType } from "react-icons";
import { FaHome, FaUserMd, FaCalendarAlt, FaInfoCircle, FaHospital } from "react-icons/fa";

export interface NavItem {
  title: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: FaUserMd,
  },
  {
    title: "Departments",
    href: "/departments",
    icon: FaHospital,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: FaCalendarAlt,
  },
  {
    title: "Apply as Doctor",
    href: "/apply/doctors",
    icon: FaUserMd,
  },
  {
    title: "About",
    href: "/about",
    icon: FaInfoCircle,
  },
];