import React from 'react';
import svgPaths from '../../../imports/svg-8pewmhdhsw';
import imgClaude from 'figma:asset/0733810129aa66243f42ea545a4c88ad31a0b6b5.png';
import imgGrok from 'figma:asset/ee8b82ead084d3e28f5f496b6313d2238ea6d25c.png';
import imgPerplexity from 'figma:asset/204bc07afd64d4b43951f8f7b885e0059d2a91d5.png';
import imgGemini from 'figma:asset/c25162f257582b10f1a3d550b5f7c47104837058.png';
import imgDeepseek from 'figma:asset/d6551bab6f891d08e6e96fbccb3922894b5aff64.png';
import imgMetaAi from 'figma:asset/57180907ee05436f5fd387639eaa0b27c49d1b6b.png';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

function OpenAIIcon({ size = 24, className, style }: IconProps) {
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative', flexShrink: 0, ...style }}>
      <svg className="absolute block" style={{ inset: '6.25%', width: '87.5%', height: '87.5%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <path d={svgPaths.pb3b48f2} fill="currentColor" />
      </svg>
    </div>
  );
}

function ImageIcon({ src, size = 24, className, style }: IconProps & { src: string }) {
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative', flexShrink: 0, ...style }}>
      <img alt="" src={src} className="absolute inset-0 max-w-none object-cover pointer-events-none" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

function ClaudeIcon(props: IconProps) { return <ImageIcon src={imgClaude} {...props} />; }
function GrokIcon(props: IconProps) { return <ImageIcon src={imgGrok} {...props} />; }
function PerplexityIcon(props: IconProps) { return <ImageIcon src={imgPerplexity} {...props} />; }
function GeminiIcon(props: IconProps) { return <ImageIcon src={imgGemini} {...props} />; }
function DeepseekIcon(props: IconProps) { return <ImageIcon src={imgDeepseek} {...props} />; }
function MetaAiIcon(props: IconProps) { return <ImageIcon src={imgMetaAi} {...props} />; }

const LLM_ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  gemini: GeminiIcon,
  openai: OpenAIIcon,
  grok: GrokIcon,
  claude: ClaudeIcon,
  perplexity: PerplexityIcon,
  deepseek: DeepseekIcon,
  meta: MetaAiIcon,
};

export function LlmIcon({ llmId, size = 24, className, style }: IconProps & { llmId: string }) {
  const IconComponent = LLM_ICON_MAP[llmId];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} style={style} />;
}
