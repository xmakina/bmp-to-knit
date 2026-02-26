import { useEffect, useState } from "react";
import PatternPreview from "./Preview/Pattern";
import Checkbox from "./Checkbox";
import { Pattern } from "afghan-square-maker";

type Options = {
  addBorder: boolean;
  addGapRows: boolean;
};

const getPattern = (
  pattern: boolean[][],
  { addBorder, addGapRows }: Options,
) => {
  if (addBorder && addGapRows) {
    return Pattern.AddBorder(Pattern.AddGapRows(Pattern.FromRows(pattern)));
  }

  if (addBorder) {
    return Pattern.AddBorder(Pattern.FromRows(pattern));
  }

  if (addGapRows) {
    return Pattern.AddGapRows(Pattern.FromRows(pattern));
  }

  return Pattern.FromRows(pattern);
};

type Props = {
  pattern?: boolean[][];
  onChange: (pattern: boolean[][]) => void;
};

const PatternEditor = ({ pattern = [[]], onChange }: Props) => {
  const [originalPattern] = useState(pattern);
  const [addBorder, setAddBorder] = useState(false);
  const [addGapRows, setAddGapRows] = useState(false);

  const changePattern = (row: number, col: number) => {
    const newPattern = [...pattern];
    pattern[row][col] = !pattern[row][col];

    onChange(newPattern);
  };

  useEffect(() => {
    const pattern = getPattern(originalPattern, { addGapRows, addBorder });
    return onChange(pattern.rows);
  }, [addGapRows, addBorder]);

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
        <div>
          <Checkbox
            onChange={setAddGapRows}
            label="Add gap rows?"
            checked={addGapRows}
          />
        </div>
      </div>
      <div>
        <PatternPreview pattern={pattern} onClick={changePattern} />
      </div>
    </div>
  );
};

export default PatternEditor;
