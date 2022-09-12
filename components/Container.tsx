import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export default function Container({ children }: Props) {
  return (
    <div className="h-screen w-screen flex flex-col items-stretch overflow-y-hidden bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}
