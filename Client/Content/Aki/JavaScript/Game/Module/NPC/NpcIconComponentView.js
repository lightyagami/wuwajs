"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcIconComponentView = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class NpcIconComponentView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RootActorRotation = void 0, this.jqi = void 0, this.Wqi = !1, this.Kqi = !1, this.cdl = !1, this.Qqi = !1, this.Xqi = !1, this.$qi = !1, this.Yqi = !1, this.X1l = !1, this.Y1l = !1, this.N71 = void 0, this.Jqi = void 0, this.zqi = void 0, this.eGi = new UE.VectorDouble(1, 1, 1), this.tGi = 0, this.iGi = void 0, this.oGi = void 0, this.TG1 = void 0, this.rGi = void 0, this.nGi = new UE.VectorDouble(1, 1, 1), this.sGi = 0, this.aGi = void 0, this.ymt = 0, this.CRi = void 0, this.hGi = !1, this.lGi = void 0, this._Gi = !1, this.uGi = void 0, this.cZ1 = !1, this.cGi = t => {
      "DialogueClose" === t ? this.uGi() : "NameClose" === t && this.cZ1 && (this.cZ1 = !1, this.iGi.SetUIActive(!1), void 0 !== this.N71) && (this.SetQuestTrackCellState(this.N71), this.N71 = void 0)
    }
  }
  get ForceHideRootItem() {
    return this.cdl
  }
  set ForceHideRootItem(t) {
    var i = this.cdl !== t;
    this.cdl = t, i && this.SetRootItemState(this.Kqi, !0)
  }
  get ForceHideDialog() {
    return this.Y1l
  }
  set ForceHideDialog(t) {
    var i = this.Y1l !== t;
    this.Y1l = t, i && this.SetDialogueActive(this.Yqi, this.X1l, !0)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UISprite]
    ]
  }
  OnStart() {
    this.RootActorRotation = this.RootActor.K2_GetActorRotation(), this.jqi = new UE.VectorDouble(0, 0, 0), this.iGi = this.GetItem(6), this.tGi = this.iGi.D_K2_GetComponentScale().X, this.aGi = this.GetItem(2), this.sGi = this.aGi.D_K2_GetComponentScale().X, this.Jqi = this.GetItem(5), this.zqi = this.GetTexture(4), this.rGi = this.GetItem(8), this.oGi = this.GetItem(10), this.TG1 = this.GetSprite(11), this.$qi = this.zqi.bIsUIActive, this.Qqi = this.iGi.bIsUIActive, this.Kqi = this.RootItem.bIsUIActive, this.Wqi = this.Jqi.bIsUIActive, this._Gi = this.oGi.bIsUIActive, this.Y1l = !1, this.X1l = !1, this.mGi(), this.SetDialogueActive(!1), this.uGi = () => {
      this.aGi.SetUIActive(!1)
    }
  }
  mGi() {
    this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.CRi.BindSequenceCloseEvent(this.cGi)
  }
  SetNpcName(t) {
    var i = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(t) ? i.SetUIActive(!1) : (i.SetUIActive(!0), i.SetText(t))
  }
  InitItemLocation(t, i) {
    this.jqi = t, this.jqi.Z = t.Z + i, this.RootActor.D_K2_SetActorLocation(this.jqi, !1, void 0, !1)
  }
  UpdateRotation(t, i) {
    t += 90;
    this.RootActorRotation.Roll = i - 90, this.RootActorRotation.Pitch = 0, this.RootActorRotation.Yaw = t, this.RootItem.SetUIWorldRotation(this.RootActorRotation)
  }
  SetDialogueActive(t, i = !1, s = !1) {
    this.ForceHideDialog ? (this.aGi.bIsUIActive && this.aGi.SetUIActive(!1), this.Yqi = t) : t === this.Yqi && !s || ((this.Yqi = t) ? (this.aGi.SetUIActive(!0), this.gGi("DialogueStart"), this.rGi.SetUIActive(i), this.X1l = i) : this.gGi("DialogueClose") || this.uGi?.())
  }
  GetDialogueActive() {
    return this.Yqi
  }
  gGi(t) {
    return this.CRi.GetCurrentSequence() === t ? this.CRi.ReplaySequenceByKey(t) : (this.CRi.StopCurrentSequence(!1, !0), this.CRi.PlayLevelSequenceByName(t)), !0
  }
  SetDialogueText(t) {
    this.GetText(3).SetText(t)
  }
  SetHeadItemState(t) {
    this.Qqi !== t && ((this.Qqi = t) ? (this.iGi.SetUIActive(!0), this.cZ1 && (this.CRi.StopPlayingSequence(), this.cZ1 = !1), this.CRi.PlayLevelSequenceByName("NameStart"), this.$qi && !this.hGi && 0 === this.lGi && (this.fGi(), this.hGi = !1)) : (this.CRi.PlayLevelSequenceByName("IconClose"), this.CRi.PlayLevelSequenceByName("NameClose"), this.cZ1 = !0))
  }
  GetHeadItemState() {
    return this.Qqi
  }
  GetHeadIconActive() {
    return this.$qi
  }
  SetQuestTrackCellState(t) {
    this._Gi !== t && (this.CRi?.IsPlayingSequence("NameClose") ? this.N71 = t : (this._Gi = t, this.oGi.SetUIActive(t)))
  }
  SetPlayerInfoItemState(t) {
    this.TG1.SetUIActive(t)
  }
  SetRootItemState(t, i = !1) {
    this.ForceHideRootItem ? (this.RootItem.bIsUIActive && this.SetActive(!1), this.Kqi = t) : this.Kqi === t && !i || (this.Kqi = t, this.SetActive(t && !UiLayer_1.UiLayer.IsForceHideUi()))
  }
  GetRootItemState() {
    return this.Kqi
  }
  SetTrackEffectState(t) {
    this.Xqi !== t && (this.Xqi = t, EffectSystem_1.EffectSystem.SetEffectHidden(this.ymt, t, "NpcIconComponentView"))
  }
  SetHeadInfoNameState(t) {
    this.Wqi !== t && (this.Wqi = t, this.Jqi.SetUIActive(t), this.aGi.SetUIActive(t && this.Yqi))
  }
  SetNpcQuestIconState(t) {
    this.CGi(t)
  }
  SetNpcSecondName(t) {
    var i = this.GetText(1);
    t ? (i.SetUIActive(!0), i.ShowTextNew(t)) : i.SetUIActive(!1)
  }
  SetFunctionIcon(t, i) {
    t ? (this.CGi(!0), this.SetTextureByPath(t, this.zqi, void 0, i), this.lGi = 0) : this.CGi(!1)
  }
  SetNpcQuestIcon(t) {
    t ? (this.SetTextureByPath(t, this.zqi), this.CGi(!0), this.lGi = 1) : this.CGi(!1)
  }
  SetPlayerInfoIcon(t, i) {
    t && this.TG1 && this.SetSpriteByPath(t, this.TG1, !0, void 0, i)
  }
  SnapSizeFromTexture() {
    this.zqi?.SetSizeFromTexture()
  }
  SetHeadWorldScale3D(t) {
    this.Qqi && this.tGi !== t && (this.tGi = t, this.eGi.X = t, this.eGi.Y = t, this.eGi.Z = t, this.iGi.D_SetWorldScale3D(this.eGi))
  }
  SetDialogWorldScale3D(t) {
    this.sGi !== t && (this.sGi = t, this.nGi.X = t, this.nGi.Y = t, this.nGi.Z = t, this.aGi.D_SetWorldScale3D(this.nGi))
  }
  fGi() {
    this.CRi.PlayLevelSequenceByName("FirstStart")
  }
  CGi(t) {
    t !== this.$qi && (this.$qi = t, this.zqi.SetUIActive(t))
  }
  OnBeforeDestroy() {
    EffectSystem_1.EffectSystem.IsValid(this.ymt) && (EffectSystem_1.EffectSystem.StopEffectById(this.ymt, "[NpcIconComponentView.OnBeforeDestroy]", !0), this.ymt = 0), this.CRi?.Clear()
  }
}
exports.NpcIconComponentView = NpcIconComponentView;
//# sourceMappingURL=NpcIconComponentView.js.map