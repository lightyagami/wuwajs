"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleIndomitableLevelView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  DELAY_CLOSE_TIME = 2e3,
  DELAY_EVENT_TIME = 1500;
class MoraleIndomitableLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.tL1 = void 0, this.xOi = void 0, this.GOe = void 0, this.AMe = () => {
      this.svi()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText]
    ]
  }
  OnStart() {
    var e;
    this.tL1 = this.GetArtText(0), this.tL1 && (e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel(), this.tL1.SetText(e.toString()))
  }
  OnBeforeShow() {
    this.v1u()
  }
  OnAfterShow() {
    this.Rbt()
  }
  OnBeforeDestroy() {
    this.vN1(), this.y1u()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe)
  }
  svi() {
    this.IsHideOrHiding || this.CloseMe()
  }
  Rbt() {
    this.vN1(), this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
      this.xOi = void 0, this.svi()
    }, DELAY_CLOSE_TIME)
  }
  v1u() {
    this.y1u(), this.GOe = TimerSystem_1.TimerSystem.Delay(() => {
      this.GOe = void 0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim)
    }, DELAY_EVENT_TIME)
  }
  vN1() {
    this.xOi && (TimerSystem_1.TimerSystem.Remove(this.xOi), this.xOi = void 0)
  }
  y1u() {
    this.GOe && (TimerSystem_1.TimerSystem.Remove(this.GOe), this.GOe = void 0)
  }
}
exports.MoraleIndomitableLevelView = MoraleIndomitableLevelView;
//# sourceMappingURL=MoraleIndomitableLevelView.js.map