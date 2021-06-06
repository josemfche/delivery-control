import { userContext } from '../createContext/UserContext'
import { useReducer } from 'react'
import userReducer from '../reducers/UserReducer'
import XLSX from 'xlsx'


function UserProvider(props) {

    const initialState = {
        user: null,
        deliveries: []
    }

    const [userState, userDispatch] = useReducer(userReducer, initialState)

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    const xlsxDeliveries = (deliveries) => {

        const dataFormatted = deliveries.map(item => item.data)

        const worksheet = XLSX.utils.json_to_sheet(dataFormatted)
        const woorkbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(woorkbook, worksheet, "Deliveries");

        XLSX.writeFile(woorkbook, "searchResultDeliveries.xlsx");


    }




    return (
        <userContext.Provider value={{
            userData: userState.user,
            userDispatch,
            formatAMPM,
            xlsxDeliveries,
            deliveries: userState.deliveries
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider
