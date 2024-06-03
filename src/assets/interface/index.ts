export interface Params {
    start_time: string,
    end_time: string,
    group: Group
} 
export interface Group {
    news_theme: Array<string>,
    title_length: Array<number>,
    news_length: Array<number>,
    user_id: Array<string>,
}