import {Either, isRight} from "../../commons/Either"
import {AxiosError} from "axios"
import {useEffect, useState} from "react"
import {getPosts, IPostFilter} from "../../service/posts/PostsService"

export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

export const useGetPosts = (postFilter: IPostFilter): Either<AxiosError, IPost[]> => {
    const [state, updateState] = useState<Either<AxiosError, IPost[]>>({r: []})

    useEffect(() => {
        getPosts(postFilter).then(result => {
            if (isRight(result)) {
                const posts = result.r.map(value => ({...value}))
                updateState({r: posts})
            } else {
                updateState({l: result.l})
            }
        })
    }, [postFilter])

    return state
}