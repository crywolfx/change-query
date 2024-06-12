import { NonIndexRouteObject } from 'react-router-dom';

export interface RouteConfig extends NonIndexRouteObject {
  title?: string;
  icon?: ReactNode;
}