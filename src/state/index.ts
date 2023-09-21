import { IContext } from './context';
import currencies from './currencies.json';

const state: IContext = {
  currencyData: currencies,
  currencyFrom: currencies[0],
  currencyTo: currencies[1],
  updateState: () => {},
  wallet: '',
  email: '',
};

export default state;
