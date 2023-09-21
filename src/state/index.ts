import { IContext } from './context';
import currencies from './currencies.json';

const state: IContext = {
  currencyData: currencies,
  currencyFrom: currencies[0],
  currencyTo: currencies[1],
  updateState: (newValues: { [key: string]: string }) => {},
  wallet: '',
  email: '',
};

export default state;
