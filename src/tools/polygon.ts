import Tool, { ToolOptions } from '../tool';

export interface PolygonToolOptions extends ToolOptions {
  data: google.maps.Data;
}

export type DrawingMode = 'Point' | 'LineString' | 'Polygon' | null;

export default class PolygonTool extends Tool {
  id: string;
  data: google.maps.Data;

  private dataId: DrawingMode;
  private dataStyle: google.maps.Data.StyleOptions;
  private dataListener?: google.maps.MapsEventListener;

  constructor(options: PolygonToolOptions) {
    super(options);

    this.id = 'polygon';
    this.data = options.data;

    this.dataId = 'Polygon';
    this.dataStyle = {
      strokeColor: '#374046',
      fillColor: '#374046',
      fillOpacity: 0.5,
      strokeWeight: 2
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

  setupListeners() {
    let listener = this.data.addListener('addfeature', () => {
      this.deactivate();
    });

    this.dataListener = listener;
  }

  cleanupListeners() {
    if (this.dataListener) {
      google.maps.event.removeListener(this.dataListener);
    }
  }
}
