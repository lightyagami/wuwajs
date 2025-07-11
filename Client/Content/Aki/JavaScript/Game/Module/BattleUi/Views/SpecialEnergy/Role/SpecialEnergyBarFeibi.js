"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarFeibi = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarFeibiSlot_1 = require("./SpecialEnergyBarFeibiSlot");
const YELLOW_CONFIG_ID = 150602;
const BLUE_CONFIG_ID = 150603;
class SpecialEnergyBarFeibi extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Yj_ = undefined;
    this.zj_ = undefined;
    this.Jj_ = undefined;
    this.Zj_ = undefined;
    this._ii = 0;
    this.lne = (i, t) => {
      this._Oe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [12, UE.UIItem]];
  }
  OnInitData() {
    this.Yj_ = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(YELLOW_CONFIG_ID);
    this.zj_ = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(BLUE_CONFIG_ID);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(-1970535311, this.lne);
    this.ListenForTagAddOrRemoveChanged(-1593146607, this.lne);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    i.push(this.InitKeyItem(this.GetItem(12)));
    await Promise.all(i);
  }
  async InitBarItem() {
    this.Jj_ = new SpecialEnergyBarFeibiSlot_1.SpecialEnergyBarFeibiSlot();
    this.Jj_.InitData(this.RoleData, this.Yj_);
    await this.Jj_.InitByActorAsync(this.GetItem(3).GetOwner());
    this.Zj_ = new SpecialEnergyBarFeibiSlot_1.SpecialEnergyBarFeibiSlot();
    this.Zj_.InitData(this.RoleData, this.zj_);
    await this.Zj_.InitByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(13);
    this.InitTweenAnim(14);
    this._Oe(true);
    this.Gdl(true);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Gdl(i = false) {
    var t = this.PercentMachine.GetCurPercent();
    switch (this._ii) {
      case 0:
        this.GetTexture(11)?.SetFillAmount(t);
        this.Odl(i);
        break;
      case 1:
        this.GetTexture(5)?.SetFillAmount(t);
        break;
      case 2:
        this.GetTexture(4)?.SetFillAmount(t);
    }
  }
  OnKeyEnableChanged() {
    this.Odl();
  }
  Odl(i = false) {
    var t = this.GetKeyEnable();
    this.KeyItem?.RefreshKeyEnable(t, i);
  }
  _Oe(i = false) {
    if (this.TagComponent?.HasTag(-1970535311)) {
      this.Owt(1, i);
    } else if (this.TagComponent?.HasTag(-1593146607)) {
      this.Owt(2, i);
    } else {
      this.Owt(0, i);
    }
    if (!i) {
      this.Gdl();
    }
  }
  Owt(i, t = false) {
    if (i !== this._ii || t) {
      this._ii = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "菲比能量条改变状态", ["觉醒", i]);
      }
      switch (this._ii) {
        case 0:
          this.GetItem(10)?.SetUIActive(true);
          this.GetItem(1)?.SetUIActive(false);
          this.GetItem(0)?.SetUIActive(false);
          this.GetItem(12)?.SetUIActive(true);
          if (!t) {
            this.StopTweenAnim(13);
            this.PlayTweenAnim(14);
          }
          break;
        case 1:
          this.GetItem(10)?.SetUIActive(false);
          this.GetItem(1)?.SetUIActive(true);
          this.GetItem(0)?.SetUIActive(false);
          this.GetItem(12)?.SetUIActive(false);
          if (!t) {
            this.StopTweenAnim(14);
            this.PlayTweenAnim(13);
          }
          break;
        case 2:
          this.GetItem(10)?.SetUIActive(false);
          this.GetItem(1)?.SetUIActive(false);
          this.GetItem(0)?.SetUIActive(true);
          this.GetItem(12)?.SetUIActive(false);
          if (!t) {
            this.StopTweenAnim(14);
            this.PlayTweenAnim(13);
          }
      }
    }
  }
  Tick(i) {
    super.Tick(i);
    this.Jj_?.Tick(i);
    this.Zj_?.Tick(i);
  }
}
exports.SpecialEnergyBarFeibi = SpecialEnergyBarFeibi;
//# sourceMappingURL=SpecialEnergyBarFeibi.js.map