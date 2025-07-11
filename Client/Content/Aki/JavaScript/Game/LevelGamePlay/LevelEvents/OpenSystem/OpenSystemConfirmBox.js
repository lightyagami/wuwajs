"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemConfirmBox = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine");
const QuestController_1 = require("../../../Module/QuestNew/Controller/QuestController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemConfirmBox extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (!e) {
      return true;
    }
    const o = new CustomPromise_1.CustomPromise();
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e.BoardId);
    t.FinishOpenFunction = e => {
      o.SetResult(e);
    };
    if (e.BoardId === 312) {
      if (ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode()) {
        e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Quest", 18, "OpenSystemConfirmBox.已经在专注模式中了", ["focusQuestId", e]);
        }
        return false;
      }
      const n = this.fH1(r);
      if (!n) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "OpenSystemConfirmBox.上下文中拿不到任务Id,不是从任务中调用的", ["context", r.Type]);
        }
        return false;
      }
      t.FunctionMap.set(2, () => {
        QuestController_1.QuestNewController.RequestSetQuestFocusMode(n);
      });
    }
    return !!ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t) && o.Promise;
  }
  GetViewName(e, r) {
    return ControllerHolder_1.ControllerHolder.ConfirmBoxController.GetUiViewName(e.BoardId);
  }
  fH1(e) {
    let r = 0;
    switch (e.Type) {
      case 6:
        r = e.TreeConfigId;
        break;
      case 2:
        r = e.QuestId;
    }
    return r;
  }
}
exports.OpenSystemConfirmBox = OpenSystemConfirmBox;
//# sourceMappingURL=OpenSystemConfirmBox.js.map