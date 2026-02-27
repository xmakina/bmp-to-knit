import { useState } from "react";
import Checkbox from "./Checkbox";
import clsx from "clsx";

type Props = {
  messages?: string[];
};

const Messages = ({ messages = [] }: Props) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="flex flex-col">
      <Checkbox label="Show logs?" onChange={setDisplay} checked={display} />
      <div
        className={clsx("flex-col", { hidden: !display, flex: display })}
        hidden={!display}
      >
        {messages.map((val, idx) => (
          <div key={idx}>{val}</div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
