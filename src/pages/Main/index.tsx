import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useAppContext } from '@state/context';
import Dropdown from '@components/Dropdown';
import { db } from '../../database';
import cryptoImg from './crypto.png'
import AMLBot from './AMLBot.svg'
import Bestchange from './Bestchange.svg'
import PerfectMoney from './PerfectMoney.svg'
import Card from './card.png'

import style from './style.module.scss';

interface ICurrencyBox {
  boxType: 'currencyFrom' | 'currencyTo';
}

const CurrencyBox: React.FC<ICurrencyBox> = (props) => {
  const state = useAppContext();
  const setNewData = (code: string, type: 'currencyFrom' | 'currencyTo') => {
    const currency = state.currencyData.find((el) => el.code === code);
    if (currency) {
      state.updateState({ [type]: currency });
    }
  };

  return (
    <div className={style.currencyBox}>
      <p>
        {props.boxType === 'currencyFrom' ? 'Отдам' : 'Получу'} {state[props.boxType]?.code}
      </p>
      <div>
        <input
          value={state[props.boxType]?.value}
          onChange={(e) => {
            state.updateState({ [props.boxType]: { ...state[props.boxType], value: e.target.value } });
          }}
        />
        <Dropdown
          data={state.currencyData}
          onChange={(value) => {
            setNewData(value, props.boxType);
          }}
          selectedData={state[props.boxType]}
        />
      </div>
    </div>
  );
};

function App() {
  const state = useAppContext();
  const createDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, 'transactions'), {
        email: state.email,
        wallet: state.wallet,
        from: state.currencyFrom,
        to: state.currencyTo,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onChangeEmail = (value: string) => {
    state.updateState({ email: value });
  };

  const onChangeWallet = (value: string) => {
    state.updateState({ wallet: value });
  };

  return (
    <div className={style.mainPage}>
      <p>
        Обмен {state.currencyFrom?.name} ({state.currencyFrom?.code}) на {state.currencyTo?.name} ({state.currencyTo?.code})
      </p>

      <div className={style.walletForm}>
        <div className={style.changeBlock}>
          <CurrencyBox boxType="currencyFrom" />
          <div />
          <CurrencyBox boxType="currencyTo" />
        </div>
        <div className={style.inputBox}>
          <input
            id="email"
            placeholder="E-mail"
            onChange={(e) => {
              onChangeEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className={style.inputBox}>
          <input
            id="wallet"
            placeholder="Введите номер кошелька"
            onChange={(e) => {
              onChangeWallet(e.target.value);
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            createDoc();
          }}
        >
          Обменять
        </button>
      </div>

      <div className={style.additionalInfo}>
        <div className={style.additionalInfoText}>
          <h1>Infinite possibilities</h1>
          <p>The cryptocurrency sector has undergone substantial development, emerging as a substantial global economic sector. Since its inception, it has transformed the financial landscape by:</p>

          <ul>
            <li>
              initiating the decentralization process,
            </li>
            <li>
              demonstrating its capacity for security and anonymity,
            </li>
            <li>
              introducing novel avenues for swift and cost-effective international fund transfers.
            </li>
          </ul>
          <p>
            With worldwide accessibility, minimal transaction fees, and rapid settlement times, cryptocurrencies have the potential to streamline cross-border payments and enhance financial inclusion for those without traditional banking access.
          </p>
          <p>
            Based on our observations, it is evident that the growth and widespread adoption potential of cryptocurrencies will persist, captivating an ever-increasing number of new users.
          </p>
        </div>
        <img src={cryptoImg} width={"340px"} alt="logo" />
      </div>


      <div className={style.additionalInfo}>
        <img src={Card} width={"340px"} alt="logo" />
        <div className={style.additionalInfoText}>
          <h1>
            Evolution from a fledgling startup to a prominent figure in the cryptocurrency market.</h1>
          <p>
            Established in 2019 by a cadre of cryptocurrency and blockchain experts, Crybex set out with the mission to develop an uncomplicated and accessible cryptocurrency exchange catering to a diverse user base, spanning from everyday individuals to corporate clients. Commencing with a modest office and team , we took a significant leap, transforming into one of the foremost companies in the global cryptocurrency exchange arena.
          </p>
          <p>
            Today, Crybex stands as a collective of skilled professionals, offering a top-tier level of service and a comprehensive platform for the swift and secure exchange of cryptocurrencies and fiat money. Our services extend to clients across the majority of countries worldwide. </p>
        </div>
      </div>

      <div className={style.partners}>
        <h1>Our partners</h1>
        <div>
          <img src={AMLBot} alt="logo" />
          <img src={Bestchange} alt="logo" />
          <img src={PerfectMoney} alt="logo" />
        </div>
      </div>

    </div>
  );
}

export default App;
