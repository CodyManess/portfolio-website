
export default interface Project {
    title: string,
    description: string,
    image: string,
    achievements: string[],
    tools: Tool[]
}

export interface Tool {
    title: string,
    icon: string
}