import Tool, { ToolId, ToolOptions } from '../tool';

export interface PolygonToolOptions extends ToolOptions {
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

  constructor(options: PolygonToolOptions) {
    super(options);

    this.id = ToolId.Polygon;
    this.data = options.data;

    // private
    this.dataId = 'Polygon';
    this.dataStyle = options.style || {
      strokeColor: '#374046',
      fillColor: '#374046',
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false
    };
  }

  activate() {
    super.activate();

    this.data.setDrawingMode(this.dataId);
    this.data.setStyle(this.dataStyle);

    this.setupListeners();
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

    this.dataListener = listener;
  }

  private cleanupListeners() {
    this.feature = undefined;

    if (this.dataListener) {
      google.maps.event.removeListener(this.dataListener);
    }
  }
}
