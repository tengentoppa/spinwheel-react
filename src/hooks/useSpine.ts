import { useLayoutEffect, useRef, useState } from 'react';
import { SpinePlayer, SpinePlayerConfig } from '@esotericsoftware/spine-player';

interface RequiredSpinePlayerConfig extends Required<Pick<SpinePlayerConfig, 'jsonUrl' | 'atlasUrl' | 'animation'>> {}

export type SpineConfig = Partial<Omit<SpinePlayerConfig, keyof RequiredSpinePlayerConfig>>;

export interface UseSpineOption extends RequiredSpinePlayerConfig {
  config?: SpineConfig;
}

export type { SpinePlayer };

/**
 * Tips:
 * When you assign the config.
 * - If it is static, define the config outside of the component or hook
 * - If it is dynamic store the config as useState or useMemo
 */
export function useSpine({ jsonUrl, atlasUrl, animation, config }: UseSpineOption) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<SpinePlayer>();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const player = new SpinePlayer(container, {
      jsonUrl,
      atlasUrl,
      animation,
      alpha: true,
      showControls: false,
      showLoading: false,
      preserveDrawingBuffer: true,
      ...config
    });

    setPlayer(player);

    return () => {
      player.dispose();
    };
  }, [jsonUrl, atlasUrl, animation, config]);

  return [containerRef, player] as const;
}
