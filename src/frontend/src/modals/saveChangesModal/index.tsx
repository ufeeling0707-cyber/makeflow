import { truncate } from "lodash";
import { useCallback, useState } from "react";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import Loading from "@/components/ui/loading";
import ConfirmationModal from "../confirmationModal";

export function SaveChangesModal({
  onSave,
  onProceed,
  onCancel,
  flowName,
  lastSaved,
  autoSave,
}: {
  onSave: () => void;
  onProceed: () => void;
  onCancel: () => void;
  flowName: string;
  lastSaved: string | undefined;
  autoSave: boolean;
}): JSX.Element {
  const [saving, setSaving] = useState(false);

  const handleOpenAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
    (
      document.querySelector('[data-testid="replace-button"]') as HTMLElement
    )?.focus();
  }, []);

  return (
    <ConfirmationModal
      open={true}
      onClose={onCancel}
      destructiveCancel
      title={
        (autoSave ? "Flow" : truncate(flowName, { length: 32 })) +
        " has unsaved changes"
      }
      cancelText={autoSave ? undefined : "Exit anyway"}
      confirmationText={autoSave ? undefined : "Save and Exit"}
      onConfirm={
        autoSave
          ? undefined
          : () => {
              setSaving(true);
              onSave();
            }
      }
      onCancel={onProceed}
      loading={autoSave ? true : saving}
      size="x-small"
      onOpenAutoFocus={handleOpenAutoFocus}
    >
      <ConfirmationModal.Content>
        {autoSave ? (
          <div className="mb-4 flex w-full items-center gap-3 rounded-md bg-muted px-4 py-2 text-muted-foreground">
            <Loading className="h-5 w-5" />
            Saving your changes...
          </div>
        ) : (
          <>
            <div className="mb-4 flex w-full items-center gap-3 rounded-md bg-warning px-4 py-2 text-warning-foreground">
              <ForwardedIconComponent name="Info" className="h-5 w-5" />
              Last saved: {lastSaved ?? "Never"}
            </div>
            저장되지 않은 변경사항은 영구적으로 사라집니다. 진행 상황을 잃지
            않도록 자동 저장 설정을 확인하세요.
          </>
        )}
      </ConfirmationModal.Content>
    </ConfirmationModal>
  );
}
