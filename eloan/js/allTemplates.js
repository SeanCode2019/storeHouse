import borrowerTemplate from "../json/進件作業/borrowerTemplate"
import topTemplate from "../json/Top/topTemplate"

let templates = {
    top: topTemplate,
    //進件作業
    incoming: { borrower: borrowerTemplate }
}

export { templates }