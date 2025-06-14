export interface Notice {
    id: string,
    title: string,
    content: string,
    type: "news" | "announcement" | "notice"
}

export const convertToNotice = (data: any) : Notice => {
    return(
        {
            id: data.id??'',
            title: data.title??'' ,
            content: data.content??'' ,
            type: data.type??'' ,
        }
    )
}