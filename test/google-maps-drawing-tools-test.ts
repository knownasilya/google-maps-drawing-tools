import DrawingManager, { ToolId } from 'google-maps-drawing-tools';
import Tool from '../src/tool';
import CircleTool from '../src/tools/circle';

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
