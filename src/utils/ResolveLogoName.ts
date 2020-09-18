export default (logoname: string, logonameB?: string) => {
    return process.env.REACT_APP_LOGO_NAME || logoname || logonameB
}