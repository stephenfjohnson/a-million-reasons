import React, { useRef, useEffect, useContext } from "react";
import cx from "classnames";
import { DynamicListContext } from "./List";
const ListRow = ({ index, width, data, style }) => {
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef(null);
  useEffect(() => {
    if (rowRoot.current) {
      // console.info(`Updated ListRow @index: ${index}`);
      setSize && setSize(index, rowRoot.current.getBoundingClientRect().height);
    }
  }, [index, setSize, width]);
  return React.createElement(
    "div",
    { style: style },
    React.createElement(
      "div",
      {
        ref: rowRoot,
        className: cx(
          index % 2 ? "bg-white" : "bg-gray-200",
          "px-6 py-4 text-sm leading-5 font-medium text-gray-900"
        )
      },
      data[index]
    )
  );
};
export default ListRow;
