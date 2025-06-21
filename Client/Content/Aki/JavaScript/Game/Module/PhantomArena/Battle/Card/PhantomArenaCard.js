"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCard = void 0;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonBaseCardItem_1 = require("../../Common/CardItem/Item/CommonBaseCardItem"),
  PhantomArenaCardTweenLogic_1 = require("./PhantomArenaCardTweenLogic"),
  TICK_DURATION = 1e3;
class PhantomArenaCard extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments), this.LCa = Vector2D_1.Vector2D.Create(), this.ui1 = Vector2D_1.Vector2D.Create(), this.ZXl = Vector2D_1.Vector2D.Create(), this.QTc = Vector_1.Vector.Create(), this.ItemWorldTrans = Transform_1.Transform.Create(), this.TempWorldPos = Vector_1.Vector.Create(), this.di1 = void 0, this.wut = !1, this.xa1 = !1, this.Da1 = !1, this.Ua1 = !1, this.sKe = TickSystem_1.TickSystem.InvalidId, this.e8 = 0, this.Sequence = void 0, this.TweenLogic = void 0, this.Fx1 = [], this.Data = void 0, this.HalfWidth = 0, this.HalfHeight = 0, this.mi1 = t => {
      this.xa1 ? (this.xa1 = !1, this.SetToggleState(0, !1)) : this.fi1()?.PointerClickCard?.(this.Data.CardId, t)
    }, this.xQ1 = t => {
      ("Dissolve" === t || "MagicUse" === t) && this.Destroy()
    }, this.r6 = t => {
      this.Da1 && (this.e8 < TICK_DURATION ? this.e8 += t : (this.Ba1(!1), this.fi1()?.PointerLongPressCard?.(this.Data.CardId)))
    }, this.gi1 = () => {
      this.fi1()?.PointerEnterCard?.(this.Data.CardId)
    }, this.Ngo = () => {
      this.Ba1(!0);
      var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
      t && this.fi1()?.PointerDownCard?.(this.Data.CardId, t)
    }, this.GFo = () => {
      this.Ba1(!1)
    }, this.ka1 = () => {
      this.Ba1(!1), this.xa1 = !1, this.SetToggleState(0, !1)
    }, this.pKe = t => {
      return this.xa1 = !0, t && this.fi1()?.PointerBeginDrag?.(this.Data.CardId, t), !0
    }, this.vKe = t => {
      return t && this.fi1()?.PointerDragCard?.(this.Data.CardId, t), !0
    }, this.SKe = t => {
      return t && this.fi1()?.PointerEndDrag?.(this.Data.CardId, t), !0
    }
  }
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [2, this.GetCardRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [6, "PnlStateChoose1", this.GetCardRootItem()]
    ];
    for (var [t, i] of this.Fx1) this.ComponentsRegisterInfoByResourceId.push([t, i, this.GetCardRootItem()])
  }
  async OnBeforeChildStartAsync() {
    var t = this.GetComponent(2);
    this.Data && (t.SetCardData(this.Data), await t.InitSpine(), await t.InitEffect())
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetCardRootItem()), this.Sequence.BindOnEndSequenceEvent(this.xQ1);
    var t = this.GetComponent(2),
      t = (t.CardClickCallback = this.mi1, t.GetCardToggle());
    t.OnPointEnterCallBack.Bind(this.gi1), t.OnPointDownCallBack.Bind(this.Ngo), t.OnPointUpCallBack.Bind(this.GFo), t.OnPointCancelCallBack.Bind(this.ka1), t.OnPointerBeginDragCallBack.Bind(this.pKe), t.OnPointerDragCallBack.Bind(this.vKe), t.OnPointerEndDragCallBack.Bind(this.SKe), this.sKe = TickSystem_1.TickSystem.Add(this.r6, "LongPressComponent", 0, !0).Id, this.HalfWidth = this.GetCardRootItem().Width / 2, this.HalfHeight = this.GetCardRootItem().Height / 2, this.TweenLogic = new PhantomArenaCardTweenLogic_1.PhantomArenaCardTweenLogic, this.TweenLogic.Init(this.GetRootItem())
  }
  OnBeforeDestroy() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId && (TickSystem_1.TickSystem.Remove(this.sKe), this.sKe = TickSystem_1.TickSystem.InvalidId), this.Sequence.Clear(), this.TweenLogic.Destroy()
  }
  Ba1(t) {
    t !== this.wut && (this.e8 = 0, this.Da1 = t, this.wut = t)
  }
  fi1() {
    if (!this.Ua1) return this.di1 || void 0;
    this.Ua1 = !1
  }
  AddComponentsRegisterInfoByResourceId(t) {
    this.Fx1.push(t)
  }
  Refresh(t) {
    this.RefreshAsync(t)
  }
  async RefreshAsync(t) {
    this.SetCardData(t), await this.GetComponent(2)?.RefreshAsync(t)
  }
  async RefreshSelfAsync() {
    await this.GetComponent(2)?.RefreshAsync(this.Data)
  }
  SetCardData(t) {
    this.Data = t
  }
  SetCardProxy(t) {
    this.di1 !== t && (this.xa1 && (this.Ua1 = !0), this.di1 = t)
  }
  RecordLastDragPos(t) {
    LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, this.LCa)
  }
  MoveCard(t) {
    var i;
    this.RootItem && (LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, this.ui1), Vector2D_1.Vector2D.Create(this.ui1.X, this.ui1.Y).SubtractionEqual(this.LCa).IsNearlyZero(0) || (t = this.ui1.X - this.LCa.X, i = this.ui1.Y - this.LCa.Y, this.ZXl.FromUeVector2D(this.RootItem.GetAnchorOffset()), this.ZXl.X += t, this.ZXl.Y += i, this.RootItem.SetAnchorOffset(this.ZXl.ToUeVector2D()), this.LCa.DeepCopy(this.ui1)))
  }
  SetUiParent(t, i = !1) {
    this.TempWorldPos.FromUeVector(this.RootItem.D_K2_GetComponentLocation()), this.ItemWorldTrans.FromUeTransform(t.K2_GetComponentToWorld()), this.ItemWorldTrans.InverseTransformPosition(this.TempWorldPos, this.TempWorldPos), this.GetOriginalItem().SetUIParent(t), this.ParentUiItem = t, this.RootItem.SetUIRelativeLocation(this.TempWorldPos.ToUeVectorOld()), i && this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector)
  }
  GetWorldLocation() {
    return this.QTc.FromUeVector(this.RootItem.D_K2_GetComponentLocation()), this.QTc
  }
  SetToggleState(t, i = !0) {
    this.GetComponent(2).GetCardToggle().SetToggleState(t, i)
  }
  GetToggleState() {
    return this.GetComponent(2).GetCardToggle().GetToggleState()
  }
  RefreshDebugText() {
    this.GetComponent(2)?.SetDebugText()
  }
  OverrideCanvasSortOrder(t) {
    var i = this.GetOriginalItem()?.GetRenderCanvas();
    i && i.SetSortOrderNew(t ? 2 : 0)
  }
  async Dissolve() {
    var t = new CustomPromise_1.CustomPromise;
    await this.Sequence.PlaySequenceAsync("Dissolve", t)
  }
  async MagicUse() {
    var t = new CustomPromise_1.CustomPromise;
    await this.Sequence.PlaySequenceAsync("MagicUse", t)
  }
  PlayStateSequence(t) {
    this.GetComponent(2)?.PlaySequence(t)
  }
  PlayLocationByItem(t, i, s) {
    this.TweenLogic.PlayLocationByItem(t, i, s)
  }
  StopSequence(t) {
    this.Sequence.StopSequenceByKey(t, !1, !0)
  }
  PlaySequence(t, i = !1) {
    this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely(t, !1, i)
  }
  PlaySequenceWithoutStop(t, i = !1) {
    this.Sequence.PlaySequencePurely(t, !1, i)
  }
  async PlaySequenceAsync(t) {
    var i = new CustomPromise_1.CustomPromise;
    await this.Sequence.PlaySequenceAsync(t, i)
  }
  PlaySpineAnimAndEffect(t, i) {
    var s = this.GetComponent(2);
    s?.PlaySpineAnim(t, i), s?.PlayEffect()
  }
  SetSelectedState(t) {
    this.GetComponent(6).SetComponentActive(t)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    return t && !(t.length <= 0) && (t = this.GetComponent(2)?.GetRootItem()) ? [t, t] : void 0
  }
}
exports.PhantomArenaCard = PhantomArenaCard;
//# sourceMappingURL=PhantomArenaCard.js.map