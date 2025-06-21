"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleLevelDecreaseView = void 0;
const UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LEVEL_ANIM_DURATION = 500,
  LEVEL_ANIM_EXPIRED_TIME = 5e3;
class MoraleLevelDecreaseView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.tL1 = void 0, this.S1u = 1, this.M1u = 1, this.Wft = 1, this.Sdu = 1, this.E1u = 0, this.dHl = !1, this.I1u = !1, this.f$a = 0, this.T1u = () => {
      this.E1u < 0 ? this.dHl = !0 : this.svi()
    }, this.b1u = () => {
      this.I1u && 1 < ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel() && UiManager_1.UiManager.OpenView("MoraleIndomitableLevelView")
    }, this.AMe = () => {
      this.svi()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText]
    ]
  }
  OnStart() {
    this.tL1 = this.GetArtText(0), this.S1u = ModelManager_1.ModelManager.MoraleBattleModel.GetLastMoraleLevel(), this.M1u = 1, this.tL1?.SetText(this.S1u.toString()), this.Wft = this.S1u, this.Sdu = this.Wft;
    var e = this.M1u - this.S1u;
    0 != e && (this.E1u = e / LEVEL_ANIM_DURATION)
  }
  OnBeforeDestroy() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe), this.UiViewSequence?.AddSequenceFinishEvent("Start", this.T1u), this.UiViewSequence?.AddSequenceFinishEvent("Close", this.b1u)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe), this.UiViewSequence.RemoveSequenceFinishEvent("Start", this.T1u), this.UiViewSequence?.RemoveSequenceFinishEvent("Close", this.b1u)
  }
  OnTick(e) {
    var t;
    this.dHl && (MoraleLevelDecreaseView.Ult.Start(), t = e * this.E1u, this.f$a += e, this.Sdu += t, this.Wft = Math.max(this.M1u, Math.round(this.Sdu)), this.tL1?.SetText(this.Wft.toString()), (this.Wft === this.M1u || this.f$a > LEVEL_ANIM_EXPIRED_TIME) && (this.E1u = 0, this.dHl = !1, this.I1u = !0, this.svi()), MoraleLevelDecreaseView.Ult.Stop())
  }
  svi() {
    this.dHl = !1, this.IsHideOrHiding || this.CloseMe()
  }
}(exports.MoraleLevelDecreaseView = MoraleLevelDecreaseView).Ult = Stats_1.Stat.Create("[MoraleLevelDecreaseView]OnTick");
//# sourceMappingURL=MoraleLevelDecreaseView.js.map