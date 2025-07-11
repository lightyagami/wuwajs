"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarKanTeLeiLa = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarKanTeLeiLaSlot_1 = require("./SpecialEnergyBarKanTeLeiLaSlot");
const NORMAL_CONFIG_ID = 160701;
const PINK_CONFIG_ID = 160702;
const COLORFUL_CONFIG_ID = 160703;
const POINT_NUM = 3;
class SpecialEnergyBarKanTeLeiLa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.fMc = undefined;
    this.gMc = undefined;
    this.CMc = undefined;
    this.pMc = undefined;
    this.vMc = undefined;
    this.yMc = undefined;
    this.SMc = [];
    this.MMc = [];
    this.HMc = 0;
    this._ii = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.Nml = false;
    this.eEc = false;
    this.L31 = false;
    this.EMc = (i, t) => {
      this.L31 = true;
    };
    this.IMc = (i, t) => {
      this.L31 = true;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem]];
  }
  OnInitData() {
    this.fMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(NORMAL_CONFIG_ID);
    this.gMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(PINK_CONFIG_ID);
    this.CMc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(COLORFUL_CONFIG_ID);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(-1737183401, this.EMc);
    this.ListenForTagAddOrRemoveChanged(-8248787, this.IMc);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    await Promise.all(i);
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot();
    this.pMc.InitData(this.RoleData, this.fMc);
    this.pMc.FullEffectForceDisable = true;
    this.pMc.ForceHideBottomLine = true;
    await this.pMc.InitByActorAsync(this.GetItem(10).GetOwner());
    this.vMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot();
    this.vMc.InitData(this.RoleData, this.gMc);
    this.vMc.ForceHideBottomLine = true;
    await this.vMc.InitByActorAsync(this.GetItem(11).GetOwner());
    this.yMc = new SpecialEnergyBarKanTeLeiLaSlot_1.SpecialEnergyBarKanTeLeiLaSlot();
    this.yMc.InitData(this.RoleData, this.CMc);
    this.yMc.ForceHideBottomLine = true;
    await this.yMc.InitByActorAsync(this.GetItem(12).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(13);
    this.InitTweenAnim(14);
    this.InitTweenAnim(15);
    this.InitTweenAnim(16);
    this.InitTweenAnim(17);
    this.InitTweenAnim(18);
    this.InitTweenAnim(19);
    this.InitTweenAnim(20);
    this.InitTweenAnim(21);
    this.InitTweenAnim(22);
    this.InitTweenAnim(24);
    this.SMc.push(this.GetItem(0));
    this.SMc.push(this.GetItem(1));
    this.SMc.push(this.GetItem(2));
    this.MMc.push(this.GetItem(3));
    this.MMc.push(this.GetItem(4));
    this.MMc.push(this.GetItem(5));
    this.GetItem(7)?.SetAlpha(1);
    this._Oe(true);
    this.TMc(true);
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(18);
    super.ClearAllTweenAnim();
  }
  OnAttributeChanged() {
    this.TMc();
  }
  OnMaxAttributeChanged() {}
  _Oe(i = false) {
    var t = this.TagComponent?.HasTag(-8248787) ?? false;
    if (this.TagComponent?.HasTag(-1737183401)) {
      if (t) {
        this.Owt(1, i);
      } else {
        this.Owt(2, i);
      }
    } else {
      this.Owt(0, i);
    }
    if (this.eEc !== t || !!i) {
      this.eEc = t;
      this.JRc(i);
    }
  }
  JRc(i = false) {
    var t = !this.eEc;
    if (i || this._ii !== 0) {
      this.GetItem(23)?.SetUIActive(t);
      this.GetItem(23)?.SetAlpha(t ? 1 : 0);
    } else if (t) {
      this.PlayTweenAnim(24);
    }
  }
  Owt(i, t = false) {
    if (i !== this._ii || t) {
      var s = this._ii;
      this._ii = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "坎特雷拉能量条改变状态", ["强化", i]);
      }
      switch (this._ii) {
        case 0:
          if (t) {
            this.GetItem(6)?.SetUIActive(true);
            this.GetItem(7)?.SetUIActive(false);
          } else {
            this.StopTweenAnim(13);
            this.PlayTweenAnim(14);
            if (s === 2) {
              this.StopTweenAnim(15);
              this.PlayTweenAnim(16);
            }
          }
          break;
        case 1:
          this.GetItem(9)?.SetUIActive(false);
          this.GetItem(8)?.SetUIActive(true);
          this.GetItem(8)?.SetAlpha(1);
          if (t) {
            this.GetItem(6)?.SetUIActive(false);
            this.GetItem(7)?.SetUIActive(true);
          } else if (s === 0) {
            this.StopTweenAnim(14);
            this.PlayTweenAnim(13);
            this.GetItem(9)?.SetUIActive(false);
            this.GetItem(8)?.SetUIActive(true);
          } else {
            this.StopTweenAnim(15);
            this.PlayTweenAnim(16);
          }
          break;
        case 2:
          if (t) {
            this.GetItem(6)?.SetUIActive(false);
            this.GetItem(7)?.SetUIActive(true);
            this.GetItem(9)?.SetUIActive(true);
            this.GetItem(8)?.SetUIActive(false);
          } else {
            if (s === 0) {
              this.StopTweenAnim(14);
              this.PlayTweenAnim(13);
              this.GetItem(9)?.SetUIActive(true);
              this.GetItem(8)?.SetUIActive(false);
            }
            this.StopTweenAnim(16);
            this.PlayTweenAnim(15);
          }
      }
      if (!t && (s === 2 || this._ii === 2)) {
        this.TMc(true);
        if (this._ii === 2) {
          this.PlayTweenAnim(19);
        }
      }
    }
  }
  TMc(i = false) {
    var t = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    if (i || this.HMc !== t) {
      for (let i = 0; i < POINT_NUM; i++) {
        var s = t > i;
        var h = this._ii === 2 && t === POINT_NUM;
        this.SMc[i].SetUIActive(s && !h);
        this.MMc[i].SetUIActive(s && h);
        if (s && this.HMc <= i) {
          this.PlayTweenAnim(20 + i);
        }
      }
      if (t < this.HMc) {
        this.PlayTweenAnim(17);
      }
      this.HMc = t;
    }
  }
  Tick(i) {
    super.Tick(i);
    this.pMc?.Tick(i);
    this.vMc?.Tick(i);
    this.yMc?.Tick(i);
    if (this.L31) {
      this._Oe();
      this.L31 = false;
    }
    if (this._ii === 0) {
      this.bMc(false);
    } else {
      if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
        this.tst();
      }
      if (this.bst) {
        this.bMc(this.bst.GetRemainDuration() < this.Config.ExtraFloatParams[0]);
      }
    }
  }
  tst() {
    if (this.Config?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(this.Config.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
  bMc(i) {
    if (this.Nml !== i) {
      if (this.Nml = i) {
        this.PlayTweenAnim(18);
      } else {
        this.StopTweenAnim(18);
        this.GetItem(7)?.SetAlpha(1);
      }
    }
  }
}
exports.SpecialEnergyBarKanTeLeiLa = SpecialEnergyBarKanTeLeiLa;
//# sourceMappingURL=SpecialEnergyBarKanTeLeiLa.js.map