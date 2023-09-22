import React from 'react'
import type {Order} from '../../types/Order';
import * as FakeApi from '../../utils/FakeApi'
import Pagination from '../Pagination/Pagination';
import './Orders.css'

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number):number => (
  Math.ceil(rowCount / ROWS_PER_PAGE)
)

const OrderRow = ({order}:{
  order: Order
}) => {
  return (
    <tr>
      <td>{order.nameProduct}</td>
      <td>{order.idUser}</td>
      <td>{order.idProduct}</td>
      <td>{order.orderDate}</td>
    </tr>
  )
}


const Orders = () => {
  const [data, setData] = React.useState<any>([]);
  const [activeData, setActiveData] = React.useState<any>([])
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    FakeApi.getOrders()
    .then((res) => {
      setData(res)
    })
    .catch(() => {
      setData(null)
    })
  }, []);

  React.useEffect(() => {
    setActiveData(data.slice(ROWS_PER_PAGE * (page - 1), ROWS_PER_PAGE * page))
  }, [data, page])

  const handleNextPageClick = React.useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? getTotalPageCount(data.length) : current;

    setPage(next <= total ? next : current);
  }, [page, data]);

  const handlePrevPageClick = React.useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  return (
    <main className='orders'>
      <h2>Заказы</h2>
      {activeData ? (
        <table>
          <thead>
            <tr>
              <th>Наименование товара</th>
              <th>id Пользователя</th>
              <th>id Товара</th>
              <th>Дата заказа</th>
            </tr>
          </thead>
          <tbody>
            {activeData.map((item: any, index: number) => (
              <OrderRow key={index} order={item} />
            ))}
          </tbody>
        </table>
      ) : (
        'Нет заказов'
      )}
      {data && (
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(data.length),
          }}
          nav={{ current: page, total: getTotalPageCount(data.length) }}
        />
      )}
    </main>
  )
}

export default Orders