"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardRecycle = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaCardRecycle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ViewProxy = void 0, this.TempCardPos = Vector_1.Vector.Create(), this.ItemWorldTrans = Transform_1.Transform.Create(), this.TotalWidth = 0, this.TotalHeight = 0, this.Pivot = Vector2D_1.Vector2D.Create(0, 0), this.EffectItem = void 0, this.EffectItemActive = !1, this.SettingFailReason = "", this.Sequence = void 0, this.LightSequence = void 0, this.LightSequenceName = "RecycleLightClose", this.Nno = e => {
      "RecycleDisactive" !== e && "RecycleSuccess" !== e || this.EffectItem.SetUIActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno), this.ItemWorldTrans.FromUeTransform(this.RootItem.K2_GetComponentToWorld()), this.TotalWidth = this.RootItem.GetWidth(), this.TotalHeight = this.RootItem.GetHeight(), this.Pivot.FromUeVector2D(this.RootItem.GetPivot()), this.EffectItem = this.GetItem(1), this.LightSequence = new UiSequencePlayer_1.UiSequencePlayer(this.EffectItem), this.EffectItem.SetUIActive(!1)
  }
  OnBeforeDestroy() {
    this.Sequence.Clear(), this.LightSequence.Clear()
  }
  CheckCardInRecycleArea(e) {
    return this.TempCardPos.FromUeVector(e.GetWorldLocation()), this.ItemWorldTrans.InverseTransformPosition(this.TempCardPos, this.TempCardPos), !(this.TempCardPos.X < -this.Pivot.X * this.TotalWidth)
  }
  SetEffectActive(e) {
    var t = 0 === e;
    this.EffectItemActive !== t && (this.EffectItemActive = t, 0 === e ? (this.EffectItem.SetUIActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("RecycleActive")) : 1 === e ? (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("RecycleDisactive")) : (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("RecycleSuccess"), this.LightSequenceName = "RecycleLightClose"))
  }
  CheckSettingGuideCondition(e) {
    e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(e);
    return this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbRecycleHandCard", e)
  }
  CheckEvolveGuideCondition(e) {
    return this.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbRecycleBoardCard", e)
  }
  RefreshCardRecycleArea(e) {
    e = this.CheckCardInRecycleArea(e) ? "RecycleLight" : "RecycleLightClose";
    this.LightSequenceName !== e && (this.LightSequenceName = e, this.LightSequence.PlaySequence(e))
  }
  async TrySettingCardByHand(e, t = !1) {
    if ((this.SettingFailReason = "", !t) && !this.CheckCardInRecycleArea(e)) return !1;
    return !(!this.CheckSettingGuideCondition(e.Data.CardId) || (0 === e.Data.UseCost ? this.SettingFailReason = "PhantomBattle_1047" : (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint), !await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleBackLibrary(e.Data.CardId) || (0 < (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint) - t) && this.GetText(2).SetText("+" + e), this.ViewProxy.GuideManager.FinishCurrentGuide(), 0))))
  }
  async TrySettingCardByFunctional(e, t, i = !1) {
    if ((this.SettingFailReason = "", !i) && !this.CheckCardInRecycleArea(e)) return !1;
    return !(!this.CheckEvolveGuideCondition(t) || (0 === e.Data.UseCost ? this.SettingFailReason = "PhantomBattle_1047" : (i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint), !await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleBackSlotCardLibrary(e.Data.CardId) || (0 < (t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint) - i) && this.GetText(2).SetText("+" + t), this.ViewProxy.GuideManager.FinishCurrentGuide(), 0))))
  }
  RefreshCostNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint),
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId,
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(t);
    this.GetText(0).SetText(e.toString() + "/" + t.RecoverCostPoint)
  }
  GetSettingFailReason() {
    return this.SettingFailReason
  }
  ResetSettingFailReason() {
    this.SettingFailReason = ""
  }
  RegisterViewProxy(e) {
    this.ViewProxy = e
  }
}
exports.PhantomArenaCardRecycle = PhantomArenaCardRecycle;
//# sourceMappingURL=PhantomArenaCardRecycle.js.map