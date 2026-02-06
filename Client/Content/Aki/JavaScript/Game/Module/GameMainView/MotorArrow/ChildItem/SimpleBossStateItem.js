"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleBossStateItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HpBufferStateMachine_1 = require("../../../BattleUi/Views/HeadState/HpBufferStateMachine");
class SimpleBossStateItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.zOg = undefined;
    this.nKu = undefined;
    this.aKu = undefined;
    this.yKd = undefined;
    this.ZOg = 0;
    this.cnt = new HpBufferStateMachine_1.HpBufferStateMachine();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [14, UE.UISprite]];
  }
  OnStart() {
    this.zOg = this.GetText(1);
    this.nKu = this.GetSprite(7);
    this.aKu = this.GetSprite(10);
    this.yKd = this.GetSprite(9);
    this.GetSprite(14).SetUIActive(false);
  }
  OnBeforeShow() {
    this.GetItem(11).SetUIActive(false);
    this.GetText(0).SetUIActive(false);
  }
  OnBeforeHide() {
    this.ist();
  }
  eGg(t) {
    t = t.CurHp / t.MaxHp;
    if (t > 1) {
      return 1;
    } else {
      return t;
    }
  }
  RefreshBossInfo(t) {
    this.ZOg = t.Shield;
    t = this.eGg(t);
    this.cnt.TargetPercent = t;
    this.cnt.CurrentPercent = t;
  }
  SetBossName(t) {
    this.zOg.ShowTextNew(t);
  }
  UpdateHeadStateInfo(t) {
    var i = this.eGg(t);
    this.nKu.SetFillAmount(i);
    this.fst(i);
    var i = this.ZOg === 0 ? 0 : t.Shield / this.ZOg;
    this.gst(i > 1 ? 1 : i);
  }
  fst(t) {
    var i;
    if (t < this.cnt.TargetPercent) {
      i = this.cnt.IsOriginState();
      this.cnt.GetHit(t, this.cnt.CurrentPercent);
      if (i && !this.cnt.IsOriginState()) {
        this.ast(this.cnt.CurrentPercent);
      }
      this.GetItem(8).SetUIActive(true);
    }
  }
  ist() {
    this.GetItem(8).SetUIActive(false);
    this.cnt.Reset();
  }
  ast(t) {
    this.yKd?.SetFillAmount(t);
  }
  gst(t) {
    if (t > 0) {
      this.aKu.SetFillAmount(t);
      this.aKu.SetUIActive(true);
    } else {
      this.aKu.SetUIActive(false);
    }
  }
  OnTick(t) {
    if (!this.cnt.IsOriginState()) {
      if ((t = this.cnt.UpdatePercent(t)) < 0) {
        this.ist();
      } else if (t <= 1) {
        this.ast(t);
      }
    }
  }
}
exports.SimpleBossStateItem = SimpleBossStateItem;
//# sourceMappingURL=SimpleBossStateItem.js.map