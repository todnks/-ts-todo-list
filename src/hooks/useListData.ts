import { getTodoItem } from '../core/BaseStorage';
import { todoListData } from '../types';
export default function useListData() {

  const getListData = () => {
    const storageData: todoListData[] = getTodoItem();
    const routes = {
      '': storageData,
      '/': storageData,
      '/active': storageData.filter((data: todoListData) => data.completed === false),
      '/completed': storageData.filter((data: todoListData) => data.completed === true),
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