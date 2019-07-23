import { AxiosError } from 'axios';
import { Either } from '../../commons/Either';
import { httpClient } from '../../commons/HttpClient';
import { HTTP_LOGIN_PATH } from '../../commons/HttpPaths';

export const loginServiceReal = async (username: String, password: String): Promise<Either<AxiosError, boolean>> => {
  try {
    const result = await httpClient.post<boolean>(HTTP_LOGIN_PATH, {username: username, password: password});
    return { r: true };
  } catch (e) {
    return { l: e };
  }
};

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const loginService = async (username: String, password: String): Promise<Either<AxiosError, boolean>> => {
  try {
    await timeout(1000)
    console.log('hola')
    return { r: true };
  } catch (e) {
    return { l: e };
  }
};
