"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToDyMarkEntity = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapController_1 = require("../../Map/Controller/MapController");
const MapDefine_1 = require("../../Map/MapDefine");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const SkipTask_1 = require("./SkipTask");
class SkipToDyMarkEntity extends SkipTask_1.SkipTask {
  OnRun(e, r) {
    var e = Number(e);
    var r = Number(r);
    var a = ModelManager_1.ModelManager.WorldMapModel.SearchMarkMapConfigId(e);
    if (ModelManager_1.ModelManager.CreatureModel.GetEntityData(r, a)?.Transform?.Pos) {
      e = new MapDefine_1.DynamicMarkCreateInfo({
        TrackTarget: r,
        MarkConfigId: e,
        MarkType: 7,
        DestroyOnUnTrack: true,
        MapAndDungeonInfo: {
          MapConfigId: a
        }
      });
      e = ModelManager_1.ModelManager.MapModel.CreateMapMark(e);
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: 7,
        MarkId: e,
        Track: true,
        TrackMode: 0
      });
      e = {
        MarkId: e,
        MarkType: 7
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SkipInterface", 43, "实体或实体位置为空", ["entityId", r], ["mapId", a]);
    }
    this.Finish();
  }
}
exports.SkipToDyMarkEntity = SkipToDyMarkEntity;
//# sourceMappingURL=SkipToDyMarkEntity.js.map