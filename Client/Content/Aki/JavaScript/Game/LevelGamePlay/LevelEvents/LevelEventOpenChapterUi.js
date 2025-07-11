"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventOpenChapterUi = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GeneralLogicTreeUtil_1 = require("../../Module/GeneralLogicTree/GeneralLogicTreeUtil");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenChapterUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, r) {
    this.FinishExecute(true);
  }
  ExecuteNew(r, l) {
    if (r) {
      let e = undefined;
      if (r.QuestId) {
        e = r.QuestId;
      } else {
        switch (l.Type) {
          case 2:
            e = l.QuestId;
            break;
          case 6:
            e = l.TreeConfigId;
        }
      }
      if (e) {
        GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(r, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "非任务系统不可使用章节提示事件");
      }
    }
  }
}
exports.LevelEventOpenChapterUi = LevelEventOpenChapterUi;
//# sourceMappingURL=LevelEventOpenChapterUi.js.map