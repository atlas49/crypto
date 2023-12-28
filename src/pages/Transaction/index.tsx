import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import style from './style.module.scss';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import useDatabase from '../../database/useDatabase';
const TransactionContent = (props: {
	fromCurrency: { name: string, code: string },
	toCurrency: { name: string, code: string },
	created: string,
	rateFixed: string,
	status: string,
	send: string,
	receive: string,
	walletFrom: string,
	walletTo: string
}) => {
	return <div className={style.transactionContent}>
		<div className={style.title}>{props.fromCurrency.name} <ArrowRightAltIcon /> {props.toCurrency.name}</div>
		<div className={style.created}>Создана: {props.created}</div>
		<div className={style.time}>Время на оплату:<span><Countdown date={Date.now() + 1800000} /></span>  </div>
		<div className={style.value}>Сума к оплате: <span>{props.send} {props.fromCurrency.code}</span></div>
		<div className={style.wallet}>реквизиты: <span>{props.walletTo}</span></div>
		<div className={style.value}>Сума к получению: <span>{props.receive} {props.toCurrency.code}</span> </div>
		<div className={style.wallet}>реквизиты: <span>{props.walletFrom}</span> </div>
		<div className={style.status}>Статус: <span> {props.status === 'pending' ? 'ожидает оплаты' : 'Оплачено'}</span></div>
	</div>
}

type Transaction = {
	fromCurrency: { name: string, code: string },
	toCurrency: { name: string, code: string },
	created: string,
	rateFixed: string,
	status: string,
	send: string,
	receive: string,
	wallet: string,
	email: string
}
const TransactionPage = () => {
	const [transaction, setTransaction] = useState<Transaction>();
	const db = useDatabase()
	useEffect(() => {
		const urlObject = new URL(window.location.href);
		const searchParams = new URLSearchParams(urlObject.search);
		const itemId = searchParams.get('id') as string;
		db.getDocumentById('transactions', itemId).then(data => {
			setTransaction(data);
		})
	}, [])

	return <div className={style.transaction}>
		<h1>Заявка на обмен</h1>
		{
			transaction &&
			<TransactionContent
				fromCurrency={{ name: 'Trone', code: 'TRX' }}
				toCurrency={{ name: 'Dogecoin', code: 'DOGE' }}
				created='16.07.2022 14:41'
				rateFixed='16.07.2022 15:11:42'
				status={transaction.status}
				send={transaction.receive}
				receive={transaction.receive}
				walletFrom={transaction.wallet}
				walletTo="asdfasdfqwerewqrwqefasd"
			/>
		}

	</div>
}



export default TransactionPage