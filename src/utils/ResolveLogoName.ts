export default (logoname: string) => {
    return process.env.LOGO_NAME || logoname
}