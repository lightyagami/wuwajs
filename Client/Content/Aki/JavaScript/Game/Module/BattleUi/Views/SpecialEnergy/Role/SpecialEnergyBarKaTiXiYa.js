"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKaTiXiYa = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarKaTiXiYaAdultSlot_1 = require("./SpecialEnergyBarKaTiXiYaAdultSlot");
const SpecialEnergyBarKaTiXiYaSlot_1 = require("./SpecialEnergyBarKaTiXiYaSlot");
const SpecialEnergyBarKaTiXiYaStar_1 = require("./SpecialEnergyBarKaTiXiYaStar");
const ULTRA_CONFIG_ID = 140901;
const ANIM_DURATION = 500;
class SpecialEnergyBarKaTiXiYa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.yIu = undefined;
    this.SIu = undefined;
    this.MIu = undefined;
    this.FA_ = [];
    this.EIu = false;
    this.IIu = false;
    this.rxu = false;
    this.ac = 0;
    this.Gtr = 0;
    this.TIu = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.Nml = false;
    this.bIu = false;
    this.Zyn = (i, t) => {
      this.RIu(t);
    };
    this.wIu = (i, t) => {
      this.LIu(t);
    };
    this.oxu = (i, t) => {
      this.nxu(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem]];
  }
  OnInitData() {
    this.yIu = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(ULTRA_CONFIG_ID);
    this.AttributeId = this.yIu.AttributeId;
    this.MaxAttributeId = this.yIu.MaxAttributeId;
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(1907158625, this.Zyn);
    this.ListenForTagAddOrRemoveChanged(328684835, this.wIu);
    this.ListenForTagAddOrRemoveChanged(1623495273, this.oxu);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    await Promise.all(i);
  }
  async InitBarItem() {
    this.SIu = new SpecialEnergyBarKaTiXiYaSlot_1.SpecialEnergyBarKaTiXiYaSlot();
    this.SIu.InitData(this.RoleData, this.Config);
    this.SIu.UiKeyItem = this.GetItem(6);
    await this.SIu.InitByActorAsync(this.GetItem(0).GetOwner());
    this.MIu = new SpecialEnergyBarKaTiXiYaAdultSlot_1.SpecialEnergyBarKaTiXiYaAdultSlot();
    this.MIu.InitData(this.RoleData, this.yIu);
    this.MIu.ForceHideBottomLine = true;
    await this.MIu.InitByActorAsync(this.GetItem(3).GetOwner());
    var i = new SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar();
    await i.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.FA_.push(i);
    var i = new SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar();
    await i.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.FA_.push(i);
  }
  OnStart() {
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.InitTweenAnim(12);
    this.InitTweenAnim(13);
    this.InitTweenAnim(14);
    this.InitTweenAnim(15);
    this.InitTweenAnim(16);
    this.GetItem(0)?.SetAlpha(1);
    this.GetItem(1)?.SetAlpha(1);
    this.GetItem(17)?.SetAlpha(1);
    this.GetItem(2)?.SetAlpha(1);
    this.RIu(this.TagComponent?.HasTag(1907158625) ?? false, true);
    this.LIu(this.TagComponent?.HasTag(328684835) ?? false, true);
    this.nxu(this.TagComponent?.HasTag(1623495273) ?? false, true);
    this._Oe(true);
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(15);
    super.ClearAllTweenAnim();
  }
  RIu(i, t = false) {
    if ((i !== this.EIu || !!t) && !(this.EIu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅凭依状态", ["状态", i]), t)) {
      this._Oe();
    }
  }
  LIu(i, t = false) {
    if ((i !== this.IIu || !!t) && !(this.IIu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅大小形态", ["大形态", i]), t)) {
      this._Oe();
    }
  }
  nxu(i, t = false) {
    if ((i !== this.rxu || !!t) && !(this.rxu = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅大招变身技能期间", ["状态", i]), t)) {
      this._Oe();
    }
  }
  _Oe(i = false) {
    let t = 0;
    if (this.IIu || this.rxu && this.EIu) {
      t = 1;
    } else if (this.EIu) {
      t = 2;
    }
    if (this.ac !== t || i) {
      this.ac = t;
      if (i) {
        switch (this.ac) {
          case 0:
            this.PlayTweenAnim(12);
            break;
          case 1:
            this.PlayTweenAnim(13);
            break;
          case 2:
            this.PlayTweenAnim(14);
        }
        this.Gtr = this.ac;
      }
      this.GetItem(6)?.SetUIActive(this.ac !== 1);
      this.GetItem(0)?.SetUIActive(this.ac !== 1);
    }
  }
  AIu() {
    if (this.Gtr !== this.ac && !(Time_1.Time.WorldTime < this.TIu)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarKaTiXiYa]卡提希娅播放状态切换动画", ["当前状态", this.ac], ["旧状态", this.Gtr]);
      }
      switch (this.ac) {
        case 0:
          if (this.Gtr === 1) {
            this.PlayTweenAnim(8);
          } else {
            this.PlayTweenAnim(11);
          }
          break;
        case 1:
          if (this.Gtr === 0) {
            this.PlayTweenAnim(7);
          } else {
            this.PlayTweenAnim(10);
          }
          break;
        case 2:
          if (this.Gtr === 0) {
            this.PlayTweenAnim(14);
          } else {
            this.PlayTweenAnim(9);
          }
      }
      this.Gtr = this.ac;
      this.TIu = Time_1.Time.WorldTime + ANIM_DURATION;
    }
  }
  Tick(i) {
    super.Tick(i);
    this.SIu?.Tick(i);
    this.MIu?.Tick(i);
    this.AIu();
    if (this.EIu) {
      if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
        this.tst();
      }
      if (this.bst) {
        var t = this.bst.GetRemainDuration();
        var s = Math.ceil(t / this.bst.Duration * SpecialEnergyBarKaTiXiYaStar_1.SpecialEnergyBarKaTiXiYaStar.StarTotalNum);
        this.bMc(this.IIu && t < this.yIu.ExtraFloatParams[0] && s <= 1);
        for (const h of this.FA_) {
          h.SetStarNum(s);
        }
      } else {
        this.bMc(false);
        for (const a of this.FA_) {
          a.SetStarNum(0);
        }
      }
    } else {
      this.bMc(false);
      for (const e of this.FA_) {
        e.SetStarNum(0);
      }
    }
    for (const r of this.FA_) {
      r.Tick(i);
    }
  }
  tst() {
    if (this.yIu?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(this.yIu.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
  bMc(i) {
    if (this.Nml !== i) {
      if (this.Nml = i) {
        this.PlayTweenAnim(15);
      } else {
        this.StopTweenAnim(15);
        this.GetItem(17)?.SetAlpha(1);
        this.GetItem(2)?.SetAlpha(1);
      }
    }
  }
  OnBarPercentChanged() {
    var i = this.PercentMachine.GetCurPercent();
    this.PIu(i >= 1);
  }
  PIu(i) {
    if (this.bIu !== i && (this.bIu = i) && this.ac === 1) {
      this.PlayTweenAnim(16);
    }
  }
}
exports.SpecialEnergyBarKaTiXiYa = SpecialEnergyBarKaTiXiYa;
//# sourceMappingURL=SpecialEnergyBarKaTiXiYa.js.map