import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';
// import _ from 'lodash';

function App() {
  const [searchText, setSearchText] = useState('')
  const [inputText, setInputText] = useState('')

  // useCallback을 써야하는 이유?
  // 리턴에 의해 함수를 반환받게 됨 -> debounce 내부에 있는 클로저 함수를 반환 받게 됨
  // 클로저 함수는 외부의 timerId를 참조하고 있음 -> 클로저 함수의 특성 때문에
  // input에 값을 입력햇을 때 뒤따라오는 현상이 없다 왜냐
  // useCallback을 통해 메모이제이션을 해놧기 때문에
  // 렌더링이 다시 일어나더라도 새롭게 함수가 리턴되는게 아니라
  // 여전히 똑같은 값을 참조하고 있기 때문에 기억하고 searchText를 바꿔줄 수 있음
  const debounce = (callback, delay) => {
    let timerId = null;
    return(...args) => {
      if(timerId){
        clearTimeout(timerId)
      }
        timerId = setTimeout(() => {
          callback(...args)
        }, [delay])
      

    }
  }

  // _.debounce((text) =>{
    //   setSearchText(text)
    // }, 2000)
  const handleSearchText  = useCallback(
      debounce((text) =>{
        setSearchText(text)
      }, 2000)
      , []
  )

  //공통 함수
  const handleChange = e => {
    setInputText(e.target.value)
    handleSearchText(e.target.value)

  }

  return (
   <>
    <div style={{
      paddingLeft:`20px`,
      paddingRight:'20px'
    }}>
      <h1>디바운싱 예제</h1>
      <input placeholder='입력값을 넣고 디바운싱 테스트를 해보세요'
              style={{width:'300px'}}
              onChange={handleChange}/>
      <p>Search Text: {searchText} </p>
      <p>Input Text: {inputText}</p>
    </div>
   </>
  );
}

export default App;
