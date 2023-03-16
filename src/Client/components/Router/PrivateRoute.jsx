
import { Redirect, Route } from 'react-router-dom'
import { useToken } from '../../context/TokenContext/TokenProvider'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { token } = useToken();

    return (
        <Route {...rest}
        render={props => {
          return token ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
          
        }/>
    )
}

export default PrivateRoute