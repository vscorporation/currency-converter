import React from 'react';
import {Button, Result} from "antd";
import st from './ResultError.module.css'

const ResultError = () => {

    return (
        <div className={st.resultBlock}>
        <Result
            status="500"
            title="Error with API"
            subTitle="Sorry, something went wrong."
            extra={<Button type="primary" onClick={() => document.location.reload()}>Reload Website</Button>}
        />
        </div>
    )
}

export default ResultError