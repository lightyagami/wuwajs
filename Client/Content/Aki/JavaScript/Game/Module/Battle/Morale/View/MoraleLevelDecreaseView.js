"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleLevelDecreaseView = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LEVEL_ANIM_DURATION = 500;
const LEVEL_ANIM_EXPIRED_TIME = 5000;
class MoraleLevelDecreaseView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.RL1 = undefined;
    this.Ayu = 1;
    this.Pyu = 1;
    this.Wft = 1;
    this.hLu = 1;
    this.xyu = 0;
    this.dHl = false;
    this.Uyu = false;
    this.f$a = 0;
    this.Dyu = () => {
      if (this.xyu < 0) {
        this.dHl = true;
      } else {
        this.svi();
      }
    };
    this.Byu = () => {
      if (this.Uyu && ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel() > 1) {
        UiManager_1.UiManager.OpenView("MoraleIndomitableLevelView");
      }
    };
    this.AMe = () => {
      this.svi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText]];
  }
  OnStart() {
    this.RL1 = this.GetArtText(0);
    this.Ayu = ModelManager_1.ModelManager.MoraleBattleModel.GetLastMoraleLevel();
    this.Pyu = 1;
    this.RL1?.SetText(this.Ayu.toString());
    this.Wft = this.Ayu;
    this.hLu = this.Wft;
    var e = this.Pyu - this.Ayu;
    if (e != 0) {
      this.xyu = e / LEVEL_ANIM_DURATION;
    }
  }
  OnBeforeDestroy() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    this.UiViewSequence?.AddSequenceFinishEvent("Start", this.Dyu);
    this.UiViewSequence?.AddSequenceFinishEvent("Close", this.Byu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    this.UiViewSequence.RemoveSequenceFinishEvent("Start", this.Dyu);
    this.UiViewSequence?.RemoveSequenceFinishEvent("Close", this.Byu);
  }
  OnTick(e) {
    var t;
    if (this.dHl) {
      MoraleLevelDecreaseView.Ult.Start();
      t = e * this.xyu;
      this.f$a += e;
      this.hLu += t;
      this.Wft = Math.max(this.Pyu, Math.round(this.hLu));
      this.RL1?.SetText(this.Wft.toString());
      if (this.Wft === this.Pyu || this.f$a > LEVEL_ANIM_EXPIRED_TIME) {
        this.xyu = 0;
        this.dHl = false;
        this.Uyu = true;
        this.svi();
      }
      MoraleLevelDecreaseView.Ult.Stop();
    }
  }
  svi() {
    this.dHl = false;
    if (!this.IsHideOrHiding) {
      this.CloseMe();
    }
  }
}
(exports.MoraleLevelDecreaseView = MoraleLevelDecreaseView).Ult = Stats_1.Stat.Create("[MoraleLevelDecreaseView]OnTick");
//# sourceMappingURL=MoraleLevelDecreaseView.js.map