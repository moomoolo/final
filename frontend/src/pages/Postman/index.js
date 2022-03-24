import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import PageLayoutWithContent from '../../component/PageLayoutWithContent'
import NewOrder from './NewOrder'
import OperList from './OperList'


export default function Postman() {
  return (
    <PageLayoutWithContent>
        <Routes>
            <Route path={'oper_list'} element={<OperList />}/>
            <Route path={'new_order'} element={<NewOrder />}/>
            <Route path={'*'} element={<Navigate to={'oper_list'}/>} />
        </Routes>
        {/* <div>hh</div> */}
    </PageLayoutWithContent>
  )
}
