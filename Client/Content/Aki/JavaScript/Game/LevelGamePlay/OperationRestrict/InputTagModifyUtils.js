"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTagModifyUtils = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
class InputTagModifyUtils {
  static JK1() {
    this.ZK1.clear();
    this.eX1.clear();
    for (const i of InputDistributeDefine_1.initializeInputDistributeTagDefine) {
      if (i.Tag !== InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag) {
        this.ZK1.set(i.Tag, i.ParentTag);
        let t = this.eX1.get(i.ParentTag);
        if (!t) {
          t = new Set();
          this.eX1.set(i.ParentTag, t);
        }
        t.add(i.Tag);
      }
    }
  }
  static tX1(t, i, e = false) {
    if (!this.ZK1.size || !!this.eX1.size) {
      this.JK1();
    }
    t = this.eX1.get(t);
    if (t?.size) {
      if (i instanceof Set) {
        for (const s of t) {
          i.add(s);
        }
      } else {
        i.push(...t);
      }
      if (e) {
        for (const a of t) {
          this.tX1(a, i, true);
        }
      }
    }
  }
  static iX1(t) {
    if (!this.ZK1.size || !!this.eX1.size) {
      this.JK1();
    }
    return this.ZK1.get(t);
  }
  static GetIsInputTagEnable(t, i, e = false) {
    if (!this.ZK1.size || !!this.eX1.size) {
      this.JK1();
    }
    if (e) {
      return t.includes(i);
    }
    var s = new Set(t);
    let a = i;
    while (a) {
      if (s.has(a)) {
        return true;
      }
      a = this.ZK1.get(a);
    }
    return false;
  }
  static rX1(t, i, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 39, "[修改输入Tag] 直接增删Tag", ["新增Tag", i], ["删除Tag", e], ["目标Tag列表", t]);
    }
    for (const a of e) {
      var s = t.indexOf(a);
      if (s !== -1) {
        t.splice(s, 1);
      }
    }
    for (const n of i) {
      if (t.indexOf(n) === -1) {
        t.push(n);
      }
    }
  }
  static oX1(t, e) {
    if (!this.GetIsInputTagEnable(t, e, false)) {
      var s = this.iX1(e);
      const n = new Set();
      this.tX1(s, n);
      var a = new Set();
      this.tX1(e, a, true);
      this.rX1(t, [e], [...a]);
      let i = 0;
      t.forEach(t => {
        if (n.has(t)) {
          ++i;
        }
      });
      if (i === n.size && s) {
        this.oX1(t, s);
      }
    }
  }
  static nX1(t, i) {
    if (this.GetIsInputTagEnable(t, i, false)) {
      var e = this.iX1(i);
      var s = new Set();
      this.tX1(e, s);
      var a = new Set();
      this.tX1(i, a, true);
      this.rX1(t, [], [i, ...a]);
      var n = [];
      for (const o of s) {
        if (o !== i && this.GetIsInputTagEnable(t, o, false)) {
          n.push(o);
        }
      }
      if (e) {
        this.nX1(t, e);
      }
      for (const r of n) {
        this.oX1(t, r);
      }
    }
  }
  static SetEnableInputTag(t, i, e) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 39, "[修改输入Tag] 添加:开始", ["目标Tag", i], ["当前Tag列表", t]);
      }
      this.oX1(t, i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 39, "[修改输入Tag] 添加:完成", ["目标Tag", i], ["当前Tag列表", t]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 39, "[修改输入Tag] 删除", ["目标Tag", i], ["当前Tag列表", t]);
      }
      this.nX1(t, i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 39, "[修改输入Tag] 删除:完成", ["目标Tag", i], ["当前Tag列表", t]);
      }
    }
  }
}
(exports.InputTagModifyUtils = InputTagModifyUtils).ZK1 = new Map();
InputTagModifyUtils.eX1 = new Map(); //# sourceMappingURL=InputTagModifyUtils.js.map