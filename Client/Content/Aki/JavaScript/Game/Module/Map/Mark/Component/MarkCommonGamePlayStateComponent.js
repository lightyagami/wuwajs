"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MarkCommonGamePlayStateComponent = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkCommonGamePlayStateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments), this.HasRequestGamePlay = !1, this.OnLevelPlayStateUpdate = () => {
      this.dWl()
    }, this.EventUpdateLevelPlayState = e => {
      var t = this.ParentEntity.GetComponent(15);
      t.MapMarkConfig.RelativeId === e && (e = t.MapMarkConfig, ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestSingleLevelPlayStateListAsync(e.RelativeDungeonId, e.RelativeId), this.dWl())
    }
  }
  get ComponentType() {
    return 14
  }
  OnInit() {
    this.dWl()
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.OnLevelPlayStateUpdate), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState)
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.OnLevelPlayStateUpdate), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState)
  }
  dWl() {
    const t = this.ParentEntity.GetComponent(15);
    var n = t.MapMarkConfig;
    let o = 0;
    if (ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayHide(n.RelativeDungeonId, n.RelativeId)) o = 3;
    else {
      let e = ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayComplete(n.RelativeDungeonId, n.RelativeId);
      if (29 === n.ObjectType)
        for (const r of n.AssociatedGameplayMarks) {
          const t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
          if (void 0 !== t && (e = e || ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayComplete(t.RelativeDungeonId, t.RelativeId))) break
        }
      e && (o = 2)
    }
    this.ParentEntity.GetComponent(10).GamePlayState = o
  }
  NeedRequestGamePlayState() {
    return !this.HasRequestGamePlay && 0 !== this.ParentEntity.GetComponent(15).MapMarkConfig.RelativeId
  }
}
exports.MarkCommonGamePlayStateComponent = MarkCommonGamePlayStateComponent;
//# sourceMappingURL=MarkCommonGamePlayStateComponent.js.map