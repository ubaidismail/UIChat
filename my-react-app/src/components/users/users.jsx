import React, { useEffect, useState } from 'react'
import Header from '../header/sidebar'
import styles from './users.module.css'
import { io } from "socket.io-client";

export default function users() {
  return (
    <>
        <div className="row">
        <div className="col-3">
                    <Header />
        </div>
        </div>
    </>
  )
}

