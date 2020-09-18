export default (logoname: string) => {
    return process.env.REACT_APP_LOGO_NAME || logoname
}