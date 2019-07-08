import httpClientMock from "../Utils"
import {isLeft, isRight} from "../../../commons/Either"
import {getPhotos, IPhoto} from "../PhotosService"

describe('Service test', () => {

    it('should be get photos', async () => {

        const photo: IPhoto = {
            albumId: 1,
            id: 1,
            title: "accusamus beatae ad facilis cum similique qui sunt",
            url: "https://via.placeholder.com/600/92c952",
            thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }

        httpClientMock.onGet('https://jsonplaceholder.typicode.com/photos').reply(200, [photo])

        const result = await getPhotos()

        expect(isRight(result)).toBeTruthy()
        expect(result).toMatchObject({r: [photo]})
    })

    it('should be trow exception becuase server do not response', async () => {

        httpClientMock.onGet('https://jsonplaceholder.typicode.com/photos').reply(500)

        const result = await getPhotos()

        expect(isLeft(result)).toBeTruthy()
        expect(result).toMatchObject('')
    })

})