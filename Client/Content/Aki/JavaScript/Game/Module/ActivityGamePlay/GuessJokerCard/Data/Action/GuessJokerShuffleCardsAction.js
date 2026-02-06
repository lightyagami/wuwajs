"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerShuffleCardsAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerShuffleCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e) {
    super();
    this.l$t = 7;
    this.l$t = e;
  }
  OnStart() {
    const e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    var s;
    if (!e || !(s = e.GetPositionPanel(this.l$t)) || s.CardItemList.length <= 1) {
      this.Done = true;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "【action】开始洗牌动画：" + this.l$t);
      }
      e.ClearAllCardsChecking();
      s.ShuffleCardsWithAnimation(() => {
        e.UpdateCardItemsHierarchyIndex();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "【action】洗牌动画完成");
        }
        this.Done = true;
      });
    }
  }
}
exports.GuessJokerShuffleCardsAction = GuessJokerShuffleCardsAction;
//# sourceMappingURL=GuessJokerShuffleCardsAction.js.map