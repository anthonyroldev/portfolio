export default interface Project {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl?: string
    githubUrl: string
}