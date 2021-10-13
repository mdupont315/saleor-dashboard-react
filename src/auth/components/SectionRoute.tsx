import useUser from "@saleor/hooks/useUser";
import React from "react";
import { Redirect } from "react-router";
import { Route, RouteProps } from "react-router-dom";

import NotFound from "../../NotFound";
import { PermissionEnum } from "../../types/globalTypes";
import { hasPermission } from "../misc";

interface SectionRouteProps extends RouteProps {
  permissions?: PermissionEnum[];
  roles?: any[];
}

export const SectionRoute: React.FC<SectionRouteProps> = ({
  permissions,
  roles,
  ...props
}) => {
  const { user } = useUser();
  const { isSupplier, isSuperuser, isStaff } = user;
  // if (roles && roles.findIndex(item => item === "isSuperuser") && isSuperuser) {
  // } else {
  //   return <Redirect to="/stores" />;
  // }

  // if (roles && roles.findIndex(item => item === "isSupplier") && isSupplier) {
  // } else {
  //   return <Redirect to="/" />;
  // }
  if (roles) {
    if (roles.findIndex(item => item === "isSuperuser") >= 0) {
      if (!isSuperuser) {
        return <Redirect to="/" />;
      }
    }

    if (roles.findIndex(item => item === "isSupplier") >= 0 || roles.findIndex(item => item === "isStaff") >= 0) {
      if (!isSupplier && !isStaff) {
        return <Redirect to="/" />;
      }
    }
  }
  const hasPermissions =
    !permissions ||
    permissions
      .map(permission => hasPermission(permission, user))
      .reduce((prev, curr) => prev && curr);
  return hasPermissions ? <Route {...props} /> : <NotFound />;
};
SectionRoute.displayName = "Route";
export default SectionRoute;
