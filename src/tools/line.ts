import Tool, { ToolOptions } from '../tool';

export interface LineToolOptions extends ToolOptions {
  data: google.maps.Data;
  style?: google.maps.Data.StyleOptions;
}

export type DrawingMode = 'Point' | 'LineString' | 'Polygon' | null;

export default class LineTool extends Tool {
  id: string;
  data: google.maps.Data;

  private dataId: DrawingMode;
  private dataStyle: google.maps.Data.StyleOptions;
  private dataListener?: google.maps.MapsEventListener;

  constructor(options: LineToolOptions) {
    super(options);

    this.id = 'line';
    this.data = options.data;

    this.dataId = 'LineString';
    this.dataStyle = options.style || {
      strokeColor: '#374046',
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
