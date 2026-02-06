"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCheckCardAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerCheckCardAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e) {
    super();
    this.kRu = [];
    this.kRu = e;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      const r = [];
      for (const o of this.kRu) {
        var s = e.GetCardItemById(o);
        if (s) {
          r.push(s);
        }
      }
      if (r.length === 0) {
        this.Done = true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("GuessJokerCard", 78, "check card id list: " + this.kRu.join(","));
        }
        let o = 0;
        const t = () => {
          if (o >= r.length) {
            this.Done = true;
          } else {
            const e = r[o];
            const s = o === r.length - 1;
            e.PlayCardSequence("EvilSle", () => {
              if (s) {
                e.PlayCardSequence("EvilPress", () => {
                  e.SetChecking();
                  this.Done = true;
                });
              } else {
                e.PlayCardSequence("EvilUnsle", () => {
                  o++;
                  t();
                });
              }
            });
          }
        };
        t();
      }
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerCheckCardAction = GuessJokerCheckCardAction;
//# sourceMappingURL=GuessJokerCheckCardAction.js.map