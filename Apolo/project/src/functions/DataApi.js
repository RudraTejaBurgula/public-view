import axios from "axios";
function DataApi(flag, formValues) {
    console.log(formValues.addDays)
    if (flag === true) {
        console.log(flag)
        axios.post('http://localhost:5000/admin/', {
            doc_id: formValues.docId,
            doc_name: formValues.docName,
            hosp_name: formValues.hospName,
            spec_name: formValues.docSpec,
            date: formValues.addDays,
            hosp_location: formValues.hospLoc,
            doc_number: formValues.mobNumber
        }).then(response => console.log(response))
            .catch(error => console.log(error));
    } else if (flag === false) {
        console.log(flag)
        axios.post('http://localhost:5000/admin/edit', {
            doc_id: formValues.docId,
            doc_name: formValues.docName,
            hosp_name: formValues.hospName,
            spec_name: formValues.docSpec,
            date: formValues.addDays,
            hosp_location: formValues.hospLoc,
            doc_number: formValues.mobNumber
        }).then(response => console.log(response.status, response))
            .catch(error => console.log(error));
    }
}
export default DataApi