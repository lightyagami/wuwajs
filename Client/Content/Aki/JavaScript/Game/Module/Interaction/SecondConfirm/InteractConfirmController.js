"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractConfirmController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const CommonConfirmBoxAction_1 = require("./Action/CommonConfirmBoxAction");
const HonamiStoryConfirmBoxAction_1 = require("./Action/HonamiStoryConfirmBoxAction");
const HonamiStoryLeaveTipAction_1 = require("./Action/HonamiStoryLeaveTipAction");
class InteractConfirmController {
  static RegisterActions() {
    this.otm(IAction_1.EInteractionConfirmBoxType.Common, CommonConfirmBoxAction_1.CommonConfirmBoxAction);
    this.otm(IAction_1.EInteractionConfirmBoxType.HonamiStoryCorruptedChest, HonamiStoryConfirmBoxAction_1.HonamiStoryConfirmBoxAction);
    this.otm(IAction_1.EInteractionConfirmBoxType.HonamiStoryEvacuateConfirm, HonamiStoryLeaveTipAction_1.HonamiStoryLeaveTipAction);
  }
  static HandleAction(t, e) {
    if (!t || !t.ConfirmBox) {
      return 0;
    }
    var o = this.GetAction(t.ConfirmBox.Type.Type);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 93, "[交互二次确认] 未注册的二次确认类型", ["二次确认类型", t.ConfirmBox.Type]);
      }
      return 0;
    }
    if (this.ntm) {
      this.ntm[1].Cancel();
    }
    var n = this.hJ++;
    var t = LevelGeneralContextDefine_1.InteractSecondConfirmContext.Create(n, t);
    t.ConfirmCallback = (t, o, n) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 93, "[交互二次确认] 交互二次确认结束", ["Handle", t], ["结果", o]);
      }
      if (InteractConfirmController.CheckHandleValid(t)) {
        e(t, o, n);
        this.ntm = undefined;
      }
    };
    var t = o.Execute(t);
    if (t) {
      this.ntm = [n, o];
      return n;
    } else {
      return 0;
    }
  }
  static CancelAction(t) {
    if (this.ntm?.[0] === t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 93, "取消交互二次确认", ["Handle", t]);
      }
      this.ntm[1].Cancel();
      this.ntm = undefined;
    }
  }
  static GetAction(t) {
    t = this.dYu.get(t);
    if (t) {
      return t;
    }
  }
  static ReleaseAction(t) {
    if (this.dYu.get(t)) {
      this.dYu.delete(t);
    }
  }
  static CheckHandleValid(t) {
    return this.ntm?.[0] === t;
  }
  static Clear() {
    if (InteractConfirmController.ntm) {
      InteractConfirmController.ntm[1].Cancel();
    }
    InteractConfirmController.ntm = undefined;
    InteractConfirmController.dYu.clear();
  }
}
(exports.InteractConfirmController = InteractConfirmController).dYu = new Map();
InteractConfirmController.hJ = 1;
InteractConfirmController.ntm = undefined;
InteractConfirmController.otm = (t, o) => {
  if (!InteractConfirmController.dYu.has(t)) {
    o = new o();
    InteractConfirmController.dYu.set(t, o);
  }
}; //# sourceMappingURL=InteractConfirmController.js.map