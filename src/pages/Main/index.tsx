import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useAppContext } from '@state/context';
import Dropdown from '@components/Dropdown';
import { db } from '../../database';

import style from './style.module.scss';

interface ICurrencyBox {
  boxType: 'currencyFrom' | 'currencyTo';
}

const AdditionalInfo = ({ title = '', subTitle = '' }) => {
  return (
    <div className={style.additionalInfo}>
      <p>{title}</p>
      <p>{subTitle}</p>
    </div>
  );
};

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

      <p>Лидер ринка по обмену цифрових валют</p>

      <div className={style.additionalInfoBlock}>
        <div>
          <AdditionalInfo title="2000+" subTitle="Обменов" />
          <AdditionalInfo title="100+" subTitle="Отзивов" />
          <AdditionalInfo title="500+" subTitle="Клиентов" />
        </div>
        <div>
          <AdditionalInfo title="1 000 000$+" subTitle="Резервов" />
          <AdditionalInfo title="24/7" subTitle="Служба поддержки" />
        </div>
      </div>
    </div>
  );
}

export default App;
