"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFieldItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaSealItem_1 = require("./PhantomArenaSealItem");
class PhantomArenaFieldItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FieldData = undefined;
    this.SealItem = undefined;
    this.InteractClickCallback = undefined;
    this.FinishSkillInteractClickCallback = undefined;
    this.PointerEnterCallback = undefined;
    this.PointerExitCallback = undefined;
    this.Sequence = undefined;
    this.IsLastInSkillCd = false;
    this.IsLastCanInteract = false;
    this.LastEffectCount = 0;
    this.Uzu = () => {
      this.InteractClickCallback?.(this.FieldData, this);
    };
    this.ki1 = () => {
      this.PointerEnterCallback?.(this.FieldData, this.GetItem(16));
    };
    this.T9m = () => {
      this.PointerExitCallback?.();
    };
    this.$xt = t => {
      if (t === "CdClose") {
        this.GetSprite(7)?.SetUIActive(false);
      } else if (t === "CdStart") {
        this.GetTexture(3).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UITexture], [13, UE.UINiagara], [14, UE.UINiagara], [15, UE.UINiagara], [16, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Uzu]];
  }
  async OnBeforeStartAsync() {
    this.SealItem = new PhantomArenaSealItem_1.PhantomArenaSealItem();
    await this.SealItem.CreateByActorAsync(this.GetItem(10).GetOwner());
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.$xt);
    this.OLf(false);
    var t = this.GetButton(0);
    t.OnPointEnterCallBack.Bind(this.ki1);
    t.OnPointExitCallBack.Bind(this.T9m);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  d7s() {
    if (this.FieldData.HasCountSkill) {
      this.GetItem(8).SetUIActive(true);
      this.GetText(9).SetText(this.FieldData.CurEffectCount + "/" + this.FieldData.MaxEffectCount);
      if (this.FieldData.CurEffectCount === this.FieldData.MaxEffectCount) {
        this.Sequence.PlaySequencePurely("BuffNumFull");
      } else if (this.LastEffectCount < this.FieldData.CurEffectCount) {
        this.Sequence.PlaySequencePurely("BuffNumAdd");
      }
      this.LastEffectCount = this.FieldData.CurEffectCount;
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
  iEc() {
    if (this.IsLastInSkillCd && !this.FieldData.IsInSkillCd) {
      this.GetSprite(3)?.SetUIActive(true);
      this.Sequence.PlaySequence("CdClose");
    } else if (!this.IsLastInSkillCd && this.FieldData.IsInSkillCd) {
      this.GetSprite(7)?.SetUIActive(true);
      this.Sequence.PlaySequence("CdStart");
    }
    this.IsLastInSkillCd = this.FieldData.IsInSkillCd;
  }
  Ijm() {
    if (!this.IsLastCanInteract && this.FieldData.IsCanInteractive) {
      this.Sequence.PlaySequence("Activate");
      this.OLf(true);
    } else if (this.IsLastCanInteract && !this.FieldData.IsCanInteractive) {
      this.OLf(false);
    }
    this.IsLastCanInteract = this.FieldData.IsCanInteractive;
  }
  d1f() {
    var t;
    if (this.FieldData.CardData && !StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldButtonColor)) {
      t = UE.Color.FromHex(this.FieldData.FieldButtonColor);
      this.GetTexture(11).SetColor(t);
      this.GetTexture(12).SetColor(t);
    }
  }
  u1f() {
    var t;
    var i;
    if (this.FieldData.CardData) {
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldNorColor)) {
        t = this.GetUiNiagara(13);
        i = new UE.LinearColor(UE.Color.FromHex(this.FieldData.FieldNorColor));
        t.SetNiagaraVarLinearColor("Base_Color", i);
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.FieldData.FieldActivateColor)) {
        t = this.GetUiNiagara(15);
        i = UE.Color.FromHex(this.FieldData.FieldActivateColor);
        t.SetColor(i);
      }
    }
  }
  async Kbe() {
    var t;
    var i;
    var s;
    var e;
    if (this.FieldData.CardData) {
      t = this.GetTexture(3);
      i = this.GetTexture(6);
      s = this.GetTexture(2);
      e = this.GetTexture(5);
      await Promise.all([this.SetTextureAsync(this.FieldData.FieldIcon, t), this.SetTextureAsync(this.FieldData.FieldActivateIcon, i), this.SetTextureAsync(this.FieldData.FieldRing, s), this.SetTextureAsync(this.FieldData.FieldActivateRing, e)]);
    }
  }
  async m1f() {
    var t;
    if (this.FieldData.CardData) {
      t = this.GetUiNiagara(14);
      await this.SetNiagaraSystemByPathAsync(this.FieldData.FieldActivateElementNiagara, t);
    }
  }
  async wke() {
    if (this.FieldData.IsInSeal) {
      await this.SealItem.ShowSeal(this.FieldData.SealRemainRound);
    } else {
      await this.SealItem.HideSeal();
    }
  }
  OLf(t) {
    this.GetItem(4).SetUIActive(t);
    this.GetItem(1).SetUIActive(!t);
  }
  async Refresh(t) {
    this.FieldData = t;
    await this.RefreshSelf();
  }
  async RefreshSelf() {
    this.d7s();
    this.iEc();
    this.Ijm();
    this.d1f();
    this.u1f();
    await Promise.all([this.m1f(), this.wke(), this.Kbe()]);
  }
  UseSkill() {
    this.Sequence.PlaySequence("Use");
  }
  ResetSkill() {
    this.Sequence.PlaySequencePurely("UnUse");
  }
  SetInteractClickCallback(t) {
    this.InteractClickCallback = t;
  }
  SetFinishSkillInteractCallback(t) {
    this.FinishSkillInteractClickCallback = t;
  }
  SetPointerEnterCallback(t) {
    this.PointerEnterCallback = t;
  }
  SetPointerExitCallback(t) {
    this.PointerExitCallback = t;
  }
  GetFieldDesc() {
    return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.FieldData.CardConfigId).FieldTriggerDesc;
  }
  SetFieldItemActive(t) {
    if (this.FieldData.CardData && t) {
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
  CheckCanvasSortOrder(t, i) {
    return !!t.includes(3) && i.DataId === this.FieldData.CardConfigId;
  }
  HandleSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(2);
  }
  CancelSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(0);
  }
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.CardSkillTriggerInfo;
  }
  FinishSkillInteract() {
    this.FinishSkillInteractClickCallback?.(this.FieldData);
  }
}
exports.PhantomArenaFieldItem = PhantomArenaFieldItem;
//# sourceMappingURL=PhantomArenaFieldItem.js.map