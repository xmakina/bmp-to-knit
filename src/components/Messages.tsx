import { useState } from "react";
import Checkbox from "./Checkbox";
import clsx from "clsx";

type Props = {
  messages?: string[];
};

const Messages = ({ messages = [] }: Props) => {
  const [display, setDisplay] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="justify-start align-middle items-start flex flex-row">
        <Checkbox label="Show logs?" onChange={setDisplay} checked={display} />
      </div>
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
