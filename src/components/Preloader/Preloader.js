import {Spin} from 'antd';
import React from 'react';
import st from "./Preloader.module.css"

const Preloader = () => {

    return (
        <div className={st.preloader}>
            <Spin size="large"/>
        </div>
    )
}

export default Preloader