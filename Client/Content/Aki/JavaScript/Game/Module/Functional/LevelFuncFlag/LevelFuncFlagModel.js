"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFuncFlagModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelFuncFlagDefine_1 = require("./LevelFuncFlagDefine");
class LevelFuncFlagModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.BRe = new Map();
  }
  OnInit() {
    for (var [e, n] of LevelFuncFlagDefine_1.levelFuncFlagDefaultVal) {
      this.BRe.set(e, n);
    }
    for (var [t, r] of this.BRe) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelFuncFlagSet, t, r);
    }
    return true;
  }
  OnClear() {
    this.BRe.clear();
    return true;
  }
  GetFuncFlagEnable(e) {
    return this.BRe.get(e) ?? false;
  }
  GetFuncFlagDefault(e) {
    return LevelFuncFlagDefine_1.levelFuncFlagDefaultVal.get(e) ?? false;
  }
  SetFuncFlagEnable(e, n) {
    if (this.BRe.get(e) !== n) {
      this.BRe.set(e, n);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Functional", 39, "关卡功能标记更新", ["funcFlagId", e], ["enable", n]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelFuncFlagChanged, e, n);
    }
  }
  ResetFuncFlagToDefault(e) {
    var n = LevelFuncFlagDefine_1.levelFuncFlagDefaultVal.get(e) ?? false;
    this.SetFuncFlagEnable(e, n);
  }
}
exports.LevelFuncFlagModel = LevelFuncFlagModel;
//# sourceMappingURL=LevelFuncFlagModel.js.map