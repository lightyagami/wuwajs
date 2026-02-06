"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerMoveCardsAction = undefined;
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerMoveCardsAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(s, e) {
    super();
    this.kRu = [];
    this.l$t = 7;
    this.kRu = s;
    this.l$t = e;
  }
  OnStart() {
    var s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetGamePlayView();
    if (s) {
      if (this.kRu.length === 0) {
        this.Done = true;
      } else {
        var e = s.GetPositionPanel(this.l$t);
        if (e) {
          var t = [];
          for (const o of this.kRu) {
            var i;
            var r = s.GetCardItemById(o);
            if (r && (i = r.GetPositionType()) !== this.l$t) {
              if (i = s.GetPositionPanel(i)) {
                i.RemoveCardByCardId(o);
              }
              t.push(r);
            }
          }
          t.sort((s, e) => s.GetGlobalIndex() - e.GetGlobalIndex());
          e.AddCardByItemList(t);
          s.UpdateCardItemsHierarchyIndex();
          if (e.Position === 7) {
            AudioSystem_1.AudioSystem.PostEvent("play_ui_springfestival_ghostcard_card_discard");
          }
          this.AnimateCardsToTarget(this.l$t, e, () => {
            this.Done = true;
          });
        } else {
          this.Done = true;
        }
      }
    } else {
      this.Done = true;
    }
  }
}
exports.GuessJokerMoveCardsAction = GuessJokerMoveCardsAction;
//# sourceMappingURL=GuessJokerMoveCardsAction.js.map