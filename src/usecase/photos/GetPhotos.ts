import {getPhotos} from "../../service/photos/PhotosService"
import {Either, isRight} from "../../commons/Either"
import {AxiosError} from "axios"
import {useEffect, useState} from "react"

export interface IPhoto {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export const useGetPhotos = (): Either<AxiosError, IPhoto[]> => {

    const [state, updateState] = useState<Either<AxiosError, IPhoto[]>>({r: []})

    useEffect(() => {
        getPhotos().then(result => {
            if (isRight(result)) {
                const photos = result.r.map(value => ({...value}))
                updateState({r: photos})
            } else {
                updateState({l: result.l})
            }
        })
    }, [])

    return state
}