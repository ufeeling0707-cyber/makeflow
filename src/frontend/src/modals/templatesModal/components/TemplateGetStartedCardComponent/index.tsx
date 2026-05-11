import { useParams } from "react-router-dom";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { convertTestName } from "@/components/common/storeCardComponent/utils/convert-test-name";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { useFolderStore } from "@/stores/foldersStore";
import { updateIds } from "@/utils/reactflowUtils";
import { cn } from "@/utils/utils";
import type { CardData } from "../../../../types/templates/types";

interface TemplateGetStartedCardComponentProps extends CardData {
  loading: boolean;
  onFlowCreating: (loading: boolean) => void;
}

export default function TemplateGetStartedCardComponent({
  bgImage,
  bgHorizontalImage,
  icon,
  category,
  flow,
  loading,
  onFlowCreating,
}: TemplateGetStartedCardComponentProps) {
  const addFlow = useAddFlow();
  const navigate = useCustomNavigate();
  const { folderId } = useParams();
  const myCollectionId = useFolderStore((state) => state.myCollectionId);

  const folderIdUrl = folderId ?? myCollectionId;

  const handleClick = () => {
    if (loading) return;

    if (flow) {
      onFlowCreating(true);
      updateIds(flow.data!);
      addFlow({ flow })
        .then((id) => {
          navigate(`/flow/${id}/folder/${folderIdUrl}`);
        })
        .finally(() => {
          onFlowCreating(false);
        });

      track("New Flow Created", { template: `${flow.name} Template` });
    } else {
      console.error(`Flow template not found`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const imageClassName = cn(
    "h-full w-full object-cover transition-all duration-300 group-hover:scale-[102%] group-focus-visible:scale-[102%]",
  );

  if (!flow) {
    return <></>;
  }

  const cardText = {
    category:
      flow.name === "Basic Prompting"
        ? "프롬프트 활용"
        : flow.name === "Vector Store RAG"
          ? "지식베이스(RAG)"
          : category,
    title:
      flow.name === "Basic Prompting"
        ? "프롬프트 기본 활용"
        : flow.name === "Vector Store RAG"
          ? "Vector DB 기반 지식베이스"
          : flow.name,
    description:
      flow.name === "Basic Prompting"
        ? "기본적인 프롬프트 활용"
        : flow.name === "Vector Store RAG"
          ? "지식베이스 구축을 위한 데이터 탑재"
          : flow.description,
  };

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[200px] w-full cursor-pointer flex-col overflow-hidden rounded-3xl border focus-visible:border-ring md:min-h-[250px]",
        loading ? "cursor-default opacity-80" : "cursor-pointer",
      )}
      role="button"
      tabIndex={0}
      aria-label={`${cardText.title} 템플릿으로 시작`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] overflow-hidden rounded-2xl">
        <img
          src={bgImage}
          alt={`${flow.name} MakeAI visual`}
          className={cn("hidden lg:block", imageClassName)}
        />
        <img
          src={bgHorizontalImage}
          alt={`${flow.name} MakeAI visual horizontal`}
          className={cn("block lg:hidden", imageClassName)}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-950/45 to-cyan-500/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(52,211,153,0.42),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(59,130,246,0.42),transparent_30%),linear-gradient(140deg,rgba(10,10,10,0.68),rgba(17,24,39,0.16))]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>
      <div className="card-shine-effect absolute inset-2 flex h-[calc(100%-16px)] min-w-[calc(100%-16px)] flex-col items-start gap-1 rounded-2xl p-4 text-white md:gap-3 lg:gap-4 lg:py-6">
        <div className="flex items-center gap-2 text-muted-foreground mix-blend-plus-lighter">
          <ForwardedIconComponent name={icon} className="h-4 w-4" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            {cardText.category}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <h3
            data-testid={`template-get-started-card-${convertTestName(
              flow?.name,
            )}`}
            className="line-clamp-3 text-lg font-bold lg:text-xl"
          >
            {cardText.title}
          </h3>
          <ForwardedIconComponent
            name="ArrowRight"
            className="mr-3 h-5 w-5 shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100 group-focus-visible:translate-x-3 group-focus-visible:opacity-100"
          />
        </div>

        <p className="line-clamp-3 w-full overflow-hidden text-sm font-medium opacity-90">
          {cardText.description}
        </p>
      </div>
    </div>
  );
}
