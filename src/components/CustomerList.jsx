import { useState } from "react"

export default function CustomerList() {
        
    const fetchedCustomers = JSON.parse(localStorage.getItem('CustomerList'))

    const [customers, setCustomers] = useState(fetchedCustomers)

    const removeItemHandler = (index) => {
        
        customers.splice(index, 1)
        
        localStorage.setItem('CustomerList', JSON.stringify(customers))

        setCustomers(JSON.parse(localStorage.getItem('CustomerList')))

    }
    
    console.log(customers)



    const customerList =  customers?.map((value,index) => {
                 return <tr>
                            <th>{index + 1}</th>
                            <td>{value.full_name}</td>
                            <td>{value.pan}</td>
                            <td>{value.email}</td>
                     <td>
                         <i className="fa fa-edit ml-2" />
                         <i className="fa fa-trash ml-2"
                            onClick={(index) => removeItemHandler(index)} />
                     </td>
                       </tr>
            })

    return (
        <div className="m-5">
            <h2 className="margin-bottom-2">Customer List</h2>
            <table class="table">
             <thead>
                <tr>
                <th scope="col">Serial No.</th>
                <th scope="col">Full Name</th>
                <th scope="col">PAN</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
                <tbody> {customerList }</tbody>
            </table>
            </div>
            )
}