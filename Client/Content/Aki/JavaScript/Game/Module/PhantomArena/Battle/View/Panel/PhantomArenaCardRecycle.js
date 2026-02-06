"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardRecycle = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaCardRecycle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.TempCardPos = Vector_1.Vector.Create();
    this.ItemWorldTrans = Transform_1.Transform.Create();
    this.TotalWidth = 0;
    this.TotalHeight = 0;
    this.Pivot = Vector2D_1.Vector2D.Create(0, 0);
    this.EffectItem = undefined;
    this.SealEffectItem = undefined;
    this.EffectItemActive = false;
    this.SettingFailReason = "";
    this.Sequence = undefined;
    this.LightSequence = undefined;
    this.SealLightSequence = undefined;
    this.LightSequenceName = "RecycleLightClose";
    this.SealLightSequenceName = "RecycleLightRedClose";
    this.Nno = e => {
      if (e === "RecycleDisactive" || e === "RecycleSuccess") {
        this.EffectItem.SetUIActive(false);
      } else if (e === "BanSuccess" || e === "BanDisactive") {
        this.SealEffectItem.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
    this.ItemWorldTrans.FromUeTransform(this.RootItem.K2_GetComponentToWorld());
    this.TotalWidth = this.RootItem.GetWidth();
    this.TotalHeight = this.RootItem.GetHeight();
    this.Pivot.FromUeVector2D(this.RootItem.GetPivot());
    this.EffectItem = this.GetItem(1);
    this.SealEffectItem = this.GetItem(4);
    this.LightSequence = new UiSequencePlayer_1.UiSequencePlayer(this.EffectItem);
    this.SealLightSequence = new UiSequencePlayer_1.UiSequencePlayer(this.SealEffectItem);
    this.EffectItem.SetUIActive(false);
    this.SealEffectItem.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.LightSequence.Clear();
    this.SealLightSequence.Clear();
  }
  CheckCardInRecycleArea(e) {
    this.TempCardPos.FromUeVector(e.GetWorldLocation());
    this.ItemWorldTrans.InverseTransformPosition(this.TempCardPos, this.TempCardPos);
    return !(this.TempCardPos.X < -this.Pivot.X * this.TotalWidth);
  }
  SetEffectActive(e) {
    var t = e === 0;
    if (this.EffectItemActive !== t) {
      this.EffectItemActive = t;
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RecycleIsInSeal;
      if (e === 0) {
        this.EffectItem.SetUIActive(!t);
        this.SealEffectItem.SetUIActive(t);
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequencePurely(t ? "BanActive" : "RecycleActive");
      } else if (e === 1) {
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequencePurely(t ? "BanDisactive" : "RecycleDisactive");
      } else {
        this.Sequence.StopPrevSequence(false, true);
        this.Sequence.PlaySequencePurely(t ? "BanSuccess" : "RecycleSuccess");
        this.SealLightSequenceName = "RecycleLightRedClose";
        this.LightSequenceName = "RecycleLightClose";
      }
    }
  }
  CheckSettingGuideCondition(e) {
    e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(e);
    return this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbRecycleHandCard", e);
  }
  CheckEvolveGuideCondition(e) {
    return this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbRecycleBoardCard", e);
  }
  RefreshCardRecycleArea(e) {
    var t;
    var e = this.CheckCardInRecycleArea(e);
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RecycleIsInSeal) {
      if (this.SealLightSequenceName !== (t = e ? "RecycleLightRed" : "RecycleLightRedClose")) {
        this.SealLightSequenceName = t;
        this.SealLightSequence.PlaySequence(t);
      }
    } else if (this.LightSequenceName !== (t = e ? "RecycleLight" : "RecycleLightClose")) {
      this.LightSequenceName = t;
      this.LightSequence.PlaySequence(t);
    }
  }
  async TrySettingCardByHand(e, t = false) {
    var i;
    if ((this.ResetSettingFailReason(), !t) && !this.CheckCardInRecycleArea(e)) {
      return false;
    }
    return !!this.CheckSettingGuideCondition(e.Data.CardId) && !([t, i] = e.CardLogic.CheckRecycleSettingConditionFromHead(), this.SettingFailReason = i, !t) && !(i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint), !(await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleBackLibrary(e.Data.CardId))) && !((t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - i) > 0 && this.GetText(2).SetText("+" + t), this.GetText(2).SetUIActive(t > 0), this.ViewProxy.GuideManager.FinishCurrentGuide(), 0);
  }
  async TrySettingCardByFunctional(e, t, i = false) {
    if ((this.ResetSettingFailReason(), !i) && !this.CheckCardInRecycleArea(e)) {
      return false;
    }
    return !!this.CheckEvolveGuideCondition(t) && !([i, t] = e.CardLogic.CheckRecycleSettingConditionFromFunctional(), this.SettingFailReason = t, !i) && !(t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint), !(await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleBackSlotCardLibrary(e.Data.CardId))) && !((i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - t) > 0 && this.GetText(2).SetText("+" + i), this.GetText(2).SetUIActive(i > 0), this.ViewProxy.GuideManager.FinishCurrentGuide(), 0);
  }
  RefreshCostNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(t);
    this.GetText(0).SetText(e.toString() + "/" + t.RecoverCostPoint);
  }
  GetSettingFailReason() {
    return this.SettingFailReason;
  }
  ResetSettingFailReason() {
    this.SettingFailReason = "";
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e;
  }
}
exports.PhantomArenaCardRecycle = PhantomArenaCardRecycle;
//# sourceMappingURL=PhantomArenaCardRecycle.js.map