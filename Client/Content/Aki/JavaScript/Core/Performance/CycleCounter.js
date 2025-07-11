"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CycleCounter = exports.STAT_MAX_NAME_LENGTH = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
exports.STAT_MAX_NAME_LENGTH = 800;
class CycleCounter {
  static RefreshState() {
    this.uY = false;
    if (this.cY !== this.mY && (this.cY = this.mY, this.uY = true, !this.cY)) {
      var e = this.dY.length;
      for (let t = 0; t < e; t++) {
        cpp_1.FKuroCycleCounter.StopCycleCounter();
      }
      this.dY.splice(0);
    }
    if (this.CY !== this.gY) {
      this.CY = this.gY;
      this.uY = true;
    }
  }
  static get IsEnabled() {
    return this.cY;
  }
  static SetEnable(t) {
    this.mY = t;
  }
  static SetNeedCheck(t) {
    this.gY = t;
  }
  static Start(t) {
    if (this.cY) {
      cpp_1.FKuroCycleCounter.StartCycleCounterByName(t);
      this.CheckStart(t);
    }
  }
  static CheckStart(t) {
    if (this.CY) {
      this.dY.push(t);
    }
  }
  static Stop(t) {
    if (this.cY && this.IsPassedStackCheck(t)) {
      cpp_1.FKuroCycleCounter.StopCycleCounter();
    }
  }
  static IsPassedStackCheck(s) {
    if (!this.CY) {
      return true;
    }
    if (this.dY.length > 0) {
      if (s === this.dY[this.dY.length - 1]) {
        this.dY.pop();
        return true;
      }
      let e = false;
      for (let t = this.dY.length - 1; t >= 0; t--) {
        if (this.dY[t] === s) {
          e = true;
          break;
        }
      }
      if (e) {
        var i = [];
        i.push(this.dY.pop());
        let t = i[0];
        while (t !== s) {
          cpp_1.FKuroCycleCounter.StopCycleCounter();
          i.push(this.dY.pop());
          t = i[i.length - 1];
        }
        puerts_1.logger.error(`CycleCounter.Stop()匹配失败，已尝试从栈中恢复 current stat name: ${s}, none stopped names: ${i}`);
        return true;
      }
    }
    if (this.uY) {
      puerts_1.logger.log("CycleCounter.Stop()匹配失败，但当前帧切换过开关状态 name: " + s);
      return true;
    } else {
      puerts_1.logger.error("CycleCounter.Stop()匹配失败 name: " + s);
      return false;
    }
  }
}
(exports.CycleCounter = CycleCounter).cY = cpp_1.KuroApplication.IsWithStat();
CycleCounter.mY = CycleCounter.cY;
CycleCounter.CY = !cpp_1.KuroApplication.IsBuildShipping();
CycleCounter.gY = CycleCounter.CY;
CycleCounter.uY = false;
CycleCounter.dY = new Array(); //# sourceMappingURL=CycleCounter.js.map