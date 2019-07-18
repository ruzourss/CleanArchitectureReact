import httpClientMock from "../../photos/Utils"
import {isLeft, isRight} from "../../../commons/Either"
import {getPosts, IPostFilter, IPostResponse} from "../PostsService"

describe('Get posts', () => {

    afterEach(() => {
        httpClientMock.reset()
    })

    it('Success', async () => {
        // Given
        const post: IPostResponse = {
            userId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            body: 'quia et suscipit nsuscipit recusandae consequuntur expedita et cum nreprehenderit molestiae ut ut quas totam nnostrum rerum est autem sunt rem eveniet architecto'
        }
        httpClientMock.onGet('/posts').reply(200, [post])
        const postFilter: IPostFilter = {id: ['1', '2']}

        // When
        const result = await getPosts(postFilter)

        // Then
        expect(isRight(result)).toBeTruthy()
        expect(result).toMatchObject({r: [post]})
    })

    it('Success - Filtered', async () => {
        // Given
        const postFilteredId1: IPostResponse = {
            userId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            body: 'quia et suscipit nsuscipit recusandae consequuntur expedita et cum nreprehenderit molestiae ut ut quas totam nnostrum rerum est autem sunt rem eveniet architecto'
        }

        const postFilteredId2: IPostResponse = {...postFilteredId1, id: 2}

        const postFilter: IPostFilter = {id: ['1', '2']}

        httpClientMock.onGet('/posts').reply(200, [postFilteredId1, postFilteredId2])

        // When
        const result = await getPosts(postFilter)

        // Then
        expect(isRight(result)).toBeTruthy()
        expect(result).toMatchObject({r: [postFilteredId1, postFilteredId2]})
    })

    it('Error - Server returned error', async () => {
        // Given
        const postFilter: IPostFilter = {id: ['2']}
        // console.log(httpClientMock.history)
        httpClientMock.onGet('/posts', {
            params: postFilter
        }).reply(500, {message: 'Request failed with status code 500'})

        // When
        const result = await getPosts(postFilter)

        // Then
        expect(isLeft(result)).toBeTruthy()
        expect(result).toMatchObject({l: {message: 'Request failed with status code 500'}})
    })
})