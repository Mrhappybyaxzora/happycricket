declare module '@/components/background-animation' {
  export function BackgroundAnimation(): JSX.Element;
}

declare module '@/components/cricket-quiz' {
  export function CricketQuiz(): JSX.Element;
}

declare module '@/components/scroll-progress-bar' {
  export function ScrollProgressBar(): JSX.Element;
}

declare module '@/components/ai-analysis-typing' {
  export function AiAnalysisTyping(): JSX.Element;
}

declare module '@/components/typed-text' {
  export interface TypedTextProps {
    text: string;
    typingSpeed?: number;
    className?: string;
  }
  export function TypedText(props: TypedTextProps): JSX.Element;
} 