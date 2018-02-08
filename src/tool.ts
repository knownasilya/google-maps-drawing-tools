export interface ToolOptions {
  map: google.maps.Map;
}

export default class Tool {
  map: google.maps.Map | null;

  constructor(options: ToolOptions) {
    this.map = options.map;
  }

  activate() {
    // TODO
    if (this.map) {
      this.map.setOptions({ draggableCursor: 'crosshair' });
    }
  }

  deactivate() {
    // TODO
    if (this.map) {
      this.map.setOptions({ draggableCursor: 'default' });
    }
  }
}
