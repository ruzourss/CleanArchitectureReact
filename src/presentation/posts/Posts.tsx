import React, {ChangeEvent, useState} from 'react'
import {Either, isRight} from "../../commons/Either"
import {AxiosError} from "axios"
import {IPost, useGetPosts} from "../../usecase/posts/GetPosts"
import {IPostFilter} from "../../service/posts/PostsService"
import "./Posts.css"

export const Posts: React.FC = () => {

    const [stateFilter, updateStateFilter] = useState<IPostFilter>({id: []})
    const resultPosts: Either<AxiosError, IPost[]> = useGetPosts(stateFilter)

    const setStateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === null || event.target.value.length === 0 || event.target.value === '0') {
            updateStateFilter({id: []})
        } else {
            updateStateFilter({"id": [event.target.value]})
        }
    }

    return <div>
        <input type="number" placeholder="Post id" onChange={setStateFilter}/>
        {isRight(resultPosts) ?
            resultPosts.r.map((post, index) => {
                return <div className="post-container" key={index}>
                    <h2>Title: {post.title}</h2>
                    <p>User: {post.userId}</p>
                    <p>Body: {post.body}</p>
                </div>
            }) : null}
    </div>
}