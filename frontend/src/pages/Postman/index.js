import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import PageLayoutWithContent from '../../component/PageLayoutWithContent'
import Deliver from './Deliver'
import End from './End'
import NewOrder from './NewOrder'
import OperList from './OperList'
import Receive from './Receive'
import Send from './Send'


export default function Postman() {
  return (
    <PageLayoutWithContent>
        <Routes>
            <Route path={'oper_list'} element={<OperList />}/>
            <Route path={'new_order'} element={<NewOrder />}/>
            <Route path={'send'} element={<Send />}/>
            <Route path={'receive'} element={<Receive />}/>
            <Route path={'deliver'} element={<Deliver />}/>
            <Route path={'end'} element={<End />}/>
            <Route path={'*'} element={<Navigate to={'oper_list'}/>} />
        </Routes>
        {/* <div>hh</div> */}
    </PageLayoutWithContent>
  )
}
