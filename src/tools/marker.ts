import Tool, { Shape, ToolId, ToolOptions } from '../tool';

export interface MarkerToolOptions extends ToolOptions {
  data: google.maps.Data;
  style?: google.maps.Data.StyleOptions;
}

export type DrawingMode = 'Point' | 'LineString' | 'Polygon' | null;

export default class PolygonTool extends Tool {
  id: ToolId;
  data: google.maps.Data;

  private dataId: DrawingMode;
  private dataStyle: google.maps.Data.StyleOptions;
  private dataListener?: google.maps.MapsEventListener;

  constructor(options: MarkerToolOptions) {
    super(options);

    this.id = ToolId.Marker;
    this.data = options.data;

    // private
    this.dataId = 'Point';
    this.dataStyle = options.style || {
      clickable: false
    };
  }

  activate(): Shape {
    let shape = super.activate();

    this.data.setDrawingMode(this.dataId);
    this.data.setStyle(this.dataStyle);

    this.setupListeners();

    return shape;
  }

  deactivate() {
    super.deactivate();

    this.data.setDrawingMode(null);
    this.cleanupListeners();
  }

  private setupListeners() {
    let listener = this.data.addListener('addfeature', ({ feature }) => {
      this.feature = feature;
      this.deactivate();
    });

    this.feature = undefined;
    this.dataListener = listener;
  }

  private cleanupListeners() {
    if (this.dataListener) {
      google.maps.event.removeListener(this.dataListener);
    }
  }
}
