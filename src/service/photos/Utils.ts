import MockAdapter from 'axios-mock-adapter'
import {httpClient} from "../../commons/HttpClient"

// This sets the mock adapter on the default instance
const httpClientMock = new MockAdapter(httpClient)

export default httpClientMock