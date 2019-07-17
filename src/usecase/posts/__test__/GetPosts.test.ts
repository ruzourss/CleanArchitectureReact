import httpClientMock from "../../../service/photos/Utils"
import {HTTP_POSTS_PATH} from "../../../commons/HttpPaths"
import {renderHook} from "@testing-library/react-hooks"
import {IPostFilter, IPostResponse} from "../../../service/posts/PostsService"
import {isLeft, isRight} from "../../../commons/Either"
import {useGetPosts} from "../GetPosts"

describe('Get posts', () => {

    it('Success - filtered posts', async () => {
        // Given
        const post: IPostResponse = {
            userId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            body: 'quia et suscipit nsuscipit recusandae consequuntur expedita et cum nreprehenderit molestiae ut ut quas totam nnostrum rerum est autem sunt rem eveniet architecto'
        }
        httpClientMock.onGet(HTTP_POSTS_PATH).reply(200, [post])
        const postFilter: IPostFilter = {id: ['1', '2']}

        // When
        const {result, waitForNextUpdate} = renderHook(() => useGetPosts(postFilter))

        await waitForNextUpdate()

        // Then
        expect(isRight(result.current)).toBeTruthy()
    })

    it('Failure - Server', async () => {
        // Given
        httpClientMock.onGet(HTTP_POSTS_PATH).reply(500, {message: "Server error"})
        const postFilter: IPostFilter = {id: ['1', '2']}

        // When
        const {result, waitForNextUpdate} = renderHook(() => useGetPosts(postFilter))

        await waitForNextUpdate()

        // Then
        expect(isLeft(result.current)).toBeTruthy()
    })
})