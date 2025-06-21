"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenSystemQuestReviewTipsView = exports.OpenSystemQuestReviewMainView = void 0;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemQuestReviewMainView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, s) {
    return "QuestReviewMainView"
  }
  async ExecuteOpenView(e, s) {
    return !!e.BoardId && ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReviewAsync(e.BoardId)
  }
}
exports.OpenSystemQuestReviewMainView = OpenSystemQuestReviewMainView;
class OpenSystemQuestReviewTipsView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, s) {
    return "QuestReviewTipsView"
  }
  async ExecuteOpenView(e, s) {
    return !!e.BoardId && ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReviewTipsViewAsync(e.BoardId, e.PlotReviewJumpTipsNodeId ?? 0)
  }
}
exports.OpenSystemQuestReviewTipsView = OpenSystemQuestReviewTipsView;
//# sourceMappingURL=OpenSystemQuestReview.js.map