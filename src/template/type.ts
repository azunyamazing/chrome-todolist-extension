export interface Component {
  template: string;
  state?: object;
  methods?: Record<string, () => any>;
}
