import {Col, Layout, Row, Statistic} from 'antd';
import React from 'react';
import st from "./Header.module.css"




const HeaderApp = ({currency, ...props}) => {

    const EURtoUAH = currency['UAH']
    const USDtoUAH = currency['UAH'] / currency['USD']

    return (
        <Layout.Header>
            <Row span={24} justify={"end"} className={st.statistic}>

                <Col span={3} lg={2} xl={2}>
                    <Statistic
                        title="EUR to UAH"
                        value={EURtoUAH}
                        precision={2}
                    />
                </Col>
                <Col span={3} lg={2} xl={2}>
                    <Statistic
                        title="USD to UAH"
                        value={USDtoUAH}
                        precision={2}
                    />
                </Col>
        </Row>
        </Layout.Header>

    )
};
export default HeaderApp;