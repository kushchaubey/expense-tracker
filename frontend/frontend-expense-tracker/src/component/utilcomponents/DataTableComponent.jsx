import DataTable from 'react-data-table-component';
import style  from './DataTableComponent.module.scss'
import '../../assets/css/variables.scss'
const DataTableComponent = ({columns,data,loading})=>{

  if(loading){
  
    return(

          <div className={style.dataContainer}>
             <h1>loading....</h1>
          </div>
       
       )
    }
    
    if(!data || data.length === 0){
       return(
         <div className={style.dataContainer}>
           <h1>No data to show</h1>
          </div>
       )
    }


   return(
         <div className={style.dataContainer}>
              <DataTable
                  columns={columns}
                  data={data}
                
                />
          </div>
       )
    
      
}

export default DataTableComponent;