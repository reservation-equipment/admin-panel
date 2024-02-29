import { ReactNode } from "react";

function CardListLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`
                grid 
                2xl:grid-cols-5 
                xl:grid-cols-4 
                lg:grid-cols-3 
                md:grid-cols-2 
                sm:grid-cols-1 
                grid-flow-row 
                gap-y-10
                gap-x-4`}
    >
      {children}
    </div>
  );
}

export default CardListLayout;
