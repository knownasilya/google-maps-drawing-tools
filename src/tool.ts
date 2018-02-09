/**
 * Base class for all tools
 */

/**
 * Available tool ids to use for `manager.changeTool`.
 */
export enum ToolId {
  Circle = 'circle',
  Polygon = 'polygon',
  Line = 'line',
  Rectangle = 'rectangle'
}

export interface ToolOptions {
  map: google.maps.Map;
}

export default class Tool {
  id?: ToolId;
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
