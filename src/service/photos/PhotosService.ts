import {Either} from "../../commons/Either"
import {AxiosError} from "axios"
import {httpClient} from "../../commons/HttpClient"
import {HTTP_PHOTOS_PATH} from "../../commons/HttpPaths"

export interface IPhotoResponse {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export const getPhotos = async (): Promise<Either<AxiosError, IPhotoResponse[]>> => {
    try {
        const result = await httpClient.get<IPhotoResponse[]>(HTTP_PHOTOS_PATH)
        return {r: result.data}
    } catch (e) {
        return {l: e}
    }
}
