import Tool from './tool';
import Circle from './tools/circle';

export interface ManagerOptions {
  map?: any;
  data?: google.maps.Data;
}

export enum ToolId {
  Circle = 'circle'
}

export default class DrawingManager {
  map: any;
  data: google.maps.Data;
  tool?: Tool;

  constructor(options: ManagerOptions = {}) {
    this.map = options.map;
    this.data = options.data || new google.maps.Data();
  }

  changeTool(toolId: ToolId) {
    this.tool = this.createTool(toolId);
    this.data.setDrawingMode(null);
    this.tool.activate();
  }

  createTool(toolId: ToolId): Tool {
    switch (toolId) {
      case ToolId.Circle: {
        return new Circle({
          map: this.map,
          data: this.data
        });
      }
    }
  }
}
