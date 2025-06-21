"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentFunctionAreaProxy = void 0;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PhantomArenaCard_1 = require("../Card/PhantomArenaCard"),
  PhantomArenaAssetManager_1 = require("../PhantomArenaAssetManager"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class OpponentFunctionAreaProxy {
  constructor(t, a) {
    this.ParentArea = void 0, this.Card = void 0, this.Index = -1, this.e31 = void 0, this.IsInSkillInteract = !1, this.Index = t, this.ParentArea = a
  }
  SetAreaItem(t) {
    this.AreaItem = t
  }
  async AddCardById(t) {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByCardId(t),
      a = new PhantomArenaCard_1.PhantomArenaCard,
      t = (a.SetCardData(t), this.ParentArea.ParentArea.ViewProxy.GetDragRootItem());
    return await a.CreateByResourceIdAsync("UiItem_SoundRemnantItem", t), a.SetCardProxy(this), await a.RefreshSelfAsync(), this.IsMonster && PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(a.Data.ConfigId), a
  }
  async AddCardByCardData(t) {
    var a = new PhantomArenaCard_1.PhantomArenaCard,
      t = (a.SetCardData(t), this.ParentArea.ParentArea.ViewProxy.GetDragRootItem());
    return await a.CreateByResourceIdAsync("UiItem_SoundRemnantItem", t), a.SetCardProxy(this), await a.RefreshSelfAsync(), this.IsMonster && PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(a.Data.ConfigId), a
  }
  async SetCard(t) {
    this.Card || (this.Card = await this.AddCardById(t), t = this.ParentArea.ParentArea.HandArea.GetLayoutItem(), await this.PlaySetBattleTween(t))
  }
  async ChangeCard(t) {
    this.Card = t, this.Card && await this.PlayChangeCardTween(this.Card.GetOriginalItem())
  }
  async DestroyCard() {
    this.Card && (this.IsMonster && PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(this.Card.Data.ConfigId), await this.Card.DestroyAsync(), this.Card = void 0)
  }
  async DissolveCard() {
    this.Card && (this.IsMonster && PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(this.Card.Data.ConfigId), await this.Card.Dissolve(), this.Card = void 0)
  }
  SetCardSelectedState(t) {
    this.Card && this.Card.SetSelectedState(t)
  }
  async PlaySetBattleTween(t) {
    const a = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.Card?.SetActive(!0)
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.GetCardAttachItem(), !0), this.Card?.StopSequence("DragUpHandtoTable"), this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          a.SetResult()
        }), this.Card?.PlaySpineAnimAndEffect("start", !1)
      },
      LocationCurveX: this.ParentArea.ParentArea.MoveLocationCurve,
      LocationCurveY: this.ParentArea.ParentArea.MoveLocationCurve
    };
    this.Card?.PlayLocationByItem(t, this.GetCardAttachItem(), i), this.Card?.PlaySequenceWithoutStop("DragUpHandtoTable"), this.Card?.PlaySequenceWithoutStop("RotationPlayer"), await a.Promise
  }
  async PlayChangeCardTween(t) {
    const a = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.GetCardAttachItem(), !0), this.Card?.StopSequence("DragUpTabletoHand"), this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          a.SetResult()
        }), this.Card?.PlaySpineAnimAndEffect("start", !1)
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_CHANGE_CARD_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(t, this.GetCardAttachItem(), i), this.Card?.PlaySequenceWithoutStop("DragUpTabletoHand"), await a.Promise
  }
  async PlayBackToRecycleTween() {
    var t = this.ParentArea.ParentArea.ViewProxy.CardRecycle.GetRootItem();
    const a = new CustomPromise_1.CustomPromise;
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem())
      },
      CompleteCallback: () => {
        this.DissolveCard().finally(() => {
          a.SetResult()
        })
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve
    };
    this.Card?.PlayLocationByItem(this.GetCardAttachItem(), t, i), this.Card?.PlaySequenceWithoutStop("DragUpHandtoTable"), await a.Promise
  }
  PointerClickCard(t, a) {
    this.e31 ? this.e31.ReceiveClickData(2, t, this.Index, a = 1 === a) ? a ? this.Card?.PlaySequence("Point") : this.Card?.PlaySequence("PointClose") : this.Card?.SetToggleState(0, !1) : this.Card && (this.ParentArea.ParentArea.ViewProxy.ShowCardTips(this.Card.Data), this.ParentArea.ParentArea.ViewProxy.SetSelectedCardId(t, 3))
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, a) {}
  CheckCanvasSortOrder(t, a) {
    return !!this.Card && !!a.SelectFightIdList.includes(this.Card.Data.FightId) && !(!t.includes(1) || !this.IsMonster)
  }
  HandleSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!0), this.Card.PlayStateSequence("PointStart"), this.IsInSkillInteract = !0)
  }
  CancelSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!1), this.Card.PlayStateSequence("PointClose"), 1 === this.Card.GetToggleState() && (this.Card.PlaySequence("PointClose"), this.Card.SetToggleState(0, !1)), this.IsInSkillInteract = !1)
  }
  ReceiveUiInteract(t) {
    this.e31 = t
  }
}
exports.OpponentFunctionAreaProxy = OpponentFunctionAreaProxy;
//# sourceMappingURL=OpponentFunctionAreaProxy.js.map