"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityDamageHeadState = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class DurabilityDamageHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.Wlt = -0;
    this.Klt = false;
    this.SPe = undefined;
    this.Qlt = t => {
      this.Xlt(this.$lt(), true);
    };
    this.Ylt = () => {
      var t = this.GetUiNiagara(5);
      if (this.Klt && t && !t.NiagaraComponent?.IsActive()) {
        t.SetNiagaraUIActive(true, true);
        t.ActivateSystem(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UINiagara], [6, UE.UINiagara]];
  }
  GetResourceId() {
    return "UiItem_BarSandBag";
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t);
    this.GetSprite(0).SetUIActive(true);
    this.GetSprite(1).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    this.GetSprite(4).SetUIActive(false);
    this.GetUiNiagara(5).SetNiagaraUIActive(false, true);
    this.GetUiNiagara(6).SetNiagaraUIActive(false, true);
    this.Klt = false;
    this.Wlt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
    if (t.OriginalHp) {
      this.CurrentBarPercent = t.OriginalHp / this.GetMaxHp();
      this.Jlt(this.CurrentBarPercent);
    } else {
      this.Jlt(1);
    }
    this.Xlt(this.$lt(), true);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  BindCallback() {
    super.BindCallback();
    this.HeadStateData.BindOnSceneItemDurabilityChange(this.Qlt);
    this.HeadStateData.BindOnSceneItemEntityHit(this.Ylt);
  }
  Xlt(t, e = false) {
    var i;
    if (t <= 0) {
      i = this.CurrentBarPercent > 0;
      this.Jlt(t);
      this.zlt(i);
    } else if (e) {
      this.Zlt(t);
      this.PlayBarAnimation(t);
      this.SPe?.StopCurrentSequence(true, true);
      this.SPe?.PlayLevelSequenceByName("Increase");
    } else {
      this.Jlt(t);
    }
    this.HeadStateData?.SetOriginalHp(this.GetHp());
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation();
    this.GetSprite(1).SetUIActive(false);
    this.SPe?.StopSequenceByKey("Increase", true, true);
  }
  OnLerpBarBufferPercent(t) {
    this.e1t(t);
  }
  Jlt(t) {
    this.Zlt(t);
    this.e1t(t);
    this.StopBarLerpAnimation();
  }
  Zlt(t) {
    var e = 1 - t;
    var i = this.GetSprite(1);
    var s = this.GetSprite(2);
    i.SetFillAmount(e);
    s.SetStretchRight(this.Wlt * t - 2);
    if (!i.IsUIActiveSelf()) {
      i.SetUIActive(true);
    }
  }
  e1t(t) {
    var t = 1 - t;
    var e = this.GetSprite(1);
    var i = this.GetSprite(2);
    var s = this.GetSprite(3);
    i.SetStretchLeft(this.Wlt * t - 2);
    s.SetFillAmount(t);
    if (!e.IsUIActiveSelf()) {
      e.SetUIActive(true);
    }
    if (!s.IsUIActiveSelf()) {
      s.SetUIActive(true);
    }
  }
  zlt(t) {
    if (this.HeadStateType === 7) {
      if (t) {
        this.GetUiNiagara(6).SetNiagaraUIActive(true, true);
      }
      this.GetSprite(0).SetUIActive(false);
      this.GetSprite(3).SetUIActive(false);
      this.GetSprite(1).SetUIActive(false);
      this.GetSprite(4).SetUIActive(false);
    } else if (this.HeadStateType === 8) {
      if (!(t = this.GetSprite(4)).IsUIActiveSelf()) {
        t.SetUIActive(true);
      }
      this.Klt = true;
    }
  }
  $lt() {
    return this.GetHp() / this.GetMaxHp();
  }
  GetMaxHp() {
    return this.HeadStateData.GetMaxDurable();
  }
  GetHp() {
    return this.HeadStateData.GetDurable();
  }
}
exports.DurabilityDamageHeadState = DurabilityDamageHeadState;
//# sourceMappingURL=DurabilityDamageHeadState.js.map