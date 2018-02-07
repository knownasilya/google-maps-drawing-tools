export interface ToolOptions {
  map: google.maps.Map;
}

export default class Tool {
  map: google.maps.Map;

  constructor(options: ToolOptions) {
    this.map = options.map;
  }

  activate() {
    // TODO
    this.map.setOptions({ draggableCursor: 'crosshair' });
  }

  deactivate() {
    // TODO
    this.map.setOptions({ draggableCursor: 'default' });
  }
}
