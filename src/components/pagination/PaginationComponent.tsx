import { Pagination, Row } from 'antd';
import { FC } from 'react';
import { useResize } from '../../hooks/useResize';
interface PagComponentProps{
  onChange:((page: number, limit: number) => void) | undefined,
  pageSize:number[]|string[]|undefined, 
  page:number, 
  limit:number, 
  total:number , 
  changeSize: boolean|undefined,

}
const PaginationComponent:FC<PagComponentProps> =({onChange, pageSize, page, limit, total, changeSize})=>{
  const { isScreenSm} = useResize();
  const sizeStyle=isScreenSm ? "default" : "small" 
  return (
    <Row justify='center'>
    <Pagination
    showSizeChanger={changeSize}
    onChange={onChange}
    pageSizeOptions={pageSize}
    current={page}
    defaultPageSize={limit}
    total={total}
    size={sizeStyle}
    style={{marginTop:20}}
  />
  </Row>
  )
}

export default PaginationComponent;