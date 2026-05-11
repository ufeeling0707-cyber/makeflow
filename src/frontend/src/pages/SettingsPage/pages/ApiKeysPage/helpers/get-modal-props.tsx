export const getModalPropsApiKey = () => {
  const modalProps = {
    title: "Create API Key",
    description: "MakeFlow API 사용을 위한 비밀 Access Key를 생성합니다.",
    inputPlaceholder: "My API Key",
    buttonText: "Generate API Key",
    generatedKeyMessage: (
      <>
        {" "}
        이 비밀 Key를 안전하고 접근 가능한 곳에 저장하세요. 보안상 계정에서{" "}
        <strong>다시 확인할 수 없습니다</strong>. Key를 잃어버리면 새로 생성해야
        합니다.
      </>
    ),
    showIcon: true,
    inputLabel: (
      <>
        <span className="text-sm">설명</span>{" "}
        <span className="text-xs text-muted-foreground">(선택)</span>
      </>
    ),
  };

  return modalProps;
};
