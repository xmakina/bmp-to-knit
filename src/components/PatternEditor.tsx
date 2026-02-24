import Pattern from "./Preview/Pattern";

type Props = {
  pattern?: boolean[][];
  onChange: (pattern: boolean[][]) => void;
};

const PatternEditor = ({ pattern = [[]], onChange }: Props) => {
  const changePattern = (row: number, col: number) => {
    const newPattern = [...pattern];
    pattern[row][col] = !pattern[row][col];

    onChange(newPattern);
  };

  return (
    <div>
      <Pattern pattern={pattern} onClick={changePattern} />
    </div>
  );
};

export default PatternEditor;
