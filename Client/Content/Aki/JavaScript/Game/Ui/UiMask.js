"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMask = undefined;
const Log_1 = require("../../Core/Common/Log");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const UiLayer_1 = require("./UiLayer");
const MASK_DESTROY_TIME = 2000;
class UiMask {
  constructor() {
    this.o8_ = new Map();
  }
  n8_(e) {
    if (e.Timer !== undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiMask", 10, "[UiMask]移除定时器", ["MaskTag", e.Tag], ["MaskCount", e.Count]);
      }
      TimerSystem_1.GameplayTimerSystem.Remove(e.Timer);
      e.Timer = undefined;
    }
  }
  s8_(e, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiMask", 10, "[UiMask]添加定时器", ["MaskTag", e], ["MaskCount", i]);
    }
    return TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiMask", 10, "[UiMask]超过保底时间,定时器执行逻辑,解除遮罩", ["MaskTag", e]);
      }
      this.a8_(e);
    }, MASK_DESTROY_TIME);
  }
  h8_(e) {
    e.Timer = this.s8_(e.Tag, e.Count);
    UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, true);
  }
  l8_(e) {
    let i = this.o8_.get(e);
    if (i) {
      this.n8_(i);
      i.Count += 1;
    } else {
      i = {
        Tag: e,
        Timer: undefined,
        Count: 1
      };
      this.o8_.set(e, i);
    }
    this.h8_(i);
  }
  _8_(e) {
    var i = this.o8_.get(e);
    if (i && (--i.Count, i.Count <= 0)) {
      this.n8_(i);
      this.a8_(e);
    }
  }
  a8_(e) {
    this.o8_.delete(e);
    UiLayer_1.UiLayer.SetShowMaskLayer(e, false);
  }
  SetMask(e, i) {
    if (i) {
      this.l8_(e);
    } else {
      this._8_(e);
    }
  }
}
exports.UiMask = UiMask;
//# sourceMappingURL=UiMask.js.map