"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResDownLoadTopPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const BattleVisibleChildView_1 = require("../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class ResDownLoadTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.jF1 = () => {
      if (!UiManager_1.UiManager.IsViewOpen("ResDownLoadView")) {
        UiManager_1.UiManager.OpenView("ResDownLoadView");
      }
    };
    this.AF1 = e => {
      this.Update();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.jF1]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.SetVisible(1, false);
  }
  Reset() {
    super.Reset();
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
  }
  Update() {
    this.Refresh();
  }
  Refresh() {
    var e = this.GetTexture(0);
    var i = ModelManager_1.ModelManager.ResDownLoadModel.DownLoadPercentage();
    e.SetFillAmount(i[0]);
    if (i[1] === 1) {
      this.GetTexture(0).SetChangeColor(false, e.changeColor);
    } else {
      this.GetTexture(0).SetChangeColor(true, e.changeColor);
    }
  }
  StartShow() {
    this.Update();
    this.SetVisible(1, true);
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.Update();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  EndShow() {
    this.SetVisible(1, false);
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeShow() {
    this.LZs();
  }
  OnBeforeHide() {
    this.DZs();
  }
}
exports.ResDownLoadTopPanel = ResDownLoadTopPanel;
//# sourceMappingURL=ResDownLoadTopPanel.js.map