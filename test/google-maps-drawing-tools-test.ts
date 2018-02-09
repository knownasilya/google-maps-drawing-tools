import DrawingManager from 'google-maps-drawing-tools';
import Tool, { ToolId } from '../src/tool';
import CircleTool from '../src/tools/circle';
import LineTool from '../src/tools/line';
import PolygonTool from '../src/tools/polygon';
import RectangleTool from '../src/tools/rectangle';

let element = document.getElementById('map');
let map = new google.maps.Map(element, {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
});

QUnit.module('google-maps-drawing-tools tests');

QUnit.test('instantiates', assert => {
  let manager = new DrawingManager({ map });

  assert.ok(manager instanceof DrawingManager, 'Correct instance');
  assert.ok(manager.data instanceof google.maps.Data, 'Has an instantiated maps.Data object');
});

QUnit.test('change tool to circle activates the circle tool', assert => {
  let manager = new DrawingManager({ map });

  manager.changeTool(ToolId.Circle);

  assert.ok(manager.tool, 'Tool object is set');
  assert.ok(manager.tool instanceof Tool, 'Is a tool class');
  assert.ok(manager.tool instanceof CircleTool, 'Is a circle tool class');
});

QUnit.test('change tool to polygon activates the polygon tool', assert => {
  let manager = new DrawingManager({ map });

  manager.changeTool(ToolId.Polygon);

  assert.ok(manager.tool, 'Tool object is set');
  assert.ok(manager.tool instanceof Tool, 'Is a tool class');
  assert.ok(manager.tool instanceof PolygonTool, 'Is a polygon tool class');
});

QUnit.test('change tool to line activates the line tool', assert => {
  let manager = new DrawingManager({ map });

  manager.changeTool(ToolId.Line);

  assert.ok(manager.tool, 'Tool object is set');
  assert.ok(manager.tool instanceof Tool, 'Is a tool class');
  assert.ok(manager.tool instanceof LineTool, 'Is a line tool class');
});

QUnit.test('change tool to rectangle activates the rectangle tool', assert => {
  let manager = new DrawingManager({ map });

  manager.changeTool(ToolId.Rectangle);

  assert.ok(manager.tool, 'Tool object is set');
  assert.ok(manager.tool instanceof Tool, 'Is a tool class');
  assert.ok(manager.tool instanceof RectangleTool, 'Is a rectangle tool class');
});
