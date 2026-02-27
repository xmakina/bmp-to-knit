import { useId } from "react";

type Props = {
  checked: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
};

const Checkbox = ({ label, checked, onChange }: Props) => {
  const id = useId();

  return (
    <div className="flex flex-row gap-2">
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
        ></input>
      </div>
    </div>
  );
};

export default Checkbox;
