import { useState } from "react";

export default function HeaderText() {
  const [count, setCount] = useState(50);
  const [name, setName] = useState('CSMJU');
  const [message, setMessage] = useState('สอบเสร็จเเล้วสบายใจจัง');
  const status: boolean = false; // true = เขียว, false = แดง
  return (
    <>
      <h1 style={{ fontSize: `${count + 20}px` }} className={status ? "green-txt" : "red-txt"}>{name}</h1>
      <h2>{message}</h2>
    </>
  );
}
 