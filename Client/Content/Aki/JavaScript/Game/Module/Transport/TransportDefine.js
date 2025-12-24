"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoadwayAutopilotSprintConfig = exports.getRoadZoneData = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
function getRoadZoneData(e, t = -1) {
  let o = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.RoadZonePath);
  if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
    o = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.RoadZonePath);
  }
  var r = UE.BlueprintPathsLibrary.FileExists(o);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Level", 61, "读取RoadZone文件。", ["Path", o]);
  }
  if (!r) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 61, "[TransportNetwork] 不存在RoadZone文件。", ["Path", o]);
    }
    return [];
  }
  var r = (0, puerts_1.$ref)(undefined);
  UE.KuroStaticLibrary.LoadFileToString(r, o);
  r = (0, puerts_1.$unref)(r);
  var i = JSON.parse(r);
  if (!i || !i.hasOwnProperty(e)) {
    return [];
  }
  let u = [];
  if (t === -1) {
    for (const l of Object.keys(i[e])) {
      u.push(...i[e][l]);
    }
  } else {
    u = i[e][t];
  }
  return u;
}
function getRoadwayAutopilotSprintConfig(e) {
  if (e && e.bEnable) {
    switch (e.PavedRoadConfig) {
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