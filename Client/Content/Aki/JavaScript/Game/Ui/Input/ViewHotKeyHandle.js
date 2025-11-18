"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandle = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../InputDistribute/InputDistributeController");
const UiManager_1 = require("../UiManager");
class ViewHotKeyHandle {
  constructor(i) {
    this.ConfigId = undefined;
    this.ActionName = undefined;
    this.InputControllerType = 0;
    this.DefaultViewName = undefined;
    this.ViewParam = [];
    this.IsPressTrigger = true;
    this.PressStartTime = 0;
    this.PressTriggerTime = 0;
    this.IsReleaseTrigger = false;
    this.ReleaseInvalidTime = 0;
    this.IsPressClose = false;
    this.IsReleaseClose = false;
    this.uti = undefined;
    this.Xya = undefined;
    this.Smr = undefined;
    this.gJa = undefined;
    this.Yya = undefined;
    this.Jya = 0;
    this.OnInputAction = (i, t) => {
      if (this.zya()) {
        if (t === 0) {
          this.Press();
        } else if (t === 1) {
          this.Release();
        }
      }
    };
    this.Zya = () => {
      this.eIa();
      this.xmr();
    };
    this.ConfigId = i.ConfigId;
    this.ActionName = i.ActionName;
    this.InputControllerType = i.InputControllerType;
    this.DefaultViewName = i.ViewName;
    this.ViewParam = i.ViewParam;
    this.IsPressTrigger = i.IsPressTrigger;
    this.PressStartTime = i.PressStartTime;
    this.PressTriggerTime = i.PressTriggerTime;
    this.IsReleaseTrigger = i.IsReleaseTrigger;
    this.ReleaseInvalidTime = i.ReleaseInvalidTime;
    this.IsPressClose = i.IsPressClose;
    this.IsReleaseClose = i.IsReleaseClose;
    this.uti = i.OpenViewCallback;
    this.Xya = i.CloseViewCallback;
    this.Smr = i.IsAllowOpenViewByShortcutKey;
    this.gJa = i.IsAllowCloseViewByShortcutKey;
  }
  get ViewName() {
    return this.DefaultViewName;
  }
  Destroy() {
    this.UnBind();
    this.eIa();
    this.uti = undefined;
    this.Xya = undefined;
    this.Smr = undefined;
    this.gJa = undefined;
  }
  Bind() {
    InputDistributeController_1.InputDistributeController.BindAction(this.ActionName, this.OnInputAction);
  }
  UnBind() {
    InputDistributeController_1.InputDistributeController.UnBindAction(this.ActionName, this.OnInputAction);
  }
  zya() {
    switch (this.InputControllerType) {
      case 0:
        return true;
      case 1:
        return Info_1.Info.IsInKeyBoard();
      case 2:
        return Info_1.Info.IsInGamepad();
      default:
        return false;
    }
  }
  BindOpenViewCallback(i) {
    this.uti = i;
  }
  BindCloseViewCallback(i) {
    this.Xya = i;
  }
  Press() {
    if (!!this.ViewName && !StringUtils_1.StringUtils.IsBlank(this.ViewName)) {
      this.Jya = Time_1.Time.WorldTime;
      if (this.IsPressTrigger) {
        this.tIa();
      }
      if (this.IsPressClose) {
        this.wmr();
      }
    }
  }
  Release() {
    var i;
    this.eIa();
    if (this.IsReleaseTrigger && (i = Time_1.Time.WorldTime, this.ReleaseInvalidTime <= 0 || i - this.Jya <= this.ReleaseInvalidTime)) {
      this.xmr();
    }
    if (this.IsReleaseClose) {
      this.wmr();
    }
  }
  tIa() {
    if (this.PressTriggerTime <= 0) {
      return this.xmr();
    } else {
      this.eIa();
      this.Yya = TimerSystem_1.GameplayTimerSystem.Delay(this.Zya, this.PressTriggerTime);
      return false;
    }
  }
  eIa() {
    if (this.Yya && TimerSystem_1.GameplayTimerSystem.Has(this.Yya)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Yya);
    }
    this.Yya = undefined;
  }
  xmr() {
    if (UiManager_1.UiManager.IsViewOpen(this.ViewName)) {
      return false;
    }
    if (ModelManager_1.ModelManager.LoadingModel.IsLoading) {
      return false;
    }
    if (this.CheckHasInputLimit()) {
      return false;
    }
    if (this.Smr !== undefined && !this.Smr()) {
      return false;
    }
    if (this.SpecialConditionCheck()) {
      if (!this.sUl()) {
        return false;
      }
      this.YHt();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputManager", 27, "特殊情况，不处理分发，在别的模块处理");
    }
    return true;
  }
  wmr() {
    return !!UiManager_1.UiManager.IsViewOpen(this.ViewName) && !!UiManager_1.UiManager.IsViewShow(this.ViewName) && !ModelManager_1.ModelManager.LoadingModel.IsLoading && (this.gJa === undefined || !!this.gJa()) && !(this.$Oe(), 0);
  }
  YHt() {
    if (!!this.ViewName && !StringUtils_1.StringUtils.IsBlank(this.ViewName)) {
      if (this.uti) {
        this.uti();
      } else {
        this.OnOpenViewImplement();
      }
    }
  }
  $Oe() {
    if (!!this.ViewName && !StringUtils_1.StringUtils.IsBlank(this.ViewName)) {
      if (this.Xya) {
        this.Xya();
      } else {
        UiManager_1.UiManager.CloseView(this.ViewName);
      }
    }
  }
  sUl() {
    var i = ModelManager_1.ModelManager.InputDistributeModel?.GetNotAllowFightInputViewNameSet();
    return !i || i.size === 0 || !!i.has(this.ViewName);
  }
  CheckHasInputLimit() {
    return LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.includes(this.ViewName);
  }
  SpecialConditionCheck() {
    return true;
  }
  OnOpenViewImplement() {
    UiManager_1.UiManager.OpenView(this.ViewName, this.ViewParam.length > 0 ? this.ViewParam : undefined);
  }
}
exports.ViewHotKeyHandle = ViewHotKeyHandle;
//# sourceMappingURL=ViewHotKeyHandle.js.map