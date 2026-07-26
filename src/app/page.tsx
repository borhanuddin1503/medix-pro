
import Hero from "@/components/home/Hero";
import { getUser } from "./utils/getUser";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import { IService } from "@/types/doctor-types/doctorTypes";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default async function Home() {

  const user = await getUser();
  console.log('user', user)

  // hospital services
 const hospitalServices: IService[] = [
    {
        id: "1",
        title: "Advanced Diagnostic Testing",
        description:
            "Get accurate and reliable test results with advanced diagnostic technology and modern laboratory facilities.",
        image: "https://picsum.photos/seed/diagnostic-testing/800/600",
        category: "Diagnostic Center",
    },
    {
        id: "2",
        title: "Modern Hospital Facilities",
        description:
            "Experience quality healthcare in a comfortable and well-equipped environment designed around patient care.",
        image: "https://picsum.photos/seed/hospital-facilities/800/600",
        category: "Hospital Facilities",
    },
    {
        id: "3",
        title: "Advanced Medical Laboratory",
        description:
            "Our modern laboratory provides fast, accurate, and dependable testing services for better healthcare decisions.",
        image: "https://picsum.photos/seed/medical-laboratory/800/600",
        category: "Medical Laboratory",
    },
    {
        id: "4",
        title: "Specialized Medical Care",
        description:
            "Access specialized healthcare services supported by experienced professionals and modern medical equipment.",
        image: "https://picsum.photos/seed/specialized-care/800/600",
        category: "Specialized Care",
    },
    {
        id: "5",
        title: "Patient-Centered Healthcare",
        description:
            "We focus on providing a comfortable, caring, and personalized healthcare experience for every patient.",
        image: "https://picsum.photos/seed/patient-care/800/600",
        category: "Patient Care",
    },
    {
        id: "6",
        title: "Modern Medical Technology",
        description:
            "Advanced technology and reliable medical equipment help us deliver efficient and high-quality healthcare services.",
        image: "https://picsum.photos/seed/medical-technology/800/600",
        category: "Medical Technology",
    },
    {
        id: "7",
        title: "Emergency Medical Support",
        description:
            "Receive timely medical attention and professional support when you need urgent healthcare assistance.",
        image: "https://picsum.photos/seed/emergency-care/800/600",
        category: "Emergency Care",
    },
    {
        id: "8",
        title: "Pharmacy Services",
        description:
            "Access trusted medication and pharmacy support to make your healthcare journey more convenient.",
        image: "https://picsum.photos/seed/pharmacy/800/600",
        category: "Pharmacy",
    },
    {
        id: "9",
        title: "Preventive Health Checkups",
        description:
            "Stay ahead of potential health concerns with regular checkups and comprehensive preventive care.",
        image: "https://picsum.photos/seed/health-checkup/800/600",
        category: "Health Checkup",
    },
    {
        id: "10",
        title: "Digital Healthcare Experience",
        description:
            "Manage your healthcare more easily with convenient digital services designed for modern patients.",
        image: "https://picsum.photos/seed/digital-healthcare/800/600",
        category: "Digital Healthcare",
    },
];
  // const authResult = await response.json();
  // console.log('authResult ', authResult)

  return (
    <div>
      <Hero></Hero>
      <ServicesMarquee></ServicesMarquee>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}