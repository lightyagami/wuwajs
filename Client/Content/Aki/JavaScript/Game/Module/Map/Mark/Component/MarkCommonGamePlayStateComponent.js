"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkCommonGamePlayStateComponent = undefined;
const DynamicMapMark_1 = require("../../../../../Core/Define/Config/DynamicMapMark");
const MapMark_1 = require("../../../../../Core/Define/Config/MapMark");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapComponent_1 = require("../../Base/MapComponent");
class MarkCommonGamePlayStateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.HasRequestGamePlay = false;
    this.OnLevelPlayStateUpdate = () => {
      this.dWl();
    };
    this.EventUpdateLevelPlayState = e => {
      var t = this.GetRelativeId();
      var n = this.GetRelativeDungeonId();
      if (t === e && n !== undefined) {
        ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestSingleLevelPlayStateListAsync(n, t);
        this.dWl();
      }
    };
  }
  get ComponentType() {
    return 14;
  }
  OnInit() {
    this.dWl();
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.OnLevelPlayStateUpdate);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelPlayRewardDetailUpdate, this.OnLevelPlayStateUpdate);
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.OnLevelPlayStateUpdate);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelPlayRewardDetailUpdate, this.OnLevelPlayStateUpdate);
  }
  dWl() {
    var n = this.GetRelativeId();
    var a = this.GetRelativeDungeonId();
    if (n !== undefined && a !== undefined) {
      let t = 0;
      if (ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayHide(a, n)) {
        t = 3;
      } else {
        let e = ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayComplete(a, n);
        a = this.ParentEntity.GetComponent(15)?.MapMarkConfig;
        if (a && a.ObjectType === 29) {
          for (const i of a.AssociatedGameplayMarks) {
            var r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i);
            if (r !== undefined && (e = e || ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayComplete(r.RelativeDungeonId, r.RelativeId))) {
              break;
            }
          }
        }
        if (e) {
          t = 2;
        }
      }
      this.ParentEntity.GetComponent(10).GamePlayState = t;
    }
  }
  GetRelativeId() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark)) {
      return e.RelativeId;
    }
  }
  GetRelativeDungeonId() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark)) {
      return e.RelativeDungeonId;
    }
  }
  NeedRequestGamePlayState() {
    return !this.HasRequestGamePlay && (this.GetRelativeId() ?? 0) !== 0;
  }
}
exports.MarkCommonGamePlayStateComponent = MarkCommonGamePlayStateComponent;
//# sourceMappingURL=MarkCommonGamePlayStateComponent.js.map