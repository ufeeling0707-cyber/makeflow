import * as Form from "@radix-ui/react-form";
import { useTranslation } from "react-i18next";
import InputComponent from "../../../../../components/core/parameterRenderComponent/components/inputComponent";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";

type StoreApiKeyFormComponentProps = {
  apikey: string;
  handleInput: (event: any) => void;
  handleSaveKey: (apikey: string, handleInput: any) => void;
  loadingApiKey: boolean;
  validApiKey: boolean;
  hasApiKey: boolean;
};
const StoreApiKeyFormComponent = ({
  apikey,
  handleInput,
  handleSaveKey,
  loadingApiKey,
  validApiKey,
  hasApiKey,
}: StoreApiKeyFormComponentProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Root
        onSubmit={(event) => {
          event.preventDefault();
          handleSaveKey(apikey, handleInput);
        }}
      >
        <Card x-chunk="dashboard-04-chunk-2" id="api">
          <CardHeader>
            <CardTitle>Store API Key</CardTitle>
            <CardDescription>
              {(hasApiKey && !validApiKey
                ? t("store.invalidApiKey")
                : !hasApiKey
                  ? t("store.noApiKey")
                  : "") + t("store.insertApiKey")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full gap-4">
                <Form.Field name="apikey" className="w-full">
                  <InputComponent
                    id="apikey"
                    onChange={(value) => {
                      handleInput({ target: { name: "apikey", value } });
                    }}
                    value={apikey}
                    isForm
                    password={true}
                  placeholder="Access Key 입력"
                    className="w-full"
                  />
                  <Form.Message match="valueMissing" className="field-invalid">
                    Access Key를 입력하세요
                  </Form.Message>
                </Form.Field>
              </div>
              <span className="pr-1 text-xs text-muted-foreground">
                Template Hub 접근 권한은 관리자에게 문의하세요.
              </span>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Form.Submit asChild>
              <Button
                loading={loadingApiKey}
                type="submit"
                data-testid="api-key-save-button-store"
              >
                Save
              </Button>
            </Form.Submit>
          </CardFooter>
        </Card>
      </Form.Root>
    </>
  );
};
export default StoreApiKeyFormComponent;
