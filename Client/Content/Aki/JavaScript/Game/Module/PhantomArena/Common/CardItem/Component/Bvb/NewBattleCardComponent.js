"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewBattleCardComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
const LoadAsyncPromise_1 = require("../../../../../UiComponent/LoadAsyncPromise");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const PhantomArenaCardTweenLogic_1 = require("../../../../Battle/Card/PhantomArenaCardTweenLogic");
const PhantomArenaDefine_1 = require("../../../../Battle/PhantomArenaDefine");
const CardComponentBase_1 = require("../../CardComponentBase");
const CardElementItem_1 = require("../../Item/CardElementItem");
const BattleCardEffectItem_1 = require("./BattleCardEffectItem");
const BattleCardLoopEffectItem_1 = require("./BattleCardLoopEffectItem");
const BattleCardSpineItem_1 = require("./BattleCardSpineItem");
class NewBattleCardComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.CardClickCallback = undefined;
    this.aho = undefined;
    this.Sequence = undefined;
    this.Data = undefined;
    this.LoopEffectItem = undefined;
    this.EffectItem = undefined;
    this.SpineItem = undefined;
    this.TweenLogic = undefined;
    this.HitLocationCurveX = undefined;
    this.HitLocationCurveY = undefined;
    this.Ui1 = t => {
      this.CardClickCallback(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem], [23, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Ui1]];
  }
  async InitElement() {
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
  }
  async Vxu() {
    this.LoopEffectItem = new BattleCardLoopEffectItem_1.BattleCardLoopEffectItem();
    this.LoopEffectItem.SetCardConfigId(this.Data.ConfigId);
    await this.LoopEffectItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemLoopEffect", this.GetItem(17));
  }
  async jxu() {
    this.EffectItem = new BattleCardEffectItem_1.BattleCardEffectItem();
    this.EffectItem.SetCardConfigId(this.Data.ConfigId);
    await this.EffectItem.CreateByResourceIdAsync("UiItem_SoundRemnantItemEffect", this.GetItem(13));
  }
  async gYm() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Curve_CardHitX");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.HitLocationCurveX = await t.Promise;
  }
  async CYm() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Curve_CardHitY");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.HitLocationCurveY = await t.Promise;
  }
  async OnBeforeStartAsync() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2));
    await this.InitElement();
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(2));
    this.GetItem(22)?.SetUIActive(false);
    this.TweenLogic = new PhantomArenaCardTweenLogic_1.PhantomArenaCardTweenLogic();
    this.TweenLogic.Init(this.GetItem(23));
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.TweenLogic.Destroy();
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
    var t;
    if (this.Data.IsInFight && this.Data.HasClickActiveSkill || (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId).Element) === 0) {
      this.GetItem(8)?.SetUIActive(false);
    } else {
      this.GetItem(8)?.SetUIActive(true);
      this.aho.Refresh(t);
    }
  }
  sbi() {
    this.GetItem(15)?.SetUIActive(!this.Data.IsFourCost);
    this.GetItem(16)?.SetUIActive(this.Data.IsFourCost);
  }
  sqi() {
    var t = this.Data.IsField;
    this.GetItem(10)?.SetUIActive(!t);
    if (!t) {
      this.adu();
    }
  }
  adu() {
    this.GetItem(5)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_ONE);
    this.GetItem(6)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE);
    this.GetItem(7)?.SetUIActive(this.Data.UseCost >= PhantomArenaDefine_1.COST_THREE);
  }
  hPu() {
    var t = this.Data.IsNormal;
    this.GetItem(18)?.SetUIActive(t);
    if (t) {
      this.mU1();
      this.fU1();
      this.RGt();
    }
  }
  akm() {
    var t = this.Data.IsField;
    this.GetItem(19)?.SetUIActive(t);
  }
  hkm() {
    var t = this.Data.IsTool;
    this.GetItem(20)?.SetUIActive(t);
    if (t) {
      this.GetText(21)?.SetText(this.Data.Durable.toString());
    }
  }
  async u_u() {
    var t;
    var e = this.GetTexture(11);
    if (this.SpineItem) {
      e.SetUIActive(false);
      await this.SpineItem.RefreshSpineById(this.Data.ConfigId);
    } else {
      e.SetUIActive(true);
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId);
      await this.SetTextureAsync(t.CardFaceTexture, e);
    }
  }
  hdu() {
    var t = this.Data.EvolveNum;
    this.GetItem(22)?.SetUIActive(t !== 0);
  }
  SetCardData(t) {
    this.Data = t;
  }
  async InitEffect() {
    if (this.Data.IsFourCost) {
      await Promise.all([this.Vxu(), this.jxu()]);
    }
    await Promise.all([this.gYm(), this.CYm()]);
  }
  async InitSpine() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Data.ConfigId);
    if (!StringUtils_1.StringUtils.IsBlank(t.SpineAtlas) && !StringUtils_1.StringUtils.IsBlank(t.SpineSkeleton)) {
      this.SpineItem = new BattleCardSpineItem_1.BattleCardSpineItem();
      this.SpineItem.SetCardConfigId(this.Data.ConfigId);
      await this.SpineItem.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantItemSpine", this.GetItem(17));
    }
  }
  SetDebugText() {
    var t;
    var e = this.GetText(12);
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
    this.Hxt();
    this.sbi();
    this.SetDebugText();
    this.sqi();
    this.hPu();
    this.akm();
    this.hkm();
    this.hdu();
    await Promise.all([this.u_u(), this.LoopEffectItem?.RefreshEffectById(t.ConfigId), this.EffectItem?.RefreshEffectById(t.ConfigId)]);
  }
  GetCardToggle() {
    return this.GetExtendToggle(0);
  }
  GetTweenItem() {
    return this.GetItem(14);
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
  async PlayHitEffect(t) {
    const e = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.GetItem(23)?.SetUIActive(true);
      },
      CompleteCallback: () => {
        this.GetItem(23)?.SetUIActive(false);
        e.SetResult();
      },
      LocationCurveX: this.HitLocationCurveX,
      LocationCurveY: this.HitLocationCurveY
    };
    this.TweenLogic.PlayLocationByItem(this.GetRootItem(), t, i);
    await e.Promise;
  }
}
exports.NewBattleCardComponent = NewBattleCardComponent;
//# sourceMappingURL=NewBattleCardComponent.js.map