import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="app-container">{children}</div>;
};

export default MainLayout;
