import { useSelector } from 'react-redux';
import { allowedUserChecker } from 'utils';
import PropTypes from 'prop-types';

const RBAC = ({ allowedRoles, children }) => {
    let userRoles = useSelector(state => state.userInfo.roles);
    let access = allowedUserChecker(userRoles, allowedRoles);
    return access && children;
};

RBAC.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.element
};

export default RBAC;

// <-- Usage -->

// import RBAC from './dir/RBAC';
// ...
// <RBAC allowedRoles={[ 'ROLE_AUTHOR', 'ROLE_ADMIN']}>
//     <Button type="submit" label="VERIFY AND PUBLISH" />
// </RBAC>
// ...
