import { useState } from "react";
import AccordionButton from "./AccordionButton";
import { useAppSelector } from "./hooks";
import { selectById } from "./albumsSlice";

interface AccordionItemProps {
  type: "user" | "album";
  value: string;
  id: string;
}

const AccordionItem = ({ type, value, id }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useAppSelector(selectById);

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <AccordionButton isOpen={isOpen} handleClick={switchIsOpen} />
      <div className="">{value}</div>
    </div>
  );
};

export default AccordionItem;
