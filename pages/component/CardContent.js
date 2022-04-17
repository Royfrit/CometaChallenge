import React, { useState } from 'react';
import { PAID, DUE, OUTSTANDING } from '../constante'
import {formatDate} from '../util/util'
import Card from '@mui/material/Card';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


export default function CardContent(props) {
    
    const [totalToPay, setTotalToPay] = useState(null);
    const [totalToPayOutstanding, setTotalToPayOutstanding] = useState([])
    const [noneButton, setNoneButton] = useState('None')
    const OrderPaid = props.studentOrder?.data?.filter((paid) => paid.status === PAID);
    const OrderDue = props.studentOrder?.data?.filter((paid) => paid.status === DUE);
    const OrderOutstanding = props.studentOrder?.data?.filter((paid) => paid.status === OUTSTANDING)?.map(order => {
        order.disabled = true
        return order
    })
    const enableFutureQuotas = OrderDue?.length === totalToPay?.length;
    const TotalOrderPermitted = totalToPay?.concat(totalToPayOutstanding)

    if (enableFutureQuotas) {
        OrderOutstanding?.map((item, index) => {
            if (index === 0) {
                item.disabled = false
            }
            return item
        })
    }

    const toggleDoneDue = (index) => {
        const newTotal = [];
        newTotal = [...OrderDue]
        newTotal[index].done = !newTotal[index].done;
        const filterNewTotal = newTotal.filter(d => d.done === true).map(item => {
            item.total = parseFloat(item.interest) + parseFloat(item.price)
            return item
        })
        filterNewTotal.length  === 0 ? setNoneButton('None') : setNoneButton('');
        setTotalToPay(filterNewTotal)
    }

    const toggleDoneOutstanding = (index) => {
        OrderOutstanding[index].done = !OrderOutstanding[index].done;
        const filterNewTotal = OrderOutstanding.filter(d => d.done === true).map(item => {
            item.total = parseFloat(item.price)
            return item
        })
        setTotalToPayOutstanding(filterNewTotal)

    }

    const resultTotal = TotalOrderPermitted?.length > 0 ? TotalOrderPermitted?.reduce((total, curr) => {
        return total + curr.total;
    }, 0) : totalToPay?.reduce((total, curr) => {
        return total + curr.total;
    }, 0);
   
    return (
        <div className="content">
            <div className="content-card">
                <Card sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    maxWidth: 500,
                    height: 100,
                }}
                    className="Card Card-Balance">
                    <div  className="title-Primary">
                        <p>{props.studentInfo?.data?.first_name} {props.studentInfo?.data?.last_name}</p> <p>{props.studentInfo?.data?.cohort}</p>
                    </div>
                    <div  className="title-Secundary">
                        <p>Total a Pagar</p> <p>{resultTotal ? resultTotal : '$----'}</p>
                    </div>
                    
                </Card>

                <Card sx={{ maxWidth: 500 }} className="Card Card-paid">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<KeyboardArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <div className="Card-paid">
                            <h1  className="title-Primary">Cuotas pagagas</h1>
                            <p className="title-Secundary">Dale click para espandir</p>
                        </div>
                        
                        </AccordionSummary>
                        <AccordionDetails>
                            {OrderPaid?.map((paid, index) => {
                                return <div className="title-details" key={index} ><p>{paid.name}</p> Pagado el {formatDate(paid.due)} </div>
                            })}
                        </AccordionDetails>
                    </Accordion>
                </Card>

                <Card sx={{ maxWidth: 500 }} className="Card Card-slope">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<KeyboardArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <div className="Card-paid">
                            <h1  className="title-Primary">Cuotas pendientes</h1>
                            <p className="title-Secundary">Dale click para espandir</p>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {OrderDue?.map((due, index) => {
                                return <div
                                            key={due.id}
                                            className="title-details"
                                        >{due.name} <br /> Vence el {formatDate(due.due)}
                                        <div className="title-details-interes">
                                            <div>
                                                <p>$ {due.price}</p>
                                                <p> Interes: ${due.interest}</p>
                                            </div>

                                            <Checkbox
                                                onClick={() => toggleDoneDue(index)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                                />

                                        </div>

                                    </div>
                            })}
                        </AccordionDetails>
                    </Accordion>
                </Card>

                <Card sx={{ maxWidth: 500 }} className="Card Card-future">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<KeyboardArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className="Card-paid">
                                <h1  className="title-Primary">Cuotas futuras</h1>
                                <p className="title-Secundary">Dale click para espandir</p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {OrderOutstanding?.map((outstanding, index) => {
                                return <div
                                    key={outstanding.id}
                                    className="title-details" 
                                >{outstanding.name} <br />vence el {formatDate(outstanding.due)}
                                    <div className="title-details-interes">
                                        <div>
                                            <p>$ {outstanding.price}</p>
                                        </div>
                                        <Checkbox
                                            disabled={outstanding.disabled}
                                            // checked={() => outstanding.disabled}
                                            onClick={() => toggleDoneOutstanding(index)}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                        />
                                    </div>
                                </div>
                            })}
                        </AccordionDetails>
                    </Accordion>
                </Card>
            </div>
            <div className="content-button">
                <Button variant="contained" disableElevation className={noneButton}>
                    IR A PAGAR
                </Button>
            </div>
        </div>
    )
}