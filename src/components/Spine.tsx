import { forwardRef, Ref, useImperativeHandle } from 'react';
import { SpinePlayer, UseSpineOption, useSpine } from '@/hooks/useSpine';

export type { SpinePlayer };

export interface SpineComponentProps extends UseSpineOption, React.ComponentProps<'div'> { }

function SpineComponent(
  { jsonUrl, atlasUrl, animation, config, ...divProps }: SpineComponentProps,
  ref: Ref<SpinePlayer | undefined>
) {
  const [nodeRef, spine] = useSpine({ jsonUrl, atlasUrl, animation, config });
  useImperativeHandle(ref, () => spine, [spine]);
  return <div {...divProps} ref={nodeRef} />;
}

export const Spine = forwardRef(SpineComponent);
