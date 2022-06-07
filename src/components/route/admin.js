import { isCookies } from "../Util"

const isAdmin = () => {
    return !!isCookies("token");
}

export default isAdmin;