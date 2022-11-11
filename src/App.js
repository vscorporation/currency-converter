import React, {useCallback, useEffect, useState} from 'react';
import st from './App.module.css';
import {apikey, baseUrl} from "./config";
import CurrencyRow from "./components/CurrencyRow/CurrencyRow";
import {useHttp} from "./hooks/http.hook";
import {Col, Layout, notification, Row} from "antd";
import Preloader from "./components/Preloader/Preloader";
import HeaderApp from "./components/Header/Header";
import ResultError from "./components/ResultError/ResultError";

const {Content} = Layout;

function App() {


    const {loading, error, request, clearError} = useHttp()                       //custom hook for request with handler errors & loading
    const [currencyData, setCurrencyData] = useState([])                 //object with all currency
    const [selectedOptionsFrom, setSelectedOptionsFrom] = useState([])   //first Select
    const [selectedOptionsTo, setSelectedOptionsTo] = useState([])       //second Select
    const [fromCurrency, setFromCurrency] = useState(1)                 //first input
    const [toCurrency, setToCurrency] = useState(0)                     //second input

// request => all currency data. set first default values
    const fetchData = useCallback(async () => {
        try {
            const data = await request(baseUrl, "GET", null, {apikey: apikey})
            setCurrencyData(data.rates)
            setSelectedOptionsFrom('USD')
            setSelectedOptionsTo('UAH')
            setToCurrency(convertsFormula(1, data.rates['UAH'], data.rates['USD']))
            clearError()
        } catch (e) {
            notification['error']({
                message: e.message
            });
        }
    }, [request, clearError])

// formula for convert currency
    const convertsFormula = (num, currencyTo, currencyFrom) => {
        return ((num * currencyTo) / currencyFrom).toFixed(2)
    }

// first input handler. it is return user`s target value for first input & converts currency for second input
    const onChangeFromCurrency = (e) => {
        setFromCurrency(e)
        setToCurrency(convertsFormula(e, currencyData[selectedOptionsTo], currencyData[selectedOptionsFrom]))
    }

// second input handler. it is return user`s target value for second input & converts currency for first input
    const onChangeToCurrency = (e) => {
        setToCurrency(e)
        setFromCurrency(convertsFormula(e, currencyData[selectedOptionsFrom], currencyData[selectedOptionsTo]))
    }

// first select handler. it is return user`s selected option for first select & converts currency for second input
    const onChangeSelectFromOptions = (value) => {
        setSelectedOptionsFrom(value)
        setToCurrency(convertsFormula(fromCurrency, currencyData[selectedOptionsTo], currencyData[value]))
    }

// second select handler. it is return user`s selected option for second select & converts currency for first input
    const onChangeSelectToOptions = (value) => {
        setSelectedOptionsTo(value)
        setFromCurrency(convertsFormula(toCurrency, currencyData[selectedOptionsFrom], currencyData[value]))
    }


    useEffect(() => {
        fetchData()
    }, [fetchData])


    if (loading) {
        return <Preloader/>
    }

    if (error) {
        return <ResultError />
    }


    return (
        <Layout style={{minHeight: "100vh"}}>
            <HeaderApp currency={currencyData}/>
            <Layout>
                <Content className={st.content}>
                    <Row justify={"center"}>
                        <Col span={12} className={st.CurrencyRow}>

                            <CurrencyRow
                                options={currencyData}
                                inputValue={fromCurrency}
                                selectedValue={selectedOptionsFrom}
                                onChangeInputHandler={onChangeFromCurrency}
                                onChangeSelectHandler={onChangeSelectFromOptions}
                            />

                            <CurrencyRow
                                options={currencyData}
                                inputValue={toCurrency}
                                selectedValue={selectedOptionsTo}
                                onChangeInputHandler={onChangeToCurrency}
                                onChangeSelectHandler={onChangeSelectToOptions}
                            />

                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
