import guid from './utils/guid';

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

/**
 * Object representing the shape in progress or completed.
 *
 * When the shape is completed, this object will have it's `feature` attribute
 * filled in.
 */
export interface Shape {
  id: string;
  toolType?: ToolId;
  feature?: google.maps.Data.Feature;
}

export interface ToolOptions {
  map: google.maps.Map;
}

export default abstract class Tool {
  map: google.maps.Map | null;
  id?: ToolId;
  shape?: Shape;

  private _feature?: google.maps.Data.Feature;

  constructor(options: ToolOptions) {
    this.map = options.map;
  }

  activate() {
    // TODO
    if (this.map) {
      this.map.setOptions({ draggableCursor: 'crosshair' });
    }

    this.shape = {
      id: guid(),
      toolType: this.id,
      feature: this.feature
    };

    return this.shape;
  }

  deactivate() {
    // TODO
    if (this.map) {
      this.map.setOptions({ draggableCursor: 'default' });
    }
  }

  set feature(feature: google.maps.Data.Feature | undefined) {
    if (feature && this.shape) {
      feature.setProperty('id', this.shape.id);
    }

    if (this.shape) {
      this.shape.feature = feature;
    }

    this._feature = feature;
  }

  get feature(): google.maps.Data.Feature | undefined {
    return this._feature;
  }
}
