export enum IconType {
  Badge,
  Logo,
}

export default interface Cert {
  icon: string
  iconType: IconType
  name: string
  org: string
}
