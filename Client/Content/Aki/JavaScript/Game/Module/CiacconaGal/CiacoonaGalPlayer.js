"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalPlayer = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CiacconaGalUtils_1 = require("./CiacconaGalUtils");
class BaseCiacconaGalPlayerState extends StateBase_1.StateBase {
  OnEnter(a) {
    this.Owner.ClearStatePendingToSwitchByState(this);
    this.Owner.NotifyStateChange(this.State);
  }
  OnClick(a) {}
}
class CiacconaGalPlayerInitializingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    this.Owner.AnimHandler?.Stop();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Initializing");
    }
  }
}
class CiacconaGalPlayerPausingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Pausing");
    }
  }
  OnClick() {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(this.Owner.CurHandlingStepId);
    if (a && a.Type === 1) {
      this.Owner.TryContinue(a.NextStepId);
    }
  }
}
class CiacconaGalPlayerPlayingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Playing");
    }
  }
  OnClick() {
    this.Owner.TrySwitchToState(3);
  }
}
class CiacconaGalPlayerSkippingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Skipping");
    }
    this.Owner.AnimHandler.Skip();
  }
  OnClick() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Skipping状态, 禁用点击");
    }
  }
}
class CiacconaGalPlayerProtectingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Protecting");
    }
    a = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgCoolDownTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(1);
    }, a);
  }
  OnClick() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Protecting状态, 禁用点击");
    }
  }
}
class CiacconaGalPlayerChoiceProtectingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: ChoiceProtecting");
    }
    a = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(4);
    }, a);
  }
  OnClick() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在ChoiceProtecting状态, 禁用点击");
    }
  }
}
class CiacconaGalPlayerChoosingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Choosing");
    }
    ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty = true;
  }
  OnClick(a) {
    if (a) {
      var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(a);
      if (e) {
        var t = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(this.Owner.CurHandlingStepId);
        var i = e.ToStepId === 0 ? t.NextStepId : e.ToStepId;
        var n = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
        var l = this.Owner.CurHandlingChapterId;
        var o = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.InspirationCount;
        var c = e.RequiredInspiration;
        switch (e.State) {
          case 0:
            t.ChosenId = a;
            this.Owner.TryContinue(i);
            break;
          case 1:
            if (c <= o) {
              ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestUnlockChoice(n, l, a);
            } else {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InspirationNotEnough");
            }
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RequireConditionToUnlock");
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCiacconaAvgReChoose, t, e);
        }
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Choosing状态, 禁用点击");
    }
  }
}
class CiacconaGalPlayerBeforeSubEndingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: BeforeSubEnding");
    }
    a = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgSubEndingDelayTime() * TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(5);
    }, a);
  }
}
class CiacconaGalPlayerSubEndingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: SubEnding");
    }
    ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty = true;
  }
}
class CiacconaGalPlayer {
  constructor() {
    this.Lle = undefined;
    this.W2c = [];
    this.CurHandlingStepId = 0;
    this.CurHandlingChapterId = 0;
    this.$bc = 0;
    this.Wbc = undefined;
    this.Qbc = new Map();
    this.OnAnimEnd = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer: TextAnim播放结束");
      }
      var a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(this.CurHandlingStepId);
      if (a) {
        this.Qbc.set(a.Id, true);
        switch (a.Type) {
          case 2:
            this.TrySwitchToState(8);
            break;
          case 1:
            this.TrySwitchToState(6);
            break;
          case 3:
            this.TrySwitchToState(7);
        }
      }
    };
    if (CiacconaGalPlayer.cj !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CiacconaGal", 74, "CiacconaGalPlayer只允许单例, 请使用CiacconaGalPlayer.Instance");
      }
    } else {
      this.Lle = new StateMachine_1.StateMachine(this);
      this.Lle.AddState(0, CiacconaGalPlayerInitializingState);
      this.Lle.AddState(1, CiacconaGalPlayerPausingState);
      this.Lle.AddState(2, CiacconaGalPlayerPlayingState);
      this.Lle.AddState(3, CiacconaGalPlayerSkippingState);
      this.Lle.AddState(4, CiacconaGalPlayerChoosingState);
      this.Lle.AddState(5, CiacconaGalPlayerSubEndingState);
      this.Lle.AddState(6, CiacconaGalPlayerProtectingState);
      this.Lle.AddState(7, CiacconaGalPlayerBeforeSubEndingState);
      this.Lle.AddState(8, CiacconaGalPlayerChoiceProtectingState);
      this.Lle.Start(0);
    }
  }
  get StatePendingToSwitch() {
    return this.$bc;
  }
  get AnimHandler() {
    return this.Wbc;
  }
  static get Instance() {
    if (!(CiacconaGalPlayer.Kbc > 0)) {
      if (CiacconaGalPlayer.cj === undefined) {
        CiacconaGalPlayer.cj = new CiacconaGalPlayer();
      }
      CiacconaGalPlayer.Kbc += 1;
      return CiacconaGalPlayer.cj;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CiacconaGal", 74, "CiacconaGalPlayer只能由CiacconaGalController持有");
    }
  }
  AddOnStateChange(a) {
    this.W2c.push(a);
  }
  RemoveOnStateChange(a) {
    a = this.W2c.indexOf(a);
    if (a >= 0) {
      this.W2c.splice(a, 1);
    }
  }
  SetAnimHandler(a) {
    this.Wbc = a;
  }
  HasPlayedStepAnim(a) {
    return this.Qbc.get(a) ?? false;
  }
  GetCurState() {
    return this.Lle.CurrentState;
  }
  TrySwitchToState(a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer: 尝试切换状态到" + a);
    }
    this.$bc = a;
  }
  SwitchState() {
    if (this.$bc === 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("CiacconaGal", 74, "GalPlayer: 无状态切换请求");
      }
    } else if (this.AnimHandler || this.$bc !== 2) {
      if (this.Lle.Switch(this.$bc) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CiacconaGal", 74, `GalPlayer: 切换状态到${this.$bc}成功`);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("CiacconaGal", 74, "GalPlayer: 未注册TextAnim组件, 禁止切换至播放态", ["目标状态: ", this.$bc]);
    }
  }
  ClearStatePendingToSwitchByState(a) {
    if (a) {
      this.$bc = 0;
    }
  }
  TryContinue(a) {
    if (ModelManager_1.ModelManager.CiacconaGalModel.TryPushCurStepDataById(a)) {
      this.CurHandlingStepId = a;
      if ((a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(a)).HasText) {
        this.TrySwitchToState(2);
      } else if (a.Type === 2) {
        this.TrySwitchToState(8);
      } else if (a.Type === 3) {
        this.TrySwitchToState(5);
      } else {
        this.TrySwitchToState(1);
      }
    }
  }
  OnClick(a) {
    this.Lle.GetState(this.Lle.CurrentState).OnClick(a);
  }
  NotifyStateChange(e) {
    this.W2c.forEach(a => {
      a(e);
    });
  }
  Reset() {
    this.CurHandlingStepId = 0;
    this.CurHandlingChapterId = 0;
    this.$bc = 0;
    this.Lle.Switch(0);
    this.Qbc.clear();
  }
  Release() {
    this.Reset();
    this.W2c.length = 0;
    --CiacconaGalPlayer.Kbc;
    CiacconaGalPlayer.cj = undefined;
  }
}
(exports.CiacconaGalPlayer = CiacconaGalPlayer).cj = undefined;
CiacconaGalPlayer.Kbc = 0; //# sourceMappingURL=CiacoonaGalPlayer.js.map