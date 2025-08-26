"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleIndomitableLevelView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const DELAY_CLOSE_TIME = 2000;
const DELAY_EVENT_TIME = 1500;
class MoraleIndomitableLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RL1 = undefined;
    this.xOi = undefined;
    this.GOe = undefined;
    this.AMe = () => {
      this.svi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText]];
  }
  OnStart() {
    var e;
    this.RL1 = this.GetArtText(0);
    if (this.RL1) {
      e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel();
      this.RL1.SetText(e.toString());
    }
  }
  OnBeforeShow() {
    this.Lyu();
  }
  OnAfterShow() {
    this.Rbt();
  }
  OnBeforeDestroy() {
    this.YN1();
    this.wyu();
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
  Lyu() {
    this.wyu();
    this.GOe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.GOe = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim);
    }, DELAY_EVENT_TIME);
  }
  YN1() {
    if (this.xOi) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.xOi);
      this.xOi = undefined;
    }
  }
  wyu() {
    if (this.GOe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
}
exports.MoraleIndomitableLevelView = MoraleIndomitableLevelView;
//# sourceMappingURL=MoraleIndomitableLevelView.js.map