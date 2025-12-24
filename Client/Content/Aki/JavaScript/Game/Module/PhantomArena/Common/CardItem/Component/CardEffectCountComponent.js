"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardEffectCountComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const CardComponentBase_1 = require("../CardComponentBase");
class CardEffectCountComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Layout = undefined;
    this.Sequence = undefined;
    this.lkm = () => new EffectCountItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILayoutBase], [2, UE.UIItem]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(1), this.lkm, this.GetItem(2).GetOwner());
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  PFm() {
    this.GetText(0).SetText(this.Data.EffectCount + "/" + this.Data.EffectCountMax);
  }
  async Tjm() {
    this.PFm();
    var t = [];
    for (const s of this.Layout.GetLayoutItemList()) {
      t.push(s.FullSequence());
    }
    var e = new CustomPromise_1.CustomPromise();
    t.push(this.Sequence.PlaySequenceAsync("Full", e));
    await Promise.all(t);
  }
  async bjm(e, s) {
    this.PFm();
    var i = this.Layout.GetLayoutItemList();
    var r = [];
    for (let t = e; t < s && !(t >= i.length); t++) {
      r.push(i[t].ActiveSequence());
    }
    await Promise.all(r);
  }
  async Rjm() {
    this.PFm();
    var t = [];
    for (const e of this.Layout.GetLayoutItemList()) {
      t.push(e.ResetSequence());
    }
    await Promise.all(t);
  }
  AFm() {
    var e = [];
    for (let t = 0; t < this.Data.EffectCountMax; t++) {
      var s = {
        IsActive: t < this.Data.EffectCount
      };
      e.push(s);
    }
    this.Layout.RefreshByData(e);
  }
  Refresh(t) {
    var e;
    if (t.InFight) {
      this.SetActive(true);
      e = this.Data?.InFight ?? false;
      if (t.InFight !== e) {
        this.Data = t;
        this.PFm();
        this.AFm();
      }
    } else {
      this.SetActive(false);
    }
  }
  async RefreshEffect(t) {
    var e = this.Data.EffectCountMax;
    var s = this.Data.EffectCount;
    if ((this.Data = t).EffectCount === e) {
      await this.Tjm();
    } else if (t.EffectCount > s) {
      await this.bjm(s, t.EffectCount);
    } else if (t.EffectCount === 0) {
      await this.Rjm();
    }
  }
}
exports.CardEffectCountComponent = CardEffectCountComponent;
class EffectCountItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.$xt = t => {
      if (t === "Use") {
        this.GetItem(2).SetUIActive(false);
        this.GetItem(0).SetUIActive(false);
      } else if (t === "Full") {
        this.GetItem(0).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.$xt);
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  Refresh(t) {
    this.GetItem(0).SetUIActive(t.IsActive);
  }
  async ActiveSequence() {
    this.GetItem(0).SetUIActive(true);
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Add", t);
  }
  async ResetSequence() {
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Use", t);
  }
  async FullSequence() {
    this.GetItem(2).SetUIActive(true);
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Full", t);
  }
}
//# sourceMappingURL=CardEffectCountComponent.js.map