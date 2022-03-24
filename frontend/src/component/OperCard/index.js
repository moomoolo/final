import React from 'react'

import styles from './style.module.css';

export default function OperCard({ children }) {
  return (
    <div className={styles.card}>{children}</div>
  )
}
