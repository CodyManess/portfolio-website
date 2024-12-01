import { StaticImageData } from "next/image";

export default interface Role {
    date: string,
    title: string,
    companyName: string,
    companyLogo: StaticImageData,
    description: string
}