"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleFloatTipsView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TIMER_INTERVAL = 100;
const COUNTDOWN_TEXT_KEY = "BattleTipCountdown";
class BattleFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cCt = undefined;
    this.mCt = 0;
    this.j3 = undefined;
    this.OnTimerUpdate = () => {
      var e;
      if (!this.cCt || this.cCt.EndTime <= Time_1.Time.WorldTimeSeconds) {
        this.dCt();
      } else if (this.cCt.Type === 1 && (e = Math.max(Math.ceil(this.cCt.CountdownEndTime - Time_1.Time.WorldTimeSeconds), 0)) !== this.mCt) {
        this.mCt = e;
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), COUNTDOWN_TEXT_KEY, this.mCt);
      }
    };
    this.CCt = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
      this.cCt = e.CurTip;
      this.gCt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    if (this.j3 === undefined) {
      this.j3 = TimerSystem_1.GameplayTimerSystem.Forever(this.OnTimerUpdate, TIMER_INTERVAL);
    }
    var e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData;
    let t = e.CurTip;
    if (t = e.CheckIsExpired(t) ? e.GetNextFloatTip() : t) {
      this.cCt = t;
      this.gCt();
    }
  }
  OnBeforeDestroy() {
    if (this.j3 !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiFloatTipUpdate, this.CCt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiFloatTipUpdate, this.CCt);
  }
  dCt() {
    var e = ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.GetNextFloatTip();
    if (e) {
      this.cCt = e;
      this.gCt();
    } else {
      this.CloseMe();
    }
  }
  gCt() {
    switch (this.cCt.Type) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.cCt.TextKey);
        this.GetText(1).SetText("");
        this.GetItem(2).SetUIActive(false);
        break;
      case 1:
        this.mCt = Math.max(Math.ceil(this.cCt.CountdownEndTime - Time_1.Time.WorldTimeSeconds), 0);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), this.cCt.TextKey);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), COUNTDOWN_TEXT_KEY, this.mCt);
        this.GetItem(2).SetUIActive(true);
    }
  }
}
exports.BattleFloatTipsView = BattleFloatTipsView;
//# sourceMappingURL=BattleFloatTipsView.js.map