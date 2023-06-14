import { PropsWithChildren } from "react";
const HomeLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex w-screen h-screen">{props.children}</div>
  );
};

export default HomeLayout;
