export default interface IParseMailTemplateDTO {
  template: string;
  variables: Record<string, string | number>;
}
