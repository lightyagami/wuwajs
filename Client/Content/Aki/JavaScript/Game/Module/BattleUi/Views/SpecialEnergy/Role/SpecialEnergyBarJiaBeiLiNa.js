"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarJiaBeiLiNa = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarJiaBeiLiNaMorphSlot_1 = require("./SpecialEnergyBarJiaBeiLiNaMorphSlot");
const SpecialEnergyBarJiaBeiLiNaSlot_1 = require("./SpecialEnergyBarJiaBeiLiNaSlot");
const MORPH_CONFIG_ID = 120801;
const SUB_CONFIG_ID = 120802;
const morphTagId = 332111384;
const EXTRA_SUB_BUFF_ID = 1208003423;
class SpecialEnergyBarJiaBeiLiNa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.ps1 = undefined;
    this.sdm = undefined;
    this.pMc = undefined;
    this.vs1 = undefined;
    this._ii = 0;
    this.bst = undefined;
    this.p2a = 0;
    this.adm = false;
    this.hdm = -1;
    this.ldm = [false, false];
    this.Ss1 = (i, t) => {
      this.Owt(t ? 1 : 0, false);
    };
    this._dm = (i, t) => {
      this.adm = t;
    };
    this.udm = (i, t) => {
      t = t >= 1;
      if (this.ldm[i] !== t && (this.ldm[i] = t)) {
        this.PlayTweenAnim(i === 0 ? 9 : 10);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UINiagara]];
  }
  OnInitData() {
    this.ps1 = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(MORPH_CONFIG_ID);
    this.sdm = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(SUB_CONFIG_ID);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(morphTagId, this.Ss1);
    this.ListenForTagAddOrRemoveChanged(this.sdm.KeyEnableTagId, this._dm);
  }
  async OnBeforeStartAsync() {
    var i = [];
    i.push(this.InitBarItem());
    await Promise.all(i);
  }
  async InitBarItem() {
    this.pMc = new SpecialEnergyBarJiaBeiLiNaSlot_1.SpecialEnergyBarJiaBeiLiNaSlot();
    this.pMc.InitData(this.RoleData, this.Config);
    this.pMc.ForceHideBottomLine = true;
    this.pMc.PercentCallback = this.udm;
    await this.pMc.InitByActorAsync(this.GetItem(5).GetOwner());
    this.vs1 = new SpecialEnergyBarJiaBeiLiNaMorphSlot_1.SpecialEnergyBarJiaBeiLiNaMorphSlot();
    this.vs1.InitData(this.RoleData, this.ps1, false);
    this.vs1.ForceHideBottomLine = true;
    await this.vs1.InitByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(11);
    this.InitTweenAnim(12);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.PlayTweenAnim(8);
    for (let i = 0; i < this.ldm.length; i++) {
      if (this.ldm[i]) {
        this.PlayTweenAnim(i === 0 ? 9 : 10);
      }
    }
    this._Oe(true);
    this.OnBarPercentChanged();
    this.cdm(true);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.GetUiNiagara(13)?.SetUIActive(false);
  }
  cdm(i = false) {
    let t = 0;
    if ((t = this.adm && (this.bst && this.BuffComponent?.GetBuffByHandle(this.p2a) || this.tst(), this.bst) ? this.bst.GetRemainDuration() / this.bst.Duration : t) !== this.hdm || !!i) {
      this.hdm = t;
      this.GetSprite(6)?.SetFillAmount(t);
      this.GetSprite(2)?.SetFillAmount(t);
      this.GetItem(7)?.SetAnchorOffsetX((t - 0.5) * 320);
      this.GetItem(3)?.SetAnchorOffsetX((t - 0.5) * 289);
    }
  }
  _Oe(i = false) {
    if (this.TagComponent?.HasTag(morphTagId)) {
      this.Owt(1, i);
    } else {
      this.Owt(0, i);
    }
    this.adm = this.TagComponent?.HasTag(this.sdm.KeyEnableTagId) ?? false;
  }
  Owt(i, t = false) {
    if (i !== this._ii || t) {
      this._ii = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "嘉贝莉娜能量条改变状态", ["强化", i]);
      }
      switch (this._ii) {
        case 0:
          if (!t) {
            this.StopTweenAnim(11);
            this.PlayTweenAnim(12);
          }
          break;
        case 1:
          if (!t) {
            this.StopTweenAnim(12);
          }
          this.PlayTweenAnim(11);
      }
    }
  }
  Tick(i) {
    super.Tick(i);
    this.pMc?.Tick(i);
    this.vs1?.Tick(i);
    this.cdm();
  }
  tst() {
    if (this.sdm?.BuffId) {
      this.bst = this.BuffComponent?.GetBuffById(EXTRA_SUB_BUFF_ID);
      this.bst ||= this.BuffComponent?.GetBuffById(this.sdm.BuffId);
      this.p2a = this.bst?.Handle ?? 0;
    } else {
      this.bst = undefined;
      this.p2a = 0;
    }
  }
}
exports.SpecialEnergyBarJiaBeiLiNa = SpecialEnergyBarJiaBeiLiNa;
//# sourceMappingURL=SpecialEnergyBarJiaBeiLiNa.js.map