import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonAdd from './components/ButtonAdd'
import HeaderText from './components/HeaderTxs'
import MemberList from './components/MemberList'


function App() {

type Member = {
    nameTH: string;    // ชื่อภาษาไทย
    nameEN: string;    // ชื่อภาษาอังกฤษ
    heightCm: number;  // ส่วนสูง (เซนติเมตร)
    age: number;       // อายุ (ปี)
    imageUrl?: string; // URL รูปภาพ (ถ้ามี)
    group?: string;    // กลุ่ม (ถ้ามี)
};

const List_MEMBERS: Member[] = [
{ nameTH: "อลัน พศวีร์ ศรีอรุโณทัย", nameEN: "Alan", heightCm: 185, age: 23, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.VSjv8547MaQueC6dKGP4IwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "มาร์ค กฤษณ์ กัญจนาทิพย์", nameEN: "Marckris", heightCm: 172, age: 22, imageUrl: "https://thebeus.com/_next/image/?url=https:%2F%2Fi0.wp.com%2Fbk.thebeus.com%2Fwp-content%2Fuploads%2F2024%2F04%2FP2RDnV1713342244-1-1-1.jpg%3Ffit%3D1280%252C1280%26ssl%3D1&w=3840&q=75 " , group: "BUS" },
{ nameTH: "ขุนพล ปองพล ปัญญามิตร", nameEN: "Khunpol", heightCm: 179, age: 22, imageUrl: "https://th.bing.com/th/id/OIP.LzmySrswuzUYq21wEK4pXgHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "ฮาร์ท ชุติวัฒน์ จันเคน", nameEN: "Heart", heightCm: 174, age: 22, imageUrl: "https://tse4.mm.bing.net/th/id/OIP.nOMXxqEO61uUobeOONTKqQHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "จินวุค คิม", nameEN: "Jinwook", heightCm: 178, age: 21, imageUrl: "https://tse4.mm.bing.net/th/id/OIP.KbYv6SqReT5RpqrQnxekWQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "ไทย ชญานนท์ ภาคฐิน", nameEN: "Thai", heightCm: 178, age: 20, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.25JP4GogqEg9hYt9D2pYPQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "เน็กซ์ ณัฐกิตติ์ แช่มดารา", nameEN: "Nex", heightCm: 180, age: 20, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.WqayfKAUy5mzu41Qn-dRowAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "ภู ธัชชัย ลิ้มปัญญากุล", nameEN: "Phu", heightCm: 180, age: 20, imageUrl: "https://tse2.mm.bing.net/th/id/OIP.6vMSUAUMXEy0PKfOkiLzLAHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "คอปเปอร์ เดชาวัต พรเดชาพิพัฒ", nameEN: "Copper", heightCm: 173, age: 19, imageUrl: "https://www.siamzone.com/ig/media/13787241138/3412682394523163595.jpg " , group: "BUS" },
{ nameTH: "เอเอ อชิรกรณ์ สุวิทยะเสถียร", nameEN: "AA", heightCm: 178, age: 19, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.kNwsoMnbCS6BEvseOULUFQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 " , group: "BUS" },
{ nameTH: "จั๋ง ธีร์ บุญเสริมสุวงศ์", nameEN: "Jungt", heightCm: 173, age: 19, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.pybEF0pxoA7GNFnDGdIAlAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3", group: "BUS" },
{ nameTH: "ภีม วสุพล พรพนานุรักษ์", nameEN: "Peem", heightCm: 187, age: 19, imageUrl: "https://tse3.mm.bing.net/th/id/OIP.FJtxQjEEaLrbpjqdbAudqAHaJv?rs=1&pid=ImgDetMain&o=7&rm=3", group: "BUS" },
{ nameTH: "จั๋ง ธีร์ บุญเสริมสุวงศ์", nameEN: "Jungt", heightCm: 173, age: 19, imageUrl: "https://th.bing.com/th/id/OIP.cs41Gr8k5-OoExLqodrrTgHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3", group: "sajaboys" },
{ nameTH: "ภูมิพัฒน์ วงศ์ธนากุล", nameEN: "Maxx", heightCm: 175, age: 18, imageUrl: "https://tse1.mm.bing.net/th/id/OIP.nXzD75u0osDVaPd401HxwAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", group: "sajaboys" },
{ nameTH: "ไคโตะ ทาคาฮาชิ", nameEN: "Kaito", heightCm: 178, age: 20, imageUrl: "https://cdn.talkie-ai.com/lifecycle/image_inference_output/talkie/prod/img/2025-07-01/b401773f-4a34-4595-940b-68723349d32a.jpeg?x-oss-process=image/resize,w_1024/format,webp", group: "sajaboys" },
{ nameTH: "พีรภัทร ศิริวัฒน์", nameEN: "Beam", heightCm: 170, age: 19, imageUrl: "https://tse2.mm.bing.net/th/id/OIP.OpMZrCBNJbApE54_bYo1YAHaNX?w=1024&h=1848&rs=1&pid=ImgDetMain&o=7&rm=3", group: "sajaboys" },
{ nameTH: "ธนภัทร เจริญสุข", nameEN: "Nine", heightCm: 180, age: 21, imageUrl: "https://cdn.talkie-ai.com/image_inference_output/talkie/prod/img/2024-03-09/529b1990-0d37-4977-8b3c-b42a3504a1d0-5-400x0.webp", group: "sajaboys" },
];


  return (
    <>

    <div>
      <h2>BUS</h2>
      <MemberList members={List_MEMBERS} groupName="BUS" />

      <h2>SajaBoys</h2>
      <MemberList members={List_MEMBERS} groupName="sajaboys" />
    </div>



      <div>
        <HeaderText />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ButtonAdd/>
        <ButtonAdd/>
        <ButtonAdd/>
        <ButtonAdd/>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
