import React from 'react'
import {RouteComponentProps, Switch} from "react-router"
import {Photos} from "../presentation/gallery/Photos"
import {Posts} from "../presentation/posts/Posts"

export type MyRouteComponentProps = RouteComponentProps<any> & {
    routes: Rout[]
}

interface Rout {
    path?: string[] | string
    component: React.ComponentType<MyRouteComponentProps> | React.ComponentType<any>
    routes: Rout[]
    exact?: boolean
    strict?: boolean
}


export const Routes: Rout [] = [
    {
        path: ['/photos'],
        component: Photos,
        routes: [],
    },
    {
        path: ['/posts'],
        component: Posts,
        routes: [],
    }
]


export const RoutesConfig: React.FC = () => {
    return (
        <Switch>
            
        </Switch>
    )
}