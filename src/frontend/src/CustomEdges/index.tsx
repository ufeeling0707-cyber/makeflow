import {
  BaseEdge,
  type EdgeProps,
} from "@xyflow/react";
import { memo } from "react";
import IconComponent from "@/components/common/genericIconComponent";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useFlowStore from "@/stores/flowStore";
import { scapeJSONParse } from "@/utils/reactflowUtils";

const UNRECOGNIZED_DOM_PROPS = [
  "targetPosition",
  "sourcePosition",
  "pathOptions",
];

const STEP_EDGE_OFFSET = 48;

function getStepEdgePath({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) {
  const middleX =
    sourceX <= targetX
      ? sourceX + (targetX - sourceX) / 2
      : Math.max(sourceX, targetX) + STEP_EDGE_OFFSET;

  return `M ${sourceX} ${sourceY} H ${middleX} V ${targetY} H ${targetX}`;
}

export const DefaultEdge = memo(function DefaultEdge({
  sourceHandleId,
  source,
  sourceX,
  sourceY,
  target,
  targetHandleId,
  targetX,
  targetY,
  ...props
}: EdgeProps) {
  const getNode = useFlowStore((state) => state.getNode);
  const edges = useFlowStore((state) => state.edges);
  const setEdges = useFlowStore((state) => state.setEdges);

  const sourceNode = getNode(source);
  const targetNode = getNode(target);

  const targetHandleObject = scapeJSONParse(targetHandleId!);

  const sourceXNew =
    (sourceNode?.position.x ?? 0) + (sourceNode?.measured?.width ?? 0) + 7;
  const targetXNew = (targetNode?.position.x ?? 0) - 7;

  const targetYNew = targetY + 1;
  const sourceYNew = sourceY + 1;

  const edgePath = getStepEdgePath({
    sourceX: sourceXNew,
    sourceY: sourceYNew,
    targetX: targetXNew,
    targetY: targetYNew,
  });

  const { animated, selectable, deletable, selected, ...domSafeProps } = props;

  //Remove unrecognized DOM props
  UNRECOGNIZED_DOM_PROPS.forEach((prop) => {
    if (prop in domSafeProps) {
      delete domSafeProps[prop];
    }
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        strokeDasharray={targetHandleObject.output_types ? "5 5" : "0"}
        {...domSafeProps}
        data-animated={animated ? "true" : "false"}
        data-selectable={selectable ? "true" : "false"}
        data-deletable={deletable ? "true" : "false"}
        data-selected={selected ? "true" : "false"}
      />

      <ContextMenu>
        <ContextMenuTrigger asChild>
          <path
            className="react-flow__edge-interaction"
            d={edgePath}
            strokeOpacity={0}
            strokeWidth={20}
            fill="none"
            data-testid={`edge-context-menu-trigger`}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            variant="destructive"
            onClick={() => {
              const newEdges = edges.filter((edge) => edge.id !== props.id);
              setEdges(newEdges);
            }}
            data-testid="context-menu-item-destructive"
          >
            <IconComponent name="Trash2" className="size-3.5 text-inherit" />
            <span className="text-xs">Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
});
