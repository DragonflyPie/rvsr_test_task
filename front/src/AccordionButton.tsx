import { Menus, Plus } from "./icons";

interface AccordionButtonProps {
  isOpen: boolean;
  handleClick: () => void;
}

const AccordionButton = ({ isOpen, handleClick }: AccordionButtonProps) => {
  return <button onClick={handleClick}>{isOpen ? <Menus /> : <Plus />}</button>;
};

export default AccordionButton;
