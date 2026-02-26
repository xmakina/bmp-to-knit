import { useEffect, useState } from "react";
import PatternPreview from "./Preview/Pattern";
import Checkbox from "./Checkbox";
import { Pattern } from "afghan-square-maker";

type Props = {
  pattern?: boolean[][];
  onChange: (pattern: boolean[][]) => void;
};

const PatternEditor = ({ pattern = [[]], onChange }: Props) => {
  const [originalPattern] = useState(pattern);
  const [addBorder, setAddBorder] = useState(false);

  const changePattern = (row: number, col: number) => {
    const newPattern = [...pattern];
    pattern[row][col] = !pattern[row][col];

    onChange(newPattern);
  };

  useEffect(() => {
    if (addBorder) {
      console.log("adding border");
      return onChange(
        Pattern.AddBorder(Pattern.FromRows(originalPattern)).rows,
      );
    }

    console.log("removing border");
    return onChange(originalPattern);
  }, [addBorder]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <div>
          <Checkbox
            onChange={setAddBorder}
            label="Add Border?"
            checked={addBorder}
          />
        </div>
        <div>Add gap rows?</div>
      </div>
      <div>
        <PatternPreview pattern={pattern} onClick={changePattern} />
      </div>
    </div>
  );
};

export default PatternEditor;
