import Home from "../containers/Home"
import LogIn from "../containers/LogIn"
import Register from "../containers/Register"
import Test from "../containers/Test"

const serverRoutes = () => {
    return [
        {
            path: '/',
            exact: true,
            component: LogIn
        },
        {
            path: '/home',
            exact: true,
            component: Home
        },
        {
            path: '/signup',
            exact: true,
            component: Register
        },
        {
            name: 'NotFound',
            component: Test
        }
    ]
}

export default serverRoutes