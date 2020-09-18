export default (logoname: string) => {
    console.log(process.env.REACT_APP_LOGO_NAME)
    return process.env.REACT_APP_LOGO_NAME || logoname
}