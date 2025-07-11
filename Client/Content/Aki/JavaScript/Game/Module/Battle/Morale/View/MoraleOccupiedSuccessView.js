"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleOccupiedSuccessView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const DELAY_CLOSE_TIME = 2000;
class MoraleOccupiedSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RL1 = undefined;
    this.xOi = undefined;
    this.AMe = () => {
      this.svi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIText]];
  }
  OnStart() {
    var e;
    this.RL1 = this.GetArtText(0);
    if (this.RL1) {
      e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel();
      this.RL1.SetText(e.toString());
    }
  }
  OnBeforeShow() {}
  OnAfterShow() {
    this.Rbt();
  }
  OnBeforeDestroy() {
    this.YN1();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
  }
  svi() {
    if (!this.IsHideOrHiding) {
      this.CloseMe();
    }
  }
  Rbt() {
    this.YN1();
    this.xOi = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.xOi = undefined;
      this.svi();
    }, DELAY_CLOSE_TIME);
  }
  YN1() {
    if (this.xOi) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.xOi);
      this.xOi = undefined;
    }
  }
}
exports.MoraleOccupiedSuccessView = MoraleOccupiedSuccessView;
//# sourceMappingURL=MoraleOccupiedSuccessView.js.map