"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarZanni = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarZanniSlot_1 = require("./SpecialEnergyBarZanniSlot");
const MORPH_CONFIG_ID = 150701;
class SpecialEnergyBarZanni extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.ps1 = undefined;
    this.pMc = undefined;
    this.vs1 = undefined;
    this._ii = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.Nml = false;
    this.ys1 = false;
    this.Ss1 = (i, t) => {
      this.Owt(t ? 1 : 0, false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[5, UE.UIItem], [6, UE.UIItem], [0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  OnInitData() {
    this.ps1 = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(MORPH_CONFIG_ID);
    this.AttributeId = this.ps1.AttributeId;
    this.MaxAttributeId = this.ps1.MaxAttributeId;
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(157472352, this.Ss1);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    await Promise.all(i);
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarZanniSlot_1.SpecialEnergyBarZanniSlot();
    this.pMc.InitData(this.RoleData, this.Config);
    this.pMc.ForceHideBottomLine = true;
    this.pMc.BottomLineLight = this.GetItem(2);
    this.pMc.DarkItemList.push(this.GetItem(12));
    this.pMc.DarkItemList.push(this.GetItem(13));
    await this.pMc.InitByActorAsync(this.GetItem(0).GetOwner());
    this.vs1 = new SpecialEnergyBarZanniSlot_1.SpecialEnergyBarZanniSlot();
    this.vs1.InitData(this.RoleData, this.ps1);
    this.vs1.ForceHideBottomLine = true;
    this.vs1.FullEffectWhenEnable = true;
    await this.vs1.InitByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.GetItem(6)?.SetAlpha(1);
    this._Oe(true);
    this.OnBarPercentChanged();
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(11);
    super.ClearAllTweenAnim();
  }
  OnBarPercentChanged() {
    var i = this.PercentMachine.GetCurPercent();
    this.GetSprite(1)?.SetFillAmount(i);
    var i = i >= this.ps1.ExtraFloatParams[1];
    if (this.ys1 !== i) {
      this.ys1 = i;
      this.PlayTweenAnim(i ? 9 : 10);
    }
  }
  _Oe(i = false) {
    if (this.TagComponent?.HasTag(157472352)) {
      this.Owt(1, i);
    } else {
      this.Owt(0, i);
    }
  }
  Owt(i, t = false) {
    if (i !== this._ii || t) {
      this._ii = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "赞妮能量条改变状态", ["强化", i]);
      }
      switch (this._ii) {
        case 0:
          if (t) {
            this.GetItem(5)?.SetUIActive(true);
            this.GetItem(6)?.SetUIActive(false);
          } else {
            this.PlayTweenAnim(8);
          }
          break;
        case 1:
          if (t) {
            this.GetItem(5)?.SetUIActive(false);
            this.GetItem(6)?.SetUIActive(true);
          } else {
            this.PlayTweenAnim(7);
          }
      }
    }
  }
  Tick(i) {
    super.Tick(i);
    this.pMc?.Tick(i);
    this.vs1?.Tick(i);
    if (this._ii === 0) {
      this.bMc(false);
    } else {
      if (!this.bst || !this.BuffComponent?.GetBuffByHandle(this.p2a)) {
        this.tst();
      }
      if (this.bst) {
        this.bMc(this.bst.GetRemainDuration() < this.ps1.ExtraFloatParams[0]);
      }
    }
  }
  tst() {
    if (this.ps1?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(this.ps1.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
  bMc(i) {
    if (this.Nml !== i) {
      if (this.Nml = i) {
        this.PlayTweenAnim(11);
      } else {
        this.StopTweenAnim(11);
        this.GetItem(6)?.SetAlpha(1);
      }
    }
  }
}
exports.SpecialEnergyBarZanni = SpecialEnergyBarZanni;
//# sourceMappingURL=SpecialEnergyBarZanni.js.map