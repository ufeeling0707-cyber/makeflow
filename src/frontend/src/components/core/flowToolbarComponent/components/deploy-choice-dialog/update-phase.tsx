import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import StepDeployStatus from "@/pages/MainPage/pages/deploymentsPage/components/step-deploy-status";

interface UpdatePhaseContentProps {
  isUpdating: boolean;
  isUpdated: boolean;
  deploymentName: string;
  onClose: () => void;
  onTest?: () => void;
}

export default function UpdatePhaseContent({
  isUpdating,
  isUpdated,
  deploymentName,
  onClose,
  onTest,
}: UpdatePhaseContentProps) {
  return (
    <>
      <DialogTitle className="sr-only">
        {isUpdating ? "Updating deployment" : "Deployment updated"}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {isUpdating
          ? "Deployment를 업데이트하고 있습니다."
          : `"${deploymentName}" 업데이트가 완료되었습니다.`}
      </DialogDescription>
      <StepDeployStatus
        phase={isUpdating ? "deploying" : "deployed"}
        deploymentName={deploymentName}
        loadingTitle="Updating..."
        loadingDescription="Deployment를 업데이트하고 있습니다. 보통 몇 초 정도 걸립니다."
        doneTitle="Deployment updated"
        doneDescription={`"${deploymentName}" 업데이트가 완료되었습니다.`}
      />
      {isUpdated && (
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onTest && <Button onClick={onTest}>Test</Button>}
        </DialogFooter>
      )}
    </>
  );
}
