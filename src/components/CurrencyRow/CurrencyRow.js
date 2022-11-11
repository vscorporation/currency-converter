import React from 'react'
import {Col, InputNumber, Row, Select} from "antd";
import st from "./CurrencyRow.module.css"



export default function CurrencyRow({options,
                                     inputValue,
                                     selectedValue,
                                     onChangeSelectHandler,
                                     onChangeInputHandler,
                                     ...props
                                    }) {


    return (
        <Row justify={"center"} gutter={[32,32]} className={st.currencyBlock} >
            <Col span={12} className={st.currencyItem}>
                <InputNumber className={st.input} min={1} value={inputValue} onChange={onChangeInputHandler}/>
            </Col>
            <Col span={12} className={st.currencyItem}>
                <Select
                    size={"large"}
                    showSearch
                    value={selectedValue}
                    placeholder="Select currency"
                    optionFilterProp="children"
                    onChange={onChangeSelectHandler}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={Object.keys(options).map(opt => ({label: opt, value: opt}))}
                />
            </Col>
        </Row>
    )
}

