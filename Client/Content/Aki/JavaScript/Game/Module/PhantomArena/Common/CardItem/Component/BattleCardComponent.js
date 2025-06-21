"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EvolveItem = exports.BattleCardComponent = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../../Battle/PhantomArenaDefine"),
  CardComponentBase_1 = require("../CardComponentBase"),
  CardElementItem_1 = require("../Item/CardElementItem");
class BattleCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments), this.CardClickCallback = void 0, this.aho = void 0, this.Sequence = void 0, this.Data = void 0, this.LoopEffectItem = void 0, this.EffectItem = void 0, this.SpineItem = void 0, this.NormalEvolveItem = void 0, this.GoldEvolveItem = void 0, this.mi1 = t => {
      this.CardClickCallback(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.mi1]
    ]
  }
  async InitElement() {
    this.aho = new CardElementItem_1.CardElementItem, await this.aho.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())
  }
  async OnBeforeStartAsync() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2)), await this.InitElement()
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2))
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  gou(t, e) {
    var i = this.Data.GetFightValueByAttr(t),
      t = this.Data.ValueChangeTypeByBuff(t);
    0 === t ? e.SetText(i.toString()) : 1 === t ? LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1101", i) : LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1102", i)
  }
  GD1() {
    var t = this.GetText(1);
    this.gou(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility, t)
  }
  FD1() {
    var t = this.GetText(3);
    this.gou(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility, t)
  }
  RGt() {
    var t = this.GetText(4);
    this.gou(Protocol_1.Aki.Protocol.gC1.Proto_CostAbility, t)
  }
  Hxt() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId).Element;
    this.aho.Refresh(t)
  }
  sbi() {
    this.GetItem(13)?.SetUIActive(!this.Data.IsFourCost), this.GetItem(14)?.SetUIActive(this.Data.IsFourCost)
  }
  Cou() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId),
      e = ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId);
    this.GetItem(10).SetUIActive(0 !== t.Element && !e), this.GetItem(16).SetUIActive(0 !== t.Element && e)
  }
  pou() {
    var t = ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId);
    this.GetItem(15).SetUIActive(!t), this.GetItem(17).SetUIActive(t)
  }
  async dnu() {
    var t, e = this.GetTexture(8);
    this.SpineItem ? (e.SetUIActive(!1), await this.SpineItem.RefreshSpineById(this.Data.ConfigId)) : (e.SetUIActive(!0), t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId), await this.SetTextureAsync(t.CardFaceTexture, e))
  }
  async Ysu() {
    var t = this.Data.EvolveNum;
    0 === t || this.GoldEvolveItem || (this.GoldEvolveItem = new EvolveProxy, await this.GoldEvolveItem.CreateEffectItem("PnlEvolution2", this.GetItem(11))), this.GoldEvolveItem?.SetEvolveNum(t), this.NormalEvolveItem?.SetEvolveNum(0)
  }
  async zsu() {
    var t = this.Data.EvolveNum;
    0 === t || this.NormalEvolveItem || (this.NormalEvolveItem = new EvolveProxy, await this.NormalEvolveItem.CreateEffectItem("PnlEvolution1", this.GetItem(11))), this.NormalEvolveItem?.SetEvolveNum(t), this.GoldEvolveItem?.SetEvolveNum(0)
  }
  Jsu() {
    this.GetItem(19)?.SetUIActive(0 !== this.Data.UseCost), this.GetItem(5)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_ONE), this.GetItem(6)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE), this.GetItem(20)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE)
  }
  async Zsu() {
    ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId) ? await this.Ysu() : await this.zsu()
  }
  SetCardData(t) {
    this.Data = t
  }
  async umu() {
    this.LoopEffectItem = new BattleCardLoopEffectItem, this.LoopEffectItem.SetCardConfigId(this.Data.ConfigId), await this.LoopEffectItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemLoopEffect", this.GetItem(18))
  }
  async cmu() {
    this.EffectItem = new BattleCardEffectItem, this.EffectItem.SetCardConfigId(this.Data.ConfigId), await this.EffectItem.CreateByResourceIdAsync("UiItem_SoundRemnantItemEffect", this.GetItem(11))
  }
  async InitEffect() {
    this.Data.IsFourCost && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId) && await Promise.all([this.umu(), this.cmu()])
  }
  async InitSpine() {
    this.Data.IsFourCost && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId) && (this.SpineItem = new BattleCardSpineItem, this.SpineItem.SetCardConfigId(this.Data.ConfigId), await this.SpineItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemSpine", this.GetItem(18)))
  }
  SetDebugText() {
    var t, e = this.GetText(9);
    GlobalData_1.GlobalData.IsPlayInEditor ? (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId), e.SetUIActive(!0), e.SetText(`卡牌ID:  ${this.Data.CardId}
配置ID:  ${this.Data.ConfigId}
进化次数:  ${this.Data.EvolveNum}
被动技能Id:  ${t.PassiveSkillId}
主动技能Id:  ${t.ActiveSkillId}
卡牌因子:  ${[...t.CardFactorId,...this.Data.ExtraFactors]}
实体配置Id:  ${t.EntityConfigId}
卡牌上阵倾向:  ` + t.SlotTendency)) : e.SetUIActive(!1)
  }
  PlaySpineAnim(t, e) {
    this.SpineItem?.PlaySpineAnim(t, e)
  }
  Refresh(t) {
    this.RefreshAsync(t)
  }
  async RefreshAsync(t) {
    this.Data = t, this.GD1(), this.FD1(), this.RGt(), this.Hxt(), this.SetDebugText(), this.sbi(), this.Cou(), this.pou(), this.Jsu(), await Promise.all([this.Zsu(), this.dnu(), this.LoopEffectItem?.RefreshEffectById(t.ConfigId), this.EffectItem?.RefreshEffectById(t.ConfigId)])
  }
  GetCardToggle() {
    return this.GetExtendToggle(0)
  }
  GetTweenItem() {
    return this.GetItem(12)
  }
  PlaySequence(t) {
    this.Sequence.IsSequenceInPlaying(t) || (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely(t))
  }
  PlayEffect() {
    this.EffectItem?.PlayStartEffect()
  }
}
exports.BattleCardComponent = BattleCardComponent;
class BattleCardLoopEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.CardConfigId = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UINiagara]
    ]
  }
  async RefreshNiagara(t, e) {
    StringUtils_1.StringUtils.IsBlank(t) ? e.SetUIActive(!1) : (await this.SetNiagaraSystemByPathAsync(t, e), e.SetUIActive(!0))
  }
  async OnBeforeStartAsync() {
    await this.NU1(this.CardConfigId)
  }
  async NU1(t) {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardConfigId);
    await this.RefreshNiagara(e.AtmosphereEffect, this.GetUiNiagara(0))
  }
  async RefreshEffectById(t) {
    this.CardConfigId !== t && (this.CardConfigId = t, await this.NU1(t))
  }
  SetCardConfigId(t) {
    this.CardConfigId = t
  }
}
class BattleCardEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.CardConfigId = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UINiagara],
      [1, UE.UINiagara]
    ]
  }
  async RefreshNiagara(t, e) {
    StringUtils_1.StringUtils.IsBlank(t) ? e.SetUIActive(!1) : (await this.SetNiagaraSystemByPathAsync(t, e), e.SetUIActive(!0))
  }
  async OnBeforeStartAsync() {
    await this.NU1(this.CardConfigId)
  }
  async NU1(t) {
    t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t);
    await Promise.all([this.RefreshNiagara(t.SettingEffect[0], this.GetUiNiagara(0)), this.RefreshNiagara(t.SettingEffect[1], this.GetUiNiagara(1))])
  }
  async RefreshEffectById(t) {
    this.CardConfigId !== t && (this.CardConfigId = t, await this.NU1(t))
  }
  PlayStartEffect() {
    var t = this.GetUiNiagara(0),
      e = this.GetUiNiagara(1);
    this.SetActive(!0), t.IsUIActiveSelf() && t.ActivateSystem(!0), e.IsUIActiveSelf() && e.ActivateSystem(!0)
  }
  SetCardConfigId(t) {
    this.CardConfigId = t
  }
}
class BattleCardSpineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.CardConfigId = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    await this.RAr(this.CardConfigId)
  }
  async RAr(t) {
    var e, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t),
      i = t.SpineAtlas,
      t = t.SpineSkeleton;
    StringUtils_1.StringUtils.IsBlank(i) || StringUtils_1.StringUtils.IsBlank(t) || (e = this.GetSpine(0), await this.SetSpineAssetByPath(i, t, e), this.PlaySpineAnim("idle", !0))
  }
  async RefreshSpineById(t) {
    this.CardConfigId !== t && (this.CardConfigId = t, await this.RAr(t))
  }
  PlaySpineAnim(t, e) {
    var i = this.GetSpine(0);
    i.IsValid() && (i = i.SetAnimation(0, t, e), "start" === t) && i?.AnimationComplete.Add(() => {
      this.PlaySpineAnim("idle", !0)
    })
  }
  SetCardConfigId(t) {
    this.CardConfigId = t
  }
}
class EvolveProxy {
  constructor() {
    this.EffectItem = void 0, this.EvolveNum = 0
  }
  async CreateEffectItem(t, e) {
    var i = new EvolveItem;
    await i.CreateByResourceIdAsync(t, e), this.EffectItem = i, this.SetEvolveNum(this.EvolveNum)
  }
  SetEvolveNum(t) {
    this.EvolveNum = t, this.EffectItem && (this.EffectItem?.SetActive(0 !== this.EvolveNum), this.EffectItem?.SetEffectActive(1 < this.EvolveNum))
  }
}
class EvolveItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem]
    ]
  }
  OnStart() {
    this.SetEffectActive(!1)
  }
  SetEffectActive(t) {
    this.GetItem(0)?.SetUIActive(t)
  }
}
exports.EvolveItem = EvolveItem;
//# sourceMappingURL=BattleCardComponent.js.map