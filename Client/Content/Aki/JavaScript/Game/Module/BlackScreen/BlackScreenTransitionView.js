"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenTransitionView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
const BlackScreenGlobalData_1 = require("./BlackScreenGlobalData");
const BlackScreenViewData_1 = require("./BlackScreenViewData");
class BlackScreenTransitionView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.R0t = "None";
    this.U0t = "None";
    this.C0t = new BlackScreenViewData_1.BlackScreenViewData();
    this.f0t = e => {
      if (e === this.R0t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 10, "开始动画结束", ["动画名称", e]);
        }
        BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise();
      } else if (e === this.U0t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BlackScreen", 10, "关闭动画结束", ["动画名称", e]);
        }
        BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise();
        this.GetTexture(0).SetAlpha(1);
        this.SetUiActive(false);
      }
    };
    this.A0t = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 10, "开始显示黑屏");
      }
      this.SetUiActive(true);
      BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise();
    };
    this.p0t = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 10, "开始显示黑屏", ["动画名称", this.R0t.toString()]);
      }
      this.SetUiActive(true);
      this.SPe.PlayLevelSequenceByName(this.R0t.toString());
    };
    this.P0t = () => {
      this.SPe.StopCurrentSequence(true, true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 10, "开始隐藏黑屏");
      }
      this.GetTexture(0).SetAlpha(1);
      this.SetUiActive(false);
      BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise();
    };
    this.M0t = () => {
      this.SPe.StopCurrentSequence(true, true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BlackScreen", 10, "开始隐藏黑屏", ["动画名称", this.U0t.toString()]);
      }
      this.SPe.PlayLevelSequenceByName(this.U0t.toString());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.f0t);
    this.C0t.RegisterStateDelegate(1, this.A0t);
    this.C0t.RegisterStateDelegate(2, this.p0t);
    this.C0t.RegisterStateDelegate(3, this.P0t);
    this.C0t.RegisterStateDelegate(4, this.M0t);
    this.GetTexture(0).SetAlpha(1);
    LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, true, true);
    this.C0t.TriggerCurrentStateDelegate();
  }
  OnBeforeDestroy() {
    BlackScreenGlobalData_1.BlackScreenGlobalData.ResetGlobalData();
    this.SPe?.Clear();
  }
  ShowTemp(e) {
    BlackScreenGlobalData_1.BlackScreenGlobalData.CreateShowPromise();
    var t = this.R0t;
    var e = (this.R0t = e) !== "None";
    if (!this.C0t.SwitchState(e ? 2 : 1)) {
      this.R0t = t;
    }
  }
  HideTemp(e) {
    BlackScreenGlobalData_1.BlackScreenGlobalData.CreateHidePromise();
    var t = this.U0t;
    var e = (this.U0t = e) !== "None";
    if (!this.C0t.SwitchState(e ? 4 : 3)) {
      this.U0t = t;
    }
  }
}
exports.BlackScreenTransitionView = BlackScreenTransitionView;
//# sourceMappingURL=BlackScreenTransitionView.js.map