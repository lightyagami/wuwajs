"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoundOverCheck = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhantomArenaRoundOverCheck {
  constructor(e) {
    this.Proxy = e;
    this.HasAnyOperationInternal = true;
    this.DelayTime = 0;
    this.TimerHandle = undefined;
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaRoundOverCheck();
    this.DelayTime = e * CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  get HasAnyOperation() {
    return this.HasAnyOperationInternal;
  }
  xHe() {
    if (this.TimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
  }
  kot() {
    this.HasAnyOperationInternal = true;
    this.Proxy.HideRoundOverEffect();
    if (this.Proxy.CheckRepeatCondition()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "PhantomArenaRoundOverCheck检测无操作条件满足");
      }
      this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.HasAnyOperationInternal = false;
        this.Proxy.PlayRoundOverEffect();
        this.TimerHandle = undefined;
      }, this.DelayTime);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "PhantomArenaRoundOverCheck检测无操作条件不满足");
    }
  }
  StartCheck() {
    this.kot();
  }
  RepeatCheck() {
    this.xHe();
    this.kot();
  }
  Clear() {
    this.HasAnyOperationInternal = false;
    this.xHe();
  }
}
exports.PhantomArenaRoundOverCheck = PhantomArenaRoundOverCheck;
//# sourceMappingURL=PhantomArenaRoundOverCheck.js.map