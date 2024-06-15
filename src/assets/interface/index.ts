export interface Params {
    start_time: string,
    end_time: string,
    group: Array<DataGroup>
} 

export interface DataGroup {
    news_id: unknown[];
    news_theme: Array<string>,
    title_length: Array<number>,
    news_length: Array<number>,
    user_id: Array<string>,
    new_id: Array<string>,
}