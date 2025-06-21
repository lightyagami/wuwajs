"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoundOverCheck = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhantomArenaRoundOverCheck {
  constructor(e) {
    this.Proxy = e, this.HasAnyOperationInternal = !0, this.DelayTime = 0, this.TimerHandle = void 0;
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaRoundOverCheck();
    this.DelayTime = e * CommonDefine_1.MILLIONSECOND_PER_SECOND
  }
  get HasAnyOperation() {
    return this.HasAnyOperationInternal
  }
  xHe() {
    this.TimerHandle && (TimerSystem_1.TimerSystem.Remove(this.TimerHandle), this.TimerHandle = void 0)
  }
  kot() {
    this.HasAnyOperationInternal = !0, this.Proxy.HideRoundOverEffect(), this.Proxy.CheckRepeatCondition() ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "PhantomArenaRoundOverCheck检测无操作条件满足"), this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      this.HasAnyOperationInternal = !1, this.Proxy.PlayRoundOverEffect(), this.TimerHandle = void 0
    }, this.DelayTime)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "PhantomArenaRoundOverCheck检测无操作条件不满足")
  }
  StartCheck() {
    this.kot()
  }
  RepeatCheck() {
    this.xHe(), this.kot()
  }
  Clear() {
    this.HasAnyOperationInternal = !1, this.xHe()
  }
}
exports.PhantomArenaRoundOverCheck = PhantomArenaRoundOverCheck;
//# sourceMappingURL=PhantomArenaRoundOverCheck.js.map