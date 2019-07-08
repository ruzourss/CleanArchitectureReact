import {IPhoto, useGetPhotos} from "../../usecase/photos/GetPhotos"
import * as React from "react"
import {Either, isRight} from "../../commons/Either"
import {AxiosError} from "axios"
import './Photos.css'

export const Photos: React.FC = () => {

    const resultPhotos: Either<AxiosError, IPhoto[]> = useGetPhotos()

    return isRight(resultPhotos) ? (
        <div className="photos-container">
            {
                resultPhotos.r
                    .slice(0, 10)
                    .map((value,index) => {
                    return <div className="content-photo" key={index}>
                        <h3>{value.title}</h3>
                        <img src={value.url} alt={value.title}/>
                    </div>
                })
            }
        </div>
    ) : <div>Loading...</div>
}