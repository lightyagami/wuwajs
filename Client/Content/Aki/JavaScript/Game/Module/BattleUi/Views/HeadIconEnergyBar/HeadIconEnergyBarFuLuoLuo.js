"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadIconEnergyBarFuLuoLuo = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const HeadIconEnergyBarBase_1 = require("./HeadIconEnergyBarBase");
const SPECIAL_ENERGY_COUNT = 6;
const burstTag = -968551115;
const NOTE_ITEM_PATH = "/Game/Aki/UI/UIResources/UiFight/Prefabs/EnergyBar/UiItem_BarFuLuoLuoAPoint.UiItem_BarFuLuoLuoAPoint";
class HeadIconEnergyBarFuLuoLuo extends HeadIconEnergyBarBase_1.HeadIconEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Wdt = [];
    this.xQu = [];
    this.ewu = [];
    this.ihd = 0;
    this.BQu = false;
    this.rhd = true;
    this.NQu = (t, e) => {
      this.VQu(e);
      this.ktl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var s = this.GetItem(0 + t);
      this.Wdt.push(s);
      var i = new HeadIconEnergyBarFuLuoLuoNoteItem();
      this.xQu.push(i);
      e.push(i.CreateThenShowByPathAsync(NOTE_ITEM_PATH, s));
    }
    await Promise.all(e);
  }
  OnStart() {}
  Tick(t) {}
  OnBeforeShow() {
    super.OnBeforeShow();
    this.VQu(!!this.TagComponent?.HasTag(burstTag));
    this.fvt();
    this.ktl();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(burstTag, this.NQu);
  }
  RemoveEvents() {
    super.RemoveEvents();
    this.RemoveListenTagAddOrRemove(burstTag);
  }
  OnAttributeChanged() {
    this.fvt();
    this.ktl();
  }
  fvt() {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    if (t !== this.ihd) {
      this.ihd = t;
      this.rhd = true;
    }
  }
  VQu(t) {
    if (this.BQu !== t) {
      this.BQu = t;
      this.rhd = true;
    }
  }
  ktl() {
    if (this.rhd) {
      this.WQu();
      this.rhd = false;
    }
  }
  WQu() {
    for (let t = this.ewu.length = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var e = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var e = (this.ihd & 3 << e) >> e;
      if (this.BQu || e > 0) {
        this.ewu.push(e);
      }
    }
    for (let t = 0; t < this.xQu.length; t++) {
      var s = this.xQu[t];
      var i = this.ewu[t] ?? 0;
      s.SetEnergyType(i);
    }
  }
}
exports.HeadIconEnergyBarFuLuoLuo = HeadIconEnergyBarFuLuoLuo;
class HeadIconEnergyBarFuLuoLuoNoteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.x5e = [];
    this.TweenAnimPlayer = undefined;
    this.YQu = -1;
    this.ohd = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.x5e.push(this.GetItem(0));
    this.x5e.push(this.GetItem(1));
    this.x5e.push(this.GetItem(2));
    for (const t of this.x5e) {
      t.SetUIActive(false);
    }
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
  }
  SetEnergyType(e) {
    if (e !== this.YQu) {
      var s = this.YQu;
      this.YQu = e;
      var t = (s === -1 || s === 0) && e !== 0;
      var i = s !== -1 && s !== 0 && e === 0;
      for (let t = 0; t < this.x5e.length; t++) {
        var r = this.x5e[t];
        if (i && s === t + 1) {
          r.SetUIActive(true);
        } else {
          r.SetUIActive(e === t + 1);
        }
      }
      if (t) {
        if (this.ohd) {
          this.PlayTweenAnim(3);
        }
        this.ohd = false;
      } else if (i) {
        this.PlayTweenAnim(4);
        this.ohd = true;
      }
    }
  }
  InitTweenAnim(t) {
    this.TweenAnimPlayer ||= new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.TweenAnimPlayer?.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer?.StopTweenAnim(t);
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear();
  }
}
//# sourceMappingURL=HeadIconEnergyBarFuLuoLuo.js.map