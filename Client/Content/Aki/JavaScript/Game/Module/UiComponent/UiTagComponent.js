"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiTagComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class UiTagComponent {
  constructor() {
    this.Rxo = new Map();
    this.Uxo = new Map();
  }
  AddTagById(i, ...e) {
    if (i !== undefined) {
      let t = 0;
      if (this.Rxo.has(i)) {
        t = this.Rxo.get(i);
      }
      this.Rxo.set(i, t + 1);
      this.Axo(i, t, t + 1, ...e);
    }
  }
  ReduceTagById(t, ...i) {
    var e;
    if (t !== undefined && this.Rxo.has(t) && (e = this.Rxo.get(t)) !== 0) {
      if (e === 1) {
        this.Rxo.delete(t);
      } else {
        this.Rxo.set(t, e - 1);
      }
      this.Axo(t, e, e - 1, ...i);
    }
  }
  RemoveTagById(t, ...i) {
    var e;
    if (t !== undefined && this.Rxo.has(t)) {
      e = this.Rxo.get(t);
      this.Rxo.delete(t);
      this.Axo(t, e, 0, ...i);
    }
  }
  ContainsTagById(t) {
    return this.Rxo.has(t);
  }
  ContainsTagByName(t) {
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    return !!t && this.ContainsTagById(t);
  }
  GetTagCountById(t) {
    if (t === undefined) {
      return 0;
    } else {
      return this.Rxo.get(t) ?? 0;
    }
  }
  Axo(t, i, e, ...s) {
    if (t !== undefined && i !== e && i === 0 != (e === 0)) {
      this.Pxo(t, e > 0, this.Uxo.get(t), ...s);
    }
  }
  Pxo(t, i, e, ...s) {
    if (t !== undefined && e !== undefined) {
      var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      for (const a of [...e]) {
        try {
          a(t, i, ...s);
        } catch (t) {
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Event", 43, "tag事件回调执行异常", t, ["tag", o], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 43, "tag事件回调执行异常", ["tag", o], ["error", t]);
          }
        }
      }
    }
  }
  AddListener(t, i) {
    let e = this.Uxo.get(t);
    if (!e) {
      this.Uxo.set(t, e = new Set());
    }
    e.add(i);
  }
  RemoveListener(t, i) {
    t = this.Uxo.get(t);
    if (t) {
      t.delete(i);
    }
  }
  RemoveAllTag() {
    for (const t of this.Rxo.keys()) {
      this.RemoveTagById(t);
    }
  }
}
exports.UiTagComponent = UiTagComponent;
//# sourceMappingURL=UiTagComponent.js.map