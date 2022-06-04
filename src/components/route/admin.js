import { isCookies } from "../Util"

const isAdmin = () => {
    return !!isCookies("token") || !!isCookies("id");
}

export default isAdmin;