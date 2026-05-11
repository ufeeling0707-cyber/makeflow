import type { ConnectionLineComponentProps } from "@xyflow/react";
import useFlowStore from "@/stores/flowStore";

const ConnectionLineComponent = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle = {},
}: ConnectionLineComponentProps): JSX.Element => {
  const handleDragging = useFlowStore((state) => state.handleDragging);
  const color = handleDragging?.color;
  const accentColor = `hsl(var(--datatype-${color}))`;
  const middleX = fromX + (toX - fromX) / 2;

  return (
    <g>
      <path
        fill="none"
        // ! Replace hash # colors here
        strokeWidth={2}
        className={`animated`}
        style={{
          stroke: handleDragging ? accentColor : "",
          ...connectionLineStyle,
        }}
        d={`M ${fromX} ${fromY} H ${middleX} V ${toY} H ${toX}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={5}
        stroke={accentColor}
        className=""
        strokeWidth={1.5}
      />
    </g>
  );
};

export default ConnectionLineComponent;
