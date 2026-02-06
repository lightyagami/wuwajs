"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoadwayAutopilotSprintConfig = exports.getRoadZoneData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const RoadZoneConfigByMapId_1 = require("../../../Core/Define/ConfigQuery/RoadZoneConfigByMapId");
function getRoadZoneData(o) {
  var e = [];
  var t = RoadZoneConfigByMapId_1.configRoadZoneConfigByMapId.GetConfig(o);
  if (t) {
    for (const r of t.PbDataId) {
      e.push(Number(r));
    }
  }
  if (e.length === 0 && Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Level", 61, "读取RoadZone文件为空", ["MapId", o]);
  }
  return e;
}
function getRoadwayAutopilotSprintConfig(o) {
  if (o && o.bEnable) {
    switch (o.PavedRoadConfig) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
    }
  }
  return 0;
}
exports.getRoadZoneData = getRoadZoneData;
exports.getRoadwayAutopilotSprintConfig = getRoadwayAutopilotSprintConfig; //# sourceMappingURL=TransportDefine.js.map