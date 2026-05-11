import { convertTestName } from "@/components/common/storeCardComponent/utils/convert-test-name";
import {
  getTemplateDisplay,
  templateIconTileClassName,
} from "@/utils/templateDisplay";
import { cn } from "@/utils/utils";
import IconComponent, {
  ForwardedIconComponent,
} from "../../../../components/common/genericIconComponent";
import type { TemplateCardComponentProps } from "../../../../types/templates/types";

interface TemplateCardComponentExtendedProps
  extends TemplateCardComponentProps {
  disabled?: boolean;
}

export default function TemplateCardComponent({
  example,
  onClick,
  disabled = false,
}: TemplateCardComponentExtendedProps) {
  const display = getTemplateDisplay(example.name, {
    description: example.description,
    icon: example.icon || "FileText",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) onClick();
    }
  };

  return (
    <div
      data-testid={`template-${convertTestName(example.name)}`}
      className={cn(
        "group flex gap-3 overflow-hidden rounded-md p-3 hover:bg-muted focus-visible:bg-muted",
        disabled ? "cursor-default opacity-80" : "cursor-pointer",
      )}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`${example.name} 템플릿 선택`}
      onKeyDown={handleKeyDown}
      onClick={() => !disabled && onClick()}
    >
      <div
        className={cn(
          "relative h-20 w-20 shrink-0 overflow-hidden rounded-md p-4 outline-none ring-ring",
          templateIconTileClassName,
        )}
      >
        <IconComponent
          name={display.icon}
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 duration-300 group-hover:scale-105 group-focus-visible:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div
          data-testid="text_card_container"
          role={convertTestName(example.name)}
        >
          <div className="flex w-full items-center">
            <h3
              className="line-clamp-3 font-semibold"
              data-testid={`template_${convertTestName(example.name)}`}
            >
              {example.name}
            </h3>
            <ForwardedIconComponent
              name="ArrowRight"
              className="mr-3 h-5 w-5 shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100 group-focus-visible:translate-x-3 group-focus-visible:opacity-100"
            />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {display.description}
          </p>
        </div>
      </div>
    </div>
  );
}
