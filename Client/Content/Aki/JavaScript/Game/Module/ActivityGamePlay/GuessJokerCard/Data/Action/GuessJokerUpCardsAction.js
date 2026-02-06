"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerUpCardsAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerUpCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s = true) {
    super();
    this.kRu = [];
    this.rLf = false;
    this.kRu = e;
    this.rLf = s;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      var s = [];
      for (const t of this.kRu) {
        var r = e.GetCardItemById(t);
        if (r) {
          s.push(r);
        }
      }
      if (s.length === 0) {
        this.Done = true;
      } else {
        const o = new Array(s.length).fill(false);
        for (let e = 0; e < s.length; e++) {
          s[e].CardUp(this.rLf, () => {
            o[e] = true;
            if (o.every(e => e)) {
              this.Done = true;
            }
          });
        }
      }
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerUpCardsAction = GuessJokerUpCardsAction;
//# sourceMappingURL=GuessJokerUpCardsAction.js.map