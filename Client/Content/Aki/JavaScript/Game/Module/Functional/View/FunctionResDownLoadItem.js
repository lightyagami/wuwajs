"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionResDownLoadItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
class FunctionResDownLoadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.jF1 = () => {
      if (!UiManager_1.UiManager.IsViewOpen("SubPackageDownLoadView")) {
        UiManager_1.UiManager.OpenView("SubPackageDownLoadView");
      }
    };
    this.AF1 = () => {
      this.Update();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.jF1]];
  }
  OnStart() {
    this.LZs();
  }
  OnBeforeDestroy() {
    this.DZs();
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.AF1);
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.AF1);
  }
  Update() {
    this.Refresh();
  }
  Refresh() {
    var e = this.GetTexture(0);
    var t = ModelManager_1.ModelManager.SubPackageDownLoadModel.DownLoadPercentage();
    e.SetFillAmount(t[0]);
    if (t[1] === 1) {
      this.GetTexture(0).SetChangeColor(false, e.changeColor);
    } else {
      this.GetTexture(0).SetChangeColor(true, e.changeColor);
    }
  }
  StartShow() {
    this.Update();
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.Update();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  EndShow() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.FunctionResDownLoadItem = FunctionResDownLoadItem;
//# sourceMappingURL=FunctionResDownLoadItem.js.map