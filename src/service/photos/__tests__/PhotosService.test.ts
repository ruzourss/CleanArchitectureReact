import httpClientMock from "../Utils"
import {isLeft, isRight} from "../../../commons/Either"
import {getPhotos, IPhotoResponse} from "../PhotosService"

describe('Photo Service', () => {

    it('should be get photos', async () => {
        // Given
        const photo: IPhotoResponse = {
            albumId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            url: "https://via.placeholder.com/600/92c952",
            thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }

        httpClientMock.onGet('https://jsonplaceholder.typicode.com/photos').reply(200, [photo])

        // When
        const result = await getPhotos()

        // Then
        expect(isRight(result)).toBeTruthy()
        expect(result).toMatchObject({r: [photo]})
    })

    it('should be trow exception becuase server do not response', async () => {
        // Then
        httpClientMock.onGet('https://jsonplaceholder.typicode.com/photos').reply(500, {message: 'Request failed with status code 500'})

        // Given
        const result = await getPhotos()

        // When
        expect(isLeft(result)).toBeTruthy()
        expect(result).toMatchObject({l: {message: 'Request failed with status code 500'}})
    })

})