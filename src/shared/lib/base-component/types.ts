export interface BaseComponentProp {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  attributes?: Record<string, string>;
  text?: string;
}
