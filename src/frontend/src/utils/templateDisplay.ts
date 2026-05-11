export type TemplateDisplay = {
  description: string;
  icon: string;
};

const normalizeTemplateName = (name: string) =>
  name.replace(/\s+\(\d+\)$/, "").trim();

const templateDisplayOverrides: Record<string, TemplateDisplay> = {
  "Basic Prompt Chaining": {
    icon: "Workflow",
    description:
      "여러 프롬프트를 순서대로 연결해 이전 결과를 다음 단계 입력으로 넘기는 흐름입니다.",
  },
  "Basic Prompting": {
    icon: "MessageSquareText",
    description: "OpenAI 모델로 기본적인 프롬프트 활용을 시작합니다.",
  },
  "Blog Writer": {
    icon: "PenLine",
    description:
      "지시사항과 참고 글을 바탕으로 맞춤형 블로그 초안을 자동 생성합니다.",
  },
  "Custom Component Generator": {
    icon: "Code2",
    description:
      "Langflow 규격에 맞춘 Custom Component 코드를 구조적으로 생성합니다.",
  },
  "Document Q&A": {
    icon: "FileQuestion",
    description:
      "PDF 문서를 읽고 문서 내용에 기반한 질문에 답변하는 Q&A 흐름입니다.",
  },
  "Financial Report Parser": {
    icon: "ChartColumn",
    description:
      "재무 보고서에서 Gross Profit, EBITDA, Net Income 등 주요 지표를 추출해 분석하기 쉽게 정리합니다.",
  },
  "Hybrid Search RAG": {
    icon: "SearchCheck",
    description: "Vector DB와 Hybrid Search를 함께 활용하는 RAG 예제입니다.",
  },
  "Image Sentiment Analysis": {
    icon: "Image",
    description:
      "이미지를 분석해 긍정, 부정, 중립 감성으로 분류하는 이미지 감성 분석 흐름입니다.",
  },
  "Instagram Copywriter": {
    icon: "Instagram",
    description:
      "Instagram 게시글 문구와 이미지 프롬프트를 생성해 소셜 콘텐츠 제작을 돕습니다.",
  },
  "Invoice Summarizer": {
    icon: "ReceiptText",
    description:
      "송장 내용을 읽고 핵심 정보를 요약하는 AI 회계 Agent 흐름입니다.",
  },
  "Knowledge Base": {
    icon: "LibraryBig",
    description:
      "Knowledge Base에서 관련 문서를 검색해 답변에 필요한 근거를 가져옵니다.",
  },
  "Market Research": {
    icon: "Building2",
    description:
      "기업 정보를 조사하고 핵심 비즈니스 데이터를 추출해 구조화합니다.",
  },
  "Meeting Summary": {
    icon: "ClipboardList",
    description:
      "AssemblyAI와 OpenAI를 활용해 회의 내용을 전사하고 핵심 내용을 요약합니다.",
  },
  "Memory Chatbot": {
    icon: "MessagesSquare",
    description:
      "이전 대화를 저장하고 참조해 대화 맥락을 유지하는 챗봇을 만듭니다.",
  },
  "News Aggregator": {
    icon: "Newspaper",
    description: "웹페이지에서 뉴스와 정보를 수집해 정리하는 Agent 흐름입니다.",
  },
  "NVIDIA RTX Remix": {
    icon: "Cpu",
    description:
      "NVIDIA RTX Remix Toolkit REST API와 문서를 활용하는 Agent입니다.",
  },
  "Pokédex Agent": {
    icon: "Search",
    description:
      "Pokédex API를 활용해 Pokémon 정보를 조사하는 전문 Agent입니다.",
  },
  "Portfolio Website Code Generator": {
    icon: "PanelTop",
    description:
      "PDF 또는 TXT 이력서를 구조화된 JSON으로 변환하고 포트폴리오 웹사이트 HTML을 생성합니다.",
  },
  "Price Deal Finder": {
    icon: "ShoppingCart",
    description: "여러 이커머스 플랫폼에서 상품 가격을 검색하고 비교합니다.",
  },
  "Research Agent": {
    icon: "FileSearch",
    description:
      "조사 계획을 세우고 웹 검색을 수행한 뒤 결과를 종합 보고서로 정리하는 Agent입니다.",
  },
  "Research Translation Loop": {
    icon: "Languages",
    description:
      "검색 결과를 반복 처리하고 각 결과를 자동으로 Portuguese로 번역합니다.",
  },
  "SEO Keyword Generator": {
    icon: "Megaphone",
    description:
      "제품 정보, 고객 Pain Point, 고객 프로필을 바탕으로 SEO 키워드를 생성합니다.",
  },
  "SaaS Pricing": {
    icon: "Calculator",
    description:
      "비용, 목표 마진, 구독자 수를 바탕으로 SaaS 구독 가격을 단계적으로 계산합니다.",
  },
  "Search agent": {
    icon: "Globe",
    description: "웹에서 필요한 정보를 검색하는 간단한 Search Agent입니다.",
  },
  "Sequential Tasks Agents": {
    icon: "ListChecks",
    description:
      "미리 정의한 순서에 따라 여러 작업을 체계적으로 실행하는 Agent 흐름입니다.",
  },
  "Simple Agent": {
    icon: "Bot",
    description: "간단하지만 강력한 기본 Agent 템플릿입니다.",
  },
  "Social Media Agent": {
    icon: "UsersRound",
    description:
      "Apify Actors를 Agent 도구로 활용해 소셜 미디어 프로필을 검색하고 분석합니다.",
  },
  "Text Sentiment Analysis": {
    icon: "SmilePlus",
    description:
      "여러 파일 형식의 텍스트 데이터를 불러와 구조화하고 감성을 분류합니다.",
  },
  "Travel Planning Agents": {
    icon: "Plane",
    description:
      "전문 Agent를 활용해 개인화된 여행 일정과 계획을 만드는 챗봇입니다.",
  },
  "Twitter Thread Generator": {
    icon: "MessagesSquare",
    description:
      "구조화된 입력을 바탕으로 브랜드 톤을 유지하는 Twitter thread를 생성합니다.",
  },
  "Vector Store RAG": {
    icon: "Database",
    description:
      "지식베이스 구축을 위한 데이터를 탑재하고 RAG 문맥으로 활용합니다.",
  },
  "YouTube Analysis": {
    icon: "Youtube",
    description:
      "YouTube 댓글과 transcript를 추출해 감성 패턴과 콘텐츠 주제를 분석합니다.",
  },
};

export const getTemplateDisplay = (
  name: string,
  fallback: TemplateDisplay,
): TemplateDisplay =>
  templateDisplayOverrides[normalizeTemplateName(name)] ?? fallback;

export const getTemplateIcon = (name: string, fallbackIcon = "Workflow") =>
  getTemplateDisplay(name, { icon: fallbackIcon, description: "" }).icon;

export const templateIconTileClassName =
  "border border-sky-100 bg-sky-50 text-sky-700";
