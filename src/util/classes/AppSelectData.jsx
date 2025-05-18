export class AppSelectData {
  constructor(key, startIcon, endIcon, value, onClickFn = () => {}) {
    this.key = key;
    this.startIcon = startIcon;
    this.endIcon = endIcon;
    this.value = value;
    this.onClickFn = onClickFn;
  }
}
