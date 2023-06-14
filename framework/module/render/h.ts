export type VNodeProperties = Record<string, any>;

export interface VNode {
  tag: string;
  properties: VNodeProperties | null;
  children: Array<VNode> | string | null;
}

export const h = (
  tag: string,
  properties: VNodeProperties | null,
  children: Array<VNode> | string | null
): VNode => {
  return {
    tag,
    properties,
    children,
  };
};
