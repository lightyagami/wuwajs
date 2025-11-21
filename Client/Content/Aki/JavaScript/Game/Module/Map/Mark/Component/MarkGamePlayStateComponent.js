"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkGamePlayStateComponent = undefined;
const DynamicMapMark_1 = require("../../../../../Core/Define/Config/DynamicMapMark");
const MapMark_1 = require("../../../../../Core/Define/Config/MapMark");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapComponent_1 = require("../../Base/MapComponent");
class MarkGamePlayStateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.EventUpdateLevelPlayState = e => {
      if (this.UQu() === e) {
        this.UpdateLevelPlayState();
      }
    };
  }
  get ComponentType() {
    return 13;
  }
  OnInit() {
    this.UpdateLevelPlayState();
  }
  OnAdd() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState);
  }
  OnRemove() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayStateChange, this.EventUpdateLevelPlayState);
  }
  UQu() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark)) {
      return e.RelativeId;
    }
  }
  UpdateLevelPlayState() {
    var t = this.UQu();
    if (t !== undefined) {
      t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t);
      if (t) {
        let e = 0;
        switch (t.PlayState) {
          case 3:
          case 4:
            e = 2;
            break;
          case 1:
          case 0:
            e = 0;
            break;
          case 2:
            e = 1;
        }
        this.ParentEntity.GetComponent(10).GamePlayState = e;
      }
    }
  }
}
exports.MarkGamePlayStateComponent = MarkGamePlayStateComponent;
//# sourceMappingURL=MarkGamePlayStateComponent.js.map