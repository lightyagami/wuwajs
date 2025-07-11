"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemQuestReviewTipsView = exports.OpenSystemQuestReviewMainView = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemQuestReviewMainView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, s) {
    return "QuestReviewMainView";
  }
  async ExecuteOpenView(e, s) {
    return !!e.BoardId && ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReviewAsync(e.BoardId, false);
  }
}
exports.OpenSystemQuestReviewMainView = OpenSystemQuestReviewMainView;
class OpenSystemQuestReviewTipsView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, s) {
    return "QuestReviewTipsView";
  }
  async ExecuteOpenView(e, s) {
    return !!e.BoardId && ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReviewTipsViewAsync(e.BoardId, e.PlotReviewJumpTipsNodeId ?? 0);
  }
}
exports.OpenSystemQuestReviewTipsView = OpenSystemQuestReviewTipsView;
//# sourceMappingURL=OpenSystemQuestReview.js.map