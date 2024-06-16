export interface Params {
    start_time: string,
    end_time: string,
    group: Array<DataGroup>
} 

export interface DataGroup {
    news_theme: Array<string>,
    title_length: Array<number>,
    news_length: Array<number>,
    user_id: Array<string>,
    news_id: Array<string>,
}