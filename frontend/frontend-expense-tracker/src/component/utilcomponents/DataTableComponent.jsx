import DataTable from 'react-data-table-component';
import style  from './DataTableComponent.module.scss'
import '../../assets/css/variables.scss'
const DataTableComponent = ({columns,data})=>{

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