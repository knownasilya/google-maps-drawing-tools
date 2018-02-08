import Tool, { ToolOptions } from '../tool';
import overlayToFeature from '../utils/overlay-to-feature';

export interface CircleToolOptions extends ToolOptions {
  data: google.maps.Data;
  style?: CircleStyles;
}

export interface CircleStyles {
  strokeColor: string;
  fillColor: string;
  fillOpacity: number;
  strokeWeight: number;
}

export default class CircleTool extends Tool {
  id: string;
  data: google.maps.Data;

  private dmId: google.maps.drawing.OverlayType;
  private dm: google.maps.drawing.DrawingManager;
  private dmOptions: google.maps.CircleOptions;
  private dmListener?: google.maps.MapsEventListener;

  constructor(options: CircleToolOptions) {
    super(options);

    this.id = 'circle';
    this.data = options.data;

    this.dmId = google.maps.drawing.OverlayType.CIRCLE;
    this.dm = new google.maps.drawing.DrawingManager({
      drawingControl: false
    });
    this.dmOptions = options.style || {
      strokeColor: '#374046',
      fillColor: '#374046',
      fillOpacity: 0.5,
      strokeWeight: 2
    };
  }

  activate() {
    super.activate();

    let dm = this.dm;

    dm.setDrawingMode(this.dmId);
    dm.setOptions({
      [`${this.dmId}Options`]: this.dmOptions
    });
    dm.setMap(this.map);

    this.setupListeners();
  }

  deactivate() {
    super.deactivate();

    let dm = this.dm;

    // "casting" to `any` because the typings are wrong in googlemaps
    dm.setDrawingMode(null as any);
    dm.setMap(null);

    this.cleanupListeners();
  }

  setupListeners() {
    let dm = this.dm;
    let listener = dm.addListener('overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
      let feature = overlayToFeature(event.overlay);

      if (event.overlay instanceof google.maps.Circle || event.overlay instanceof google.maps.Rectangle) {
        event.overlay.setMap(null);
      }

      this.data.add(feature);
      this.deactivate();
    });

    this.dmListener = listener;
  }

  cleanupListeners() {
    if (this.dmListener) {
      google.maps.event.removeListener(this.dmListener);
    }
  }
}
