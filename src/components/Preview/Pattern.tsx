import Row from "./Row";

type Props = {
  pattern: boolean[][];
  onClick: (row: number, column: number) => void;
};

const Pattern = ({ pattern, onClick }: Props) => {
  const toRow = (row: boolean[], rowId: number) => (
    <Row
      id={rowId}
      stitches={row}
      onClick={(stitch) => onClick(rowId, stitch)}
    />
  );

  return <div>{pattern.map(toRow)}</div>;
};

export default Pattern;
