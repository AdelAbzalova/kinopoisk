import { Alert } from "antd";
import { FC } from "react";
 const  Error:FC =()=> {
  return (
    <>
      <Alert
        message="Ошибка"
        description="Не удалось получить данные"
        type="error"
        showIcon
      />
    </>
  );
}

export default Error;