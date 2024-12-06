interface Image {
    src: string,
    height: number,
    width: number
}

export default interface Role {
    date: string,
    title: string,
    companyName: string,
    companyLogo: Image,
    description: string
}