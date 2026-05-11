import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import ToolsComponent from "@/components/core/parameterRenderComponent/components/ToolsComponent";
import type { InputFieldType } from "@/types/api";
import type { ToolFlow } from "../utils/mcpServerUtils";

interface McpFlowsSectionProps {
  flowsMCPData: ToolFlow[];
  handleOnNewValue: (changes: Partial<InputFieldType>) => void;
}

export const McpFlowsSection = ({
  flowsMCPData,
  handleOnNewValue,
}: McpFlowsSectionProps) => (
  <div className="w-full xl:w-2/5">
    <div className="flex flex-row justify-between pt-1">
      <ShadTooltip
        content="이 프로젝트의 Flow를 호출 가능한 MCP Tool로 공개할 수 있습니다."
        side="right"
      >
        <div className="flex items-center text-sm font-medium hover:cursor-help">
          Flows/Tools
          <ForwardedIconComponent
            name="info"
            className="ml-1.5 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </ShadTooltip>
    </div>
    <div className="flex flex-row flex-wrap gap-2 pt-2">
      <ToolsComponent
        value={flowsMCPData}
        title="MCP Server Tools"
        description="이 서버에 추가할 Tool을 선택합니다"
        handleOnNewValue={handleOnNewValue}
        id="mcp-server-tools"
        button_description="Tool 편집"
        editNode={false}
        isAction
        disabled={false}
      />
    </div>
  </div>
);
