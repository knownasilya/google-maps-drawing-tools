import Tool from './tool';
import Circle from './tools/circle';
import Line from './tools/line';
import Polygon from './tools/polygon';
import Rectangle from './tools/rectangle';

export interface ManagerOptions {
  /**
   * Recommended to set here, but can also be set via `setMap`.
   */
  map?: google.maps.Map;
  /**
   * Pass in your own `google.maps.Data` instance to put the drawings
   * on.
   */
  data?: google.maps.Data;
}

export enum ToolId {
  Circle = 'circle',
  Polygon = 'polygon',
  Line = 'line',
  Rectangle = 'rectangle'
}

export default class DrawingManager {
  map: any;
  data: google.maps.Data;
  tool?: Tool;

  constructor(options: ManagerOptions = {}) {
    this.map = options.map;
    this.data = options.data || new google.maps.Data();

    this.data.setMap(this.map);
  }

  /**
   * Change to a specified tool which will be used to draw on the map.
   *
   * @param toolId The identifier of the tool to change to
   */
  changeTool(toolId: ToolId | null) {
    this.tool = this.createTool(toolId);
    this.data.setDrawingMode(null);

    if (this.tool) {
      this.tool.activate();
    }
  }

  /**
   * Create a tool based on it's id.
   *
   * @param toolId The tool to create, by id
   */
  createTool(toolId: ToolId | null): (Tool | undefined) {
    switch (toolId) {
      case ToolId.Circle: {
        return new Circle({
          map: this.map,
          data: this.data
        });
      }

      case ToolId.Polygon: {
        return new Polygon({
          map: this.map,
          data: this.data
        });
      }

      case ToolId.Line: {
        return new Line({
          map: this.map,
          data: this.data
        });
      }

      case ToolId.Rectangle: {
        return new Rectangle({
          map: this.map,
          data: this.data
        });
      }
    }

    return undefined;
  }

  /**
   * Show or hide the drawings by changing the map.
   *
   * @param map Google Map instance on which to show the drawings
   */
  setMap(map: google.maps.Map | null) {
    this.map = map;
    this.data.setMap(map);

    if (this.tool) {
      this.tool.map = map;
    }
  }
}
