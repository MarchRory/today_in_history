export interface listItem {
    index: number
    title: string
    desc: string
    url: string
    mobilUrl: string
}

export interface ResultModel {
    data: listItem[]
    subtitle: string
    success: boolean
    title: string
    update_time: string
}