import { RouteConfig } from "../types/route";
import QuickQuery from "../views/QuickQuery";

export const router: RouteConfig[] = [
  {
    path: '/',
    title: '快捷参数设置',
    element: <QuickQuery />,
  },
];
