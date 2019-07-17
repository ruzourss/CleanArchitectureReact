import React, {ChangeEvent, FormEvent, useState} from 'react'

export const Form: React.FC = () => {

    const [yearState, updateYearState] = useState(0)

    const onSubmitForm = (event: FormEvent<Element>) => {
        console.log(event.currentTarget)
        event.preventDefault()
    }

    const updateState = (event: ChangeEvent<HTMLInputElement>) => {
        updateYearState(Number(event.target.value))
    }

    return <React.Fragment>
        <form onSubmit={onSubmitForm}>
            <input type="text" placeholder="Nombre de usuario" required autoFocus/>
            <input type="password" placeholder="Contraseña" required/>
            <input type="checkbox" disabled={yearState < 18} checked={!(yearState < 18)} required/><span>Accepto!</span>
            <input type="number" placeholder="Edad" value={yearState} onChange={updateState} required/>
            <button disabled={yearState < 18}>Enviar</button>
        </form>
    </React.Fragment>

}