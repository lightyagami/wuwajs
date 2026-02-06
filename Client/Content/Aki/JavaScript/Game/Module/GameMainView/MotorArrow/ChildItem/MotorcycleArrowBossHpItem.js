"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowBossHpItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const DigitScroll_1 = require("../Utilities/DigitScroll");
const MotorcycleUtil_1 = require("../Utilities/MotorcycleUtil");
const SCROLL_DURATION = 500;
class MotorcycleArrowBossHpItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HpArtText = undefined;
    this.ShieldArtText = undefined;
    this.TimeText = undefined;
    this.KOg = new DigitScroll_1.DigitScroll();
    this.XOg = new DigitScroll_1.DigitScroll();
    this.YOg = undefined;
    this.JOg = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIArtText], [2, UE.UIItem], [3, UE.UIArtText], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.HpArtText = this.GetArtText(1);
    this.ShieldArtText = this.GetArtText(3);
    this.TimeText = this.GetText(5);
    this.YOg = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(0));
    this.JOg = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2));
    this.KOg.Init(0, 0, SCROLL_DURATION);
    this.XOg.Init(0, 0, SCROLL_DURATION);
  }
  UpdateHeadStateInfo(e, t = true) {
    var i;
    if (t) {
      t = this.KOg.SetTarget(e.CurHp);
      i = this.XOg.SetTarget(e.Shield);
      if (t < 0) {
        this.YOg?.PlayOrReplaySequenceByName("Hit");
      }
      if (i < 0) {
        this.JOg?.PlayOrReplaySequenceByName("Hit");
      }
    } else {
      this.KOg.Reset(e.CurHp);
      this.XOg.Reset(e.Shield);
      this.GetItem(2).SetUIActive(e.Shield > 0);
    }
    this.HpArtText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(this.KOg.Current));
    this.ShieldArtText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(this.XOg.Current));
  }
  OnTick(e) {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    var t = t.BossFightTime - Time_1.Time.WorldTime + t.BossFightStartTime;
    this.TimeText?.SetText(MotorcycleUtil_1.MotorcycleUtil.TimeFormat(t < 0 ? 0 : t));
    if (!this.KOg.IsFinished()) {
      t = this.KOg.Tick(e);
      this.HpArtText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(t));
    }
    if (!this.XOg.IsFinished()) {
      t = this.XOg.Tick(e);
      this.ShieldArtText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(t));
    }
  }
}
exports.MotorcycleArrowBossHpItem = MotorcycleArrowBossHpItem;
//# sourceMappingURL=MotorcycleArrowBossHpItem.js.map