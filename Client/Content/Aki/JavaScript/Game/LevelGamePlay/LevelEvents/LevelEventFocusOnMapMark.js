"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventFocusOnMapMark = undefined;
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WorldMapController_1 = require("../../Module/WorldMap/WorldMapController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFocusOnMapMark extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    var a = e;
    if (a) {
      switch (a.MapMarkType.Type) {
        case IAction_1.EMapMarkType.Custom:
          this.vu_(a.MapMarkType);
          break;
        case IAction_1.EMapMarkType.Quest:
          this.yu_(a.MapMarkType);
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 63, "[LevelEventFocusOnMapMark]未定义类型", ["MapMarkType", a.MapMarkType.Type]);
          }
          this.Finish();
      }
    } else {
      this.Finish();
    }
  }
  vu_(e) {
    var e = e.MarkId;
    var r = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 63, "[LevelEventFocusOnMapMark]HandleCustomMapFocus->找不到对应的标记配置", ["markId", e]);
      }
    } else {
      e = {
        MarkId: e,
        MarkType: r.ObjectType
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e);
    }
    this.Finish();
  }
  yu_(e) {
    const r = e.QuestId;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkByQuestId(r);
    if (e === undefined) {
      WorldMapController_1.WorldMapController.StartListenChildQuestNodeStatusChangedAndOpenWorldMap(r);
    } else {
      e = {
        MarkId: e.MarkId,
        MarkType: e.MarkType
      };
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapOpenedForQuestMapFocus, r);
      });
    }
    this.Finish();
  }
}
exports.LevelEventFocusOnMapMark = LevelEventFocusOnMapMark;
//# sourceMappingURL=LevelEventFocusOnMapMark.js.map