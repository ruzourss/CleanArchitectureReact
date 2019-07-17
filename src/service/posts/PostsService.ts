import {Either} from "../../commons/Either"
import {AxiosError} from "axios"
import {httpClient} from "../../commons/HttpClient"
import {HTTP_POSTS_PATH} from "../../commons/HttpPaths"

export interface IPostResponse {
    userId: number,
    id: number,
    title: string,
    body: string
}

export type IPostFilter = Record<string, string []>

export const getPosts = async (postFilter: IPostFilter): Promise<Either<AxiosError, IPostResponse []>> => {
    try {
        const result = await httpClient.get<IPostResponse[]>(HTTP_POSTS_PATH, {params: postFilter})
        return {r: result.data}
    } catch (e) {
        return {l: e}
    }
}
