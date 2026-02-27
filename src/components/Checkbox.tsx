type Props = {
  checked: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
};

const Checkbox = ({ label, checked, onChange }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div>{label}</div>
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
        ></input>
      </div>
    </div>
  );
};

export default Checkbox;
