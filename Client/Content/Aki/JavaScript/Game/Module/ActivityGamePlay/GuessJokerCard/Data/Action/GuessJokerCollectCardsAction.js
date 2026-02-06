"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCollectCardsAction = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerCollectCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s) {
    super();
    this.ZRf = 1;
    this.l$t = 7;
    this.ZRf = e;
    this.l$t = s;
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (e) {
      var s = e.GetPositionPanel(this.l$t);
      if (s) {
        var t = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetAllCardsByPlayer(this.ZRf);
        if (t.length === 0) {
          this.Done = true;
        } else {
          var r = [];
          for (const n of t.map(e => e.Id)) {
            var o;
            var i = e.GetCardItemById(n);
            if (i && (o = i.GetPositionType()) !== this.l$t) {
              if (o = e.GetPositionPanel(o)) {
                o.RemoveCardByCardId(n);
              }
              r.push(i);
            }
          }
          r.sort((e, s) => e.GetGlobalIndex() - s.GetGlobalIndex());
          s.AddCardByItemList(r);
          e.UpdateCardItemsHierarchyIndex();
          for (const c of r) {
            var a = c.Data;
            c.CardFlip(a.GetBelongPlayerType() !== 1);
          }
          this.AnimateCardsToTarget(this.l$t, s, () => {
            this.Done = true;
          });
        }
      } else {
        this.Done = true;
      }
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerCollectCardsAction = GuessJokerCollectCardsAction;
//# sourceMappingURL=GuessJokerCollectCardsAction.js.map