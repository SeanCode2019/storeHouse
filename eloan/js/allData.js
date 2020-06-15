import borrowerData from "../json/進件作業/borrowerData"
import topData from "../json/Top/topData"
import tabsData from "../json/Tabs/tabs"

let data = {
    tabs: tabsData,
    top: topData,
    //進件作業
    incoming: {
        //借款人 
        borrower: borrowerData }
}


export { data }