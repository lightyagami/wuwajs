"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionOpenQuestChapterView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionOpenQuestChapterView extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.$Ge = () => {
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    var t = this.ActionInfo.Params;
    if (t) {
      var o = this.Context.Context;
      let e = undefined;
      if (t.QuestId) {
        e = t.QuestId;
      } else {
        switch (o.Type) {
          case 2:
            e = o.QuestId;
            break;
          case 6:
            e = o.TreeConfigId;
        }
      }
      if (e) {
        GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.OpenQuestChapterView(t, e, this.$Ge);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 18, "非任务系统不可使用章节提示事件");
      }
    }
  }
}
exports.FlowActionOpenQuestChapterView = FlowActionOpenQuestChapterView;
//# sourceMappingURL=FlowActionOpenQuestChapterView.js.map