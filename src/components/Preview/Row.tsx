import Stitch from "./Stitch";

type Props = {
  onClick?: (stitch: number) => void;
  stitches: boolean[];
};

const Row = ({ stitches, onClick = () => {} }: Props) => {
  const toStitch = (active: boolean, stitchId: number) => (
    <Stitch active={active} onClick={() => onClick(stitchId)} key={stitchId} />
  );

  return <div className="flex flex-row">{stitches.map(toStitch)}</div>;
};

export default Row;
