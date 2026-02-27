import Row from "./Row";

type Props = {
  pattern: boolean[][];
  onClick: (row: number, column: number) => void;
};

const Pattern = ({ pattern, onClick }: Props) => {
  const toRow = (row: boolean[], rowId: number) => (
    <Row
      key={rowId}
      id={rowId}
      stitches={row}
      onClick={(stitch) => onClick(rowId, stitch)}
    />
  );

  return <div className="flex flex-col w-full gap-0">{pattern.map(toRow)}</div>;
};

export default Pattern;
