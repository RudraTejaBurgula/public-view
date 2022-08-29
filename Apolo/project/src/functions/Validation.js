const validate = (formValues) => {
    console.log(formValues.addDays)
    const errors = {}
    if (formValues.addDays.length === 0) {
        errors.addDays = "Please select the day of Availability"
    }
    if (formValues.docId === '') {
        errors.docId = `Can't be Empty!`
    }
    if (formValues.hospLoc === '') {
        errors.hosploc = `Can't be Empty!`
    }
    if (formValues.hospName === '') {
        errors.hospName = `Can't be Empty!`
    }
    if (formValues.docName === '') {
        errors.docName = `Can't be Empty!`
    }
    if (formValues.docSpec === '') {
        errors.docSpec = `Can't be Empty!`
    }
    if (formValues.mobNumber === '') {
        errors.mobNumber = `Can't be Empty!`
    }
    return errors;
}
export { validate }