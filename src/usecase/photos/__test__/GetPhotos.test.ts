import {useGetPhotos} from "../GetPhotos"
import httpClientMock from "../../../service/photos/Utils"
import {HTTP_PHOTOS_PATH} from "../../../commons/HttpPaths"
import {isRight} from "../../../commons/Either"
import {renderHook} from '@testing-library/react-hooks'

describe('Get photos', () => {
    it('Success', async () => {
        // Given
        httpClientMock.onGet(HTTP_PHOTOS_PATH).reply(200, [{
            albumId: 1,
            id: 1,
            title: "Title",
            url: "URL",
            thumbnailUrl: "URL"
        }])

        // When
        const {result, waitForNextUpdate} = renderHook(() => useGetPhotos())

        await waitForNextUpdate()

        // Then
        expect(isRight(result.current)).toBeTruthy()
    })

    it('Error - Because server returned error', async () => {
        // Given
        httpClientMock.onGet(HTTP_PHOTOS_PATH).reply(500, {message: 'error'})

        // When
        const {result, waitForNextUpdate} = renderHook(() => useGetPhotos())

        await waitForNextUpdate()

        // Then
        expect(isRight(result.current)).toBeFalsy()
    })
})