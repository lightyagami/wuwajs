"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPositionPanelBase = undefined;
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
class GuessJokerPositionPanelBase {
  constructor(t, e) {
    this.CardItemList = [];
    this.WLf = new Map();
    this.Position = 7;
    this.oLf = undefined;
    this.Position = t;
    this.oLf = e;
  }
  QLf(t) {
    if (!this.CheckCardExist(t.Data.Id)) {
      t.SetPositionType(this.Position);
      this.CardItemList.push(t);
      this.WLf.set(t.Data.Id, t);
    }
  }
  GetCardItemByCardId(t) {
    return this.WLf.get(t);
  }
  CheckCardExist(t) {
    return this.WLf.has(t);
  }
  InitCardByItemList(t) {
    for (const e of t) {
      this.QLf(e);
    }
    this.UpdateCardItemsPosition();
    this.UpdateCardItemsIndexInPanel();
    for (const s of t) {
      s.Show();
    }
  }
  AddCardByItemList(t) {
    for (const e of t) {
      this.QLf(e);
    }
    this.UpdateCardItemsIndexInPanel();
  }
  RemoveCardByCardId(t) {
    var e = this.GetCardItemByCardId(t);
    if (e) {
      this.CardItemList.splice(this.CardItemList.indexOf(e), 1);
      this.WLf.delete(t);
      return e;
    }
  }
  DealCards(a, t, h = 150) {
    if (a.length === 0) {
      t();
    } else {
      let i = 0;
      let r = 0;
      let o = false;
      const n = () => {
        if (o && r === 0) {
          t();
        }
      };
      const l = () => {
        var t;
        var e;
        var s;
        if (!(i >= a.length) && (t = a[i], e = (0, GuessJokerDefine_1.getCardPositionConfig)(this.Position), s = UiLayer_1.UiLayer.UiRootItem.GetHeight(), s = e.PositionRate * s / 100, t.SetPosition(Vector2D_1.Vector2D.Create(0, s)), t.SetSize(e.Size ?? 1), t.SetAlpha(e.Alpha ?? 1), t.Show(), this.QLf(t), this.UpdateCardItemsIndexInPanel(), r++, this.AnimateCardsToPosition(() => {
          r--;
          n();
        }), ++i < a.length)) {
          TimerSystem_1.TimerSystem.Delay(l, h);
        } else {
          o = true;
          n();
        }
      };
      l();
    }
  }
  AnimateCardsToPosition(e) {
    var s = this.CardItemList;
    if (s.length === 0) {
      e?.();
    } else {
      var i = GuessJokerUtils_1.GuessJokerUtils.CalculateCardLayoutInfo(s.length, this.Position);
      const h = new Array(s.length).fill(false);
      for (let t = 0; t < s.length; t++) {
        var r = s[t];
        var o = i[t];
        var a = Vector2D_1.Vector2D.Create(o.X, o.Y);
        r.SmoothMoveTo(a, () => {
          h[t] = true;
          if (h.every(t => t)) {
            e?.();
          }
        }, o.Scale, o.Rotation);
      }
    }
  }
  ShuffleCards() {
    for (let t = this.CardItemList.length - 1; t > 0; t--) {
      var e = Math.floor(Math.random() * (t + 1));
      [this.CardItemList[t], this.CardItemList[e]] = [this.CardItemList[e], this.CardItemList[t]];
    }
    this.UpdateCardItemsIndexInPanel();
  }
  ShuffleCardsWithAnimation(o) {
    if (this.CardItemList.length <= 1) {
      o();
    } else {
      var e = (0, GuessJokerDefine_1.getCardPositionConfig)(this.Position);
      var s = UiLayer_1.UiLayer.UiRootItem.GetHeight();
      var s = e.PositionRate * s / 100;
      var i = Vector2D_1.Vector2D.Create(0, s);
      const a = this.CardItemList[0].Data?.GetBelongPlayerType() === 0;
      let t = 0;
      var r = () => {
        if (++t === this.CardItemList.length) {
          this.ShuffleCards();
          ModelManager_1.ModelManager.GuessJokerGamePlayModel?.GetGamePlayView()?.UpdateCardItemsHierarchyIndex();
          this.CardItemList[this.CardItemList.length - 1].PlayCardSequence("CardWash", () => {
            let t = 0;
            var e = () => {
              if (++t === this.CardItemList.length) {
                o();
              }
            };
            for (const r of this.CardItemList) {
              var s = GuessJokerUtils_1.GuessJokerUtils.CalculateCardLayoutInfo(this.CardItemList.length, this.Position)[this.CardItemList.indexOf(r)];
              var i = Vector2D_1.Vector2D.Create(s.X, s.Y);
              if (a) {
                r.CardFlip(true, true);
              }
              r.SmoothMoveTo(i, e, s.Scale, s.Rotation);
            }
          });
        }
      };
      AudioSystem_1.AudioSystem.PostEvent("play_ui_springfestival_ghostcard_card_shuffle");
      for (const h of this.CardItemList) {
        if (a) {
          h.CardFlip(false, true);
        }
        h.SmoothMoveTo(i, r, e.Size ?? 1);
      }
    }
  }
  ShowCardPairNotice(e) {
    const s = this.CardItemList.length;
    if (s === 0) {
      e?.();
    } else {
      let t = 0;
      for (const i of this.CardItemList) {
        i.PlayCardSequence("PairNotice", () => {
          if (++t === s) {
            e?.();
          }
        });
      }
    }
  }
  RemoveCards(e) {
    const s = this.CardItemList.length;
    if (s === 0) {
      e?.();
    } else {
      let t = 0;
      for (const r of this.CardItemList) {
        r.PlayCardSequence("Dissolve", () => {
          if (++t === s) {
            e?.();
          }
          r.Destroy();
        });
      }
      var i = [];
      for (const o of this.CardItemList) {
        i.push(o.Data.Id);
      }
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.RemoveCardData(i);
      this.CardItemList.length = 0;
    }
  }
  GetCardIdList() {
    var t = [];
    for (const e of this.CardItemList) {
      t.push(e.Data.Id);
    }
    return t;
  }
  UpdateCardItemsPosition() {
    var t = this.CardItemList.length;
    var e = GuessJokerUtils_1.GuessJokerUtils.CalculateCardLayoutInfo(t, this.Position);
    for (let t = 0; t < this.CardItemList.length; t++) {
      var s = this.CardItemList[t];
      var i = e[t];
      s.SetAlpha(i.Alpha);
      var r = Vector2D_1.Vector2D.Create(i.X, i.Y);
      s.SetPosition(r);
      s.SetSize(i.Scale);
      s.SetRotation(i.Rotation);
    }
  }
  UpdateCardItemsIndexInPanel() {
    for (let t = 0; t < this.CardItemList.length; t++) {
      this.CardItemList[t].SetIndexInPanel(t);
    }
  }
  SetCardsClickableExcept(t, e = 0) {
    for (const s of this.CardItemList) {
      if (s.Data?.Id !== e) {
        s.SetClickEnable(t);
      }
    }
    if (t) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
  }
  SetCardsDarkExcept(t, e = []) {
    for (const s of this.CardItemList) {
      if (!e.includes(s.Data.Id)) {
        s.SetDark(t);
      }
    }
  }
  SwapCardPositionsSilently(t, e) {
    var s;
    var i;
    var r = this.GetCardItemByCardId(t);
    var o = this.GetCardItemByCardId(e);
    if (r && o && (s = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetCardDataById(e), i = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetCardDataById(t), s) && i) {
      r.UpdateCardData(s);
      o.UpdateCardData(i);
      this.WLf.set(e, r);
      this.WLf.set(t, o);
      this.oLf.SwapCardItemMap(t, e);
      r.RefreshCardItem();
      o.RefreshCardItem();
    }
  }
}
exports.GuessJokerPositionPanelBase = GuessJokerPositionPanelBase;
//# sourceMappingURL=GuessJokerPositionPanelBase.js.map