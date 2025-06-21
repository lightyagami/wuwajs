"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ResDownLoadTopPanel = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  BattleVisibleChildView_1 = require("../BattleUi/Views/BattleChildView/BattleVisibleChildView");
class ResDownLoadTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.TDe = void 0, this.cF1 = () => {
      UiManager_1.UiManager.IsViewOpen("ResDownLoadView") || UiManager_1.UiManager.OpenView("ResDownLoadView")
    }, this.ZG1 = e => {
      this.Update()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [1, this.cF1]
    ]
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), this.SetVisible(1, !1)
  }
  Reset() {
    super.Reset()
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.ZG1)
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.ZG1)
  }
  Update() {
    this.Refresh()
  }
  Refresh() {
    var e = this.GetTexture(0),
      i = ModelManager_1.ModelManager.ResDownLoadModel.DownLoadPercentage();
    e.SetFillAmount(i[0]), 1 === i[1] ? this.GetTexture(0).SetChangeColor(!1, e.changeColor) : this.GetTexture(0).SetChangeColor(!0, e.changeColor)
  }
  StartShow() {
    this.Update(), this.SetVisible(1, !0), this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0), this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.Update()
    }, TimeUtil_1.TimeUtil.InverseMillisecond)
  }
  EndShow() {
    this.SetVisible(1, !1), this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
  OnBeforeDestroy() {
    this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
  OnBeforeShow() {
    this.LZs()
  }
  OnBeforeHide() {
    this.DZs()
  }
}
exports.ResDownLoadTopPanel = ResDownLoadTopPanel;
//# sourceMappingURL=ResDownLoadTopPanel.js.map