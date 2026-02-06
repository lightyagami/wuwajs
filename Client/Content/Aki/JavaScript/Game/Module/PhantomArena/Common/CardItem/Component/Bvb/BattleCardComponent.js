"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvolveItem = exports.BattleCardComponent = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const GlobalData_1 = require("../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../../../Battle/PhantomArenaDefine");
const CardComponentBase_1 = require("../../CardComponentBase");
const CardElementItem_1 = require("../../Item/CardElementItem");
const BattleCardEffectItem_1 = require("./BattleCardEffectItem");
const BattleCardLoopEffectItem_1 = require("./BattleCardLoopEffectItem");
const BattleCardSpineItem_1 = require("./BattleCardSpineItem");
class BattleCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.CardClickCallback = undefined;
    this.aho = undefined;
    this.Sequence = undefined;
    this.RootUiSequencePlayer = undefined;
    this.Data = undefined;
    this.LoopEffectItem = undefined;
    this.EffectItem = undefined;
    this.SpineItem = undefined;
    this.NormalEvolveItem = undefined;
    this.GoldEvolveItem = undefined;
    this.Ui1 = t => {
      this.CardClickCallback(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [17, UE.UIItem], [16, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Ui1]];
  }
  async InitElement() {
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
  }
  async OnBeforeStartAsync() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2));
    await this.InitElement();
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2));
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  Phu(t, e) {
    var i = this.Data.GetFightValueByAttr(t);
    var t = this.Data.ValueChangeTypeByBuff(t);
    if (t === 0) {
      e.SetText(i.toString());
    } else if (t === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1101", i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1102", i);
    }
  }
  mU1() {
    var t = this.GetText(1);
    this.Phu(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility, t);
  }
  fU1() {
    var t = this.GetText(3);
    this.Phu(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility, t);
  }
  RGt() {
    var t = this.GetText(4);
    this.Phu(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility, t);
  }
  Hxt() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId).Element;
    this.aho.Refresh(t);
  }
  sbi() {
    this.GetItem(13)?.SetUIActive(!this.Data.IsFourCost);
    this.GetItem(14)?.SetUIActive(this.Data.IsFourCost);
  }
  xhu() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId);
    var e = this.yKu();
    this.GetItem(10).SetUIActive(t.Element !== 0 && !e);
    this.GetItem(17).SetUIActive(t.Element !== 0 && e);
  }
  Uhu() {
    var t = this.yKu();
    this.GetItem(15).SetUIActive(!t);
    this.GetItem(16).SetUIActive(t);
  }
  async u_u() {
    var t;
    var e = this.GetTexture(8);
    if (this.SpineItem) {
      e.SetUIActive(false);
      await this.SpineItem.RefreshSpineById(this.Data.ConfigId);
    } else {
      e.SetUIActive(true);
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId);
      await this.SetTextureAsync(t.CardFaceTexture, e);
    }
  }
  async ndu() {
    var t = this.Data.EvolveNum;
    if (t !== 0 && !this.GoldEvolveItem) {
      this.GoldEvolveItem = new EvolveProxy();
      await this.GoldEvolveItem.CreateEffectItem("PnlEvolution2", this.GetItem(11));
    }
    this.GoldEvolveItem?.SetEvolveNum(t);
    this.NormalEvolveItem?.SetEvolveNum(0);
  }
  async sdu() {
    var t = this.Data.EvolveNum;
    if (t !== 0 && !this.NormalEvolveItem) {
      this.NormalEvolveItem = new EvolveProxy();
      await this.NormalEvolveItem.CreateEffectItem("PnlEvolution1", this.GetItem(11));
    }
    this.NormalEvolveItem?.SetEvolveNum(t);
    this.GoldEvolveItem?.SetEvolveNum(0);
  }
  adu() {
    this.GetItem(19)?.SetUIActive(this.Data.UseCost !== 0);
    this.GetItem(5)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_ONE);
    this.GetItem(6)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE);
    this.GetItem(20)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE);
  }
  async hdu() {
    if (this.yKu()) {
      await this.ndu();
    } else {
      await this.sdu();
    }
  }
  SetCardData(t) {
    this.Data = t;
  }
  yKu() {
    return !this.Data.IsNpcCard && ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Data.ConfigId);
  }
  async Vxu() {
    this.LoopEffectItem = new BattleCardLoopEffectItem_1.BattleCardLoopEffectItem();
    this.LoopEffectItem.SetCardConfigId(this.Data.ConfigId);
    await this.LoopEffectItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemLoopEffect", this.GetItem(18));
  }
  async jxu() {
    this.EffectItem = new BattleCardEffectItem_1.BattleCardEffectItem();
    this.EffectItem.SetCardConfigId(this.Data.ConfigId);
    await this.EffectItem.CreateByResourceIdAsync("UiItem_SoundRemnantItemEffect", this.GetItem(11));
  }
  async InitEffect() {
    if (this.Data.IsFourCost && this.yKu()) {
      await Promise.all([this.Vxu(), this.jxu()]);
    }
  }
  async InitSpine() {
    if (this.Data.IsFourCost && this.yKu()) {
      this.SpineItem = new BattleCardSpineItem_1.BattleCardSpineItem();
      this.SpineItem.SetCardConfigId(this.Data.ConfigId);
      await this.SpineItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemSpine", this.GetItem(18));
    }
  }
  SetDebugText() {
    var t;
    var e = this.GetText(9);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId);
      e.SetUIActive(true);
      e.SetText(`卡牌ID:  ${this.Data.CardId}
配置ID:  ${this.Data.ConfigId}
进化次数:  ${this.Data.EvolveNum}
被动技能Id:  ${t.PassiveSkillId}
主动技能Id:  ${t.ActiveSkillId}
卡牌因子:  ${[...t.CardFactorId, ...this.Data.ExtraFactors]}
实体配置Id:  ${t.EntityConfigId}
卡牌上阵倾向:  ${t.SlotTendency}`);
    } else {
      e.SetUIActive(false);
    }
  }
  PlaySpineAnim(t, e) {
    this.SpineItem?.PlaySpineAnim(t, e);
  }
  Refresh(t) {
    this.RefreshAsync(t);
  }
  async RefreshAsync(t) {
    this.Data = t;
    this.mU1();
    this.fU1();
    this.RGt();
    this.Hxt();
    this.SetDebugText();
    this.sbi();
    this.xhu();
    this.Uhu();
    this.adu();
    await Promise.all([this.hdu(), this.u_u(), this.LoopEffectItem?.RefreshEffectById(t.ConfigId), this.EffectItem?.RefreshEffectById(t.ConfigId)]);
  }
  GetCardToggle() {
    return this.GetExtendToggle(0);
  }
  GetTweenItem() {
    return this.GetItem(12);
  }
  PlaySequence(t) {
    if (!this.Sequence.IsSequenceInPlaying(t)) {
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequencePurely(t);
    }
  }
  PlayEffect() {
    this.EffectItem?.PlayStartEffect();
  }
}
exports.BattleCardComponent = BattleCardComponent;
class EvolveProxy {
  constructor() {
    this.EffectItem = undefined;
    this.EvolveNum = 0;
  }
  async CreateEffectItem(t, e) {
    var i = new EvolveItem();
    await i.CreateByResourceIdAsync(t, e);
    this.EffectItem = i;
    this.SetEvolveNum(this.EvolveNum);
  }
  SetEvolveNum(t) {
    this.EvolveNum = t;
    if (this.EffectItem) {
      this.EffectItem?.SetActive(this.EvolveNum !== 0);
      this.EffectItem?.SetEffectActive(this.EvolveNum > 1);
    }
  }
}
class EvolveItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.SetEffectActive(false);
  }
  SetEffectActive(t) {
    this.GetItem(0)?.SetUIActive(t);
  }
}
exports.EvolveItem = EvolveItem;
//# sourceMappingURL=BattleCardComponent.js.map