"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerShowCardsAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerShowCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s, r = GuessJokerDefine_1.GUESS_JOKER_CARD_SHOW_TIME) {
    super();
    this.kRu = [];
    this.xC = false;
    this.kRu = e;
    this.Duration = r;
    this.xC = s;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      e.ShowCards(this.kRu, this.xC);
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerShowCardsAction = GuessJokerShowCardsAction;
//# sourceMappingURL=GuessJokerShowCardsAction.js.map