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
    this.Aju = [];
    this.ewu = [];
    this.Hcd = 0;
    this.xju = false;
    this.$cd = true;
    this.qju = (t, e) => {
      this.Gju(e);
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
      this.Aju.push(i);
      e.push(i.CreateThenShowByPathAsync(NOTE_ITEM_PATH, s));
    }
    await Promise.all(e);
  }
  OnStart() {}
  Tick(t) {}
  OnBeforeShow() {
    super.OnBeforeShow();
    this.Gju(!!this.TagComponent?.HasTag(burstTag));
    this.fvt();
    this.ktl();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(burstTag, this.qju);
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
    if (t !== this.Hcd) {
      this.Hcd = t;
      this.$cd = true;
    }
  }
  Gju(t) {
    if (this.xju !== t) {
      this.xju = t;
      this.$cd = true;
    }
  }
  ktl() {
    if (this.$cd) {
      this.Vju();
      this.$cd = false;
    }
  }
  Vju() {
    for (let t = this.ewu.length = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var e = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var e = (this.Hcd & 3 << e) >> e;
      if (this.xju || e > 0) {
        this.ewu.push(e);
      }
    }
    for (let t = 0; t < this.Aju.length; t++) {
      var s = this.Aju[t];
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
    this.Wju = -1;
    this.Wcd = false;
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
    if (e !== this.Wju) {
      var s = this.Wju;
      this.Wju = e;
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
        if (this.Wcd) {
          this.PlayTweenAnim(3);
        }
        this.Wcd = false;
      } else if (i) {
        this.PlayTweenAnim(4);
        this.Wcd = true;
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