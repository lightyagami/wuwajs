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
    this.bvu = 1;
    this.Rvu = 1;
    this.Wft = 1;
    this.GRu = 1;
    this.wvu = 0;
    this.dHl = false;
    this.Lvu = false;
    this.f$a = 0;
    this.Avu = () => {
      if (this.wvu < 0) {
        this.dHl = true;
      } else {
        this.svi();
      }
    };
    this.Pvu = () => {
      if (this.Lvu && ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel() > 1) {
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
    this.bvu = ModelManager_1.ModelManager.MoraleBattleModel.GetLastMoraleLevel();
    this.Rvu = 1;
    this.RL1?.SetText(this.bvu.toString());
    this.Wft = this.bvu;
    this.GRu = this.Wft;
    var e = this.Rvu - this.bvu;
    if (e != 0) {
      this.wvu = e / LEVEL_ANIM_DURATION;
    }
  }
  OnBeforeDestroy() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    this.UiViewSequence?.AddSequenceFinishEvent("Start", this.Avu);
    this.UiViewSequence?.AddSequenceFinishEvent("Close", this.Pvu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
    this.UiViewSequence.RemoveSequenceFinishEvent("Start", this.Avu);
    this.UiViewSequence?.RemoveSequenceFinishEvent("Close", this.Pvu);
  }
  OnTick(e) {
    var t;
    if (this.dHl) {
      MoraleLevelDecreaseView.Ult.Start();
      t = e * this.wvu;
      this.f$a += e;
      this.GRu += t;
      this.Wft = Math.max(this.Rvu, Math.round(this.GRu));
      this.RL1?.SetText(this.Wft.toString());
      if (this.Wft === this.Rvu || this.f$a > LEVEL_ANIM_EXPIRED_TIME) {
        this.wvu = 0;
        this.dHl = false;
        this.Lvu = true;
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