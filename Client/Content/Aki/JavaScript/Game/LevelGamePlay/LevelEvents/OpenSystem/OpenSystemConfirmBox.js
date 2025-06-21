"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenSystemConfirmBox = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  QuestController_1 = require("../../../Module/QuestNew/Controller/QuestController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemConfirmBox extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e) return !0;
    const o = new CustomPromise_1.CustomPromise;
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e.BoardId);
    if (t.FinishOpenFunction = e => {
        o.SetResult(e)
      }, 312 === e.BoardId) {
      if (ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode()) return e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId(), Log_1.Log.CheckWarn() && Log_1.Log.Warn("Quest", 18, "OpenSystemConfirmBox.已经在专注模式中了", ["focusQuestId", e]), !1;
      const n = this.x91(r);
      if (!n) return Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "OpenSystemConfirmBox.上下文中拿不到任务Id,不是从任务中调用的", ["context", r.Type]), !1;
      t.FunctionMap.set(2, () => {
        QuestController_1.QuestNewController.RequestSetQuestFocusMode(n)
      })
    }
    return !!ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t) && o.Promise
  }
  GetViewName(e, r) {
    return ControllerHolder_1.ControllerHolder.ConfirmBoxController.GetUiViewName(e.BoardId)
  }
  x91(e) {
    let r = 0;
    switch (e.Type) {
      case 6:
        r = e.TreeConfigId;
        break;
      case 2:
        r = e.QuestId
    }
    return r
  }
}
exports.OpenSystemConfirmBox = OpenSystemConfirmBox;
//# sourceMappingURL=OpenSystemConfirmBox.js.map