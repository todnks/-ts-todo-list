import BaseStorage from '../core/BaseStorage';
import { todoListData } from '../types';
export default function useListData() {

  const getListData = () => {
    const storageData: todoListData[] = BaseStorage('todos').getItem();
    const routes = {
      '': storageData,
      '/': storageData,
      '/active': storageData.filter((data) => data.completed === false),
      '/completed': storageData.filter((data) => data.completed === true),
    };
    const hashName = location.hash.replace('#', '');
    const findroutes = Object.keys(routes).findIndex((key) => key === hashName);
    const ListData = Object.values(routes)[findroutes];
    return ListData;
  }
  return {
    getListData
  }
}
export const { getListData } = useListData();