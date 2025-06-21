"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FunctionResDownLoadItem = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager");
class FunctionResDownLoadItem extends UiPanelBase_1.UiPanelBase {
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
  OnStart() {
    this.LZs()
  }
  OnBeforeDestroy() {
    this.DZs(), this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
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
      t = ModelManager_1.ModelManager.ResDownLoadModel.DownLoadPercentage();
    e.SetFillAmount(t[0]), 1 === t[1] ? this.GetTexture(0).SetChangeColor(!1, e.changeColor) : this.GetTexture(0).SetChangeColor(!0, e.changeColor)
  }
  StartShow() {
    this.Update(), this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0), this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.Update()
    }, TimeUtil_1.TimeUtil.InverseMillisecond)
  }
  EndShow() {
    this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
}
exports.FunctionResDownLoadItem = FunctionResDownLoadItem;
//# sourceMappingURL=FunctionResDownLoadItem.js.map