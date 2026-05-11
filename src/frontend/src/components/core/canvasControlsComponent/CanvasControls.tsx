import { Panel, useStoreApi } from "@xyflow/react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import MakeFlowMark from "@/assets/MakeFlowMark.svg?react";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { ENABLE_INSPECTION_PANEL } from "@/customization/feature-flags";
import useAssistantManagerStore from "@/stores/assistantManagerStore";
import useFlowStore from "@/stores/flowStore";
import type { AllNodeType } from "@/types/flow";
import CanvasControlsDropdown from "./CanvasControlsDropdown";
import HelpDropdown from "./HelpDropdown";

const CanvasControls = ({
  children,
  selectedNode,
  effectiveLocked,
}: {
  children?: ReactNode;
  selectedNode: AllNodeType | null;
  effectiveLocked?: boolean;
}) => {
  const reactFlowStoreApi = useStoreApi();
  const isFlowLocked = useFlowStore(
    useShallow((state) => state.currentFlow?.locked),
  );
  const setAssistantSidebarOpen = useAssistantManagerStore(
    (state) => state.setAssistantSidebarOpen,
  );
  const assistantSidebarOpen = useAssistantManagerStore(
    (state) => state.assistantSidebarOpen,
  );
  const inspectionPanelVisible = useFlowStore(
    (state) => state.inspectionPanelVisible,
  );
  const setInspectionPanelVisible = useFlowStore(
    (state) => state.setInspectionPanelVisible,
  );

  const handleAssistantClick = () => {
    setAssistantSidebarOpen(!assistantSidebarOpen);
  };

  const [isAddNoteActive, setIsAddNoteActive] = useState(false);

  const handleAddNote = useCallback(() => {
    window.dispatchEvent(new Event("lf:start-add-note"));
    setIsAddNoteActive(true);
  }, []);

  useEffect(() => {
    const onEnd = () => setIsAddNoteActive(false);
    window.addEventListener("lf:end-add-note", onEnd);
    return () => window.removeEventListener("lf:end-add-note", onEnd);
  }, []);

  const locked = effectiveLocked ?? isFlowLocked;

  useEffect(() => {
    reactFlowStoreApi.setState({
      nodesDraggable: !locked,
      nodesConnectable: !locked,
      elementsSelectable: !locked,
    });
  }, [locked, reactFlowStoreApi]);

  return (
    <>
      <Panel
        data-testid="main_canvas_controls"
        className="react-flow__controls flex !flex-row items-center gap-1 !overflow-visible rounded-lg bg-background px-2 py-1 fill-foreground stroke-foreground text-primary [&>button]:border-0"
        position="top-center"
      >
        <div className="group relative">
          <span
            className={`absolute -top-4 -left-1 z-10 flex items-center gap-0.5 rounded bg-pink-600 px-1 py-0.5 text-[9px] font-medium leading-none text-white transition-all duration-200 ${assistantSidebarOpen ? "hidden" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}`}
          >
            <ForwardedIconComponent name="Sparkles" className="h-2.5 w-2.5" />
            New
          </span>
          <Button
            unstyled
            size="icon"
            data-testid="assistant-button"
            className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md hover:bg-muted"
            title="MakeFlow Assistant"
            onClick={handleAssistantClick}
          >
            <MakeFlowMark
              title="MakeFlow Assistant"
              className="h-5 w-5 shrink-0"
            />
          </Button>
        </div>
        <CanvasControlsDropdown selectedNode={selectedNode} />
        <Button
          unstyled
          size="icon"
          data-testid="canvas-add-note-button"
          className="group flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
          title="Add Sticky Note"
          onClick={handleAddNote}
        >
          <ForwardedIconComponent
            name="sticky-note"
            className={`h-[18px] w-[18px] transition-colors ${
              isAddNoteActive
                ? "text-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        </Button>
        <HelpDropdown />
        {children}
        {ENABLE_INSPECTION_PANEL && (
          <Button
            unstyled
            size="icon"
            data-testid="canvas_controls_toggle_inspector"
            className="group flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
            title={
              !selectedNode
                ? "Select a node to open the Inspector Panel"
                : inspectionPanelVisible
                  ? "Hide Inspector Panel"
                  : "Show Inspector Panel"
            }
            onClick={() => setInspectionPanelVisible(!inspectionPanelVisible)}
          >
            <ForwardedIconComponent
              name={inspectionPanelVisible ? "PanelRightClose" : "PanelRight"}
              className="!h-5 !w-5 text-muted-foreground group-hover:text-foreground"
            />
          </Button>
        )}
      </Panel>
    </>
  );
};

export default CanvasControls;
