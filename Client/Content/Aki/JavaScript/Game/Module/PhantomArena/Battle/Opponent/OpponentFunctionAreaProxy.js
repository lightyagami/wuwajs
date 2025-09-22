"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentFunctionAreaProxy = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaCard_1 = require("../Card/PhantomArenaCard");
const PhantomArenaAssetManager_1 = require("../PhantomArenaAssetManager");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class OpponentFunctionAreaProxy {
  constructor(t, a) {
    this.ParentArea = undefined;
    this.Card = undefined;
    this.Index = -1;
    this.x31 = undefined;
    this.dXu = false;
    this.IsInSkillInteract = false;
    this.Index = t;
    this.ParentArea = a;
  }
  SetAreaItem(t) {
    this.AreaItem = t;
  }
  async AddCardById(t) {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByCardId(t);
    var a = new PhantomArenaCard_1.PhantomArenaCard();
    a.SetCardData(t);
    var t = this.ParentArea.ParentArea.ViewProxy.GetDragRootItem();
    await a.CreateByResourceIdAsync("UiItem_SoundRemnantItem", t);
    a.SetCardProxy(this);
    await a.RefreshSelfAsync();
    if (this.IsMonster) {
      PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(a.Data.ConfigId);
    }
    return a;
  }
  async AddCardByCardData(t) {
    var a = new PhantomArenaCard_1.PhantomArenaCard();
    a.SetCardData(t);
    var t = this.ParentArea.ParentArea.ViewProxy.GetDragRootItem();
    await a.CreateByResourceIdAsync("UiItem_SoundRemnantItem", t);
    a.SetCardProxy(this);
    await a.RefreshSelfAsync();
    if (this.IsMonster) {
      PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(a.Data.ConfigId);
    }
    return a;
  }
  async SetCard(t) {
    if (!this.Card) {
      this.Card = await this.AddCardById(t);
      t = this.ParentArea.ParentArea.HandArea.GetLayoutItem();
      await this.PlaySetBattleTween(t);
    }
  }
  async ChangeCard(t) {
    this.Card = t;
    if (this.Card) {
      await this.PlayChangeCardTween(this.Card.GetOriginalItem());
    }
  }
  async DestroyCard() {
    if (this.Card) {
      if (this.IsMonster) {
        PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(this.Card.Data.ConfigId);
      }
      await this.Card.DestroyAsync();
      this.Card = undefined;
    }
  }
  async DissolveCard() {
    if (this.Card) {
      if (this.IsMonster) {
        PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(this.Card.Data.ConfigId);
      }
      await this.Card.Dissolve();
      this.Card = undefined;
    }
  }
  SetCardSelectedState(t) {
    if (this.Card) {
      this.Card.SetSelectedState(t);
    }
  }
  async PlaySetBattleTween(t) {
    const a = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.Card?.SetActive(true);
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.GetCardAttachItem(), true);
        this.Card?.StopSequence("DragUpHandtoTable");
        this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          a.SetResult();
        });
        this.Card?.PlaySpineAnimAndEffect("start", false);
      },
      LocationCurveX: this.ParentArea.ParentArea.MoveLocationCurve,
      LocationCurveY: this.ParentArea.ParentArea.MoveLocationCurve
    };
    this.Card?.PlayLocationByItem(t, this.GetCardAttachItem(), i);
    this.Card?.PlaySequenceWithoutStop("DragUpHandtoTable");
    this.Card?.PlaySequenceWithoutStop("RotationPlayer");
    await a.Promise;
  }
  async PlayChangeCardTween(t) {
    const a = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.Card?.SetUiParent(this.GetCardAttachItem(), true);
        this.Card?.StopSequence("DragUpTabletoHand");
        this.Card?.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          a.SetResult();
        });
        this.Card?.PlaySpineAnimAndEffect("start", false);
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_CHANGE_CARD_TWEEN_DURATION
    };
    this.Card?.PlayLocationByItem(t, this.GetCardAttachItem(), i);
    this.Card?.PlaySequenceWithoutStop("DragUpTabletoHand");
    await a.Promise;
  }
  async PlayBackToRecycleTween() {
    var t = this.ParentArea.ParentArea.ViewProxy.CardRecycle.GetRootItem();
    const a = new CustomPromise_1.CustomPromise();
    var i = {
      StartCallback: () => {
        this.Card?.SetUiParent(this.ParentArea.ParentArea.ViewProxy.GetDragRootItem());
      },
      CompleteCallback: () => {
        this.DissolveCard().finally(() => {
          a.SetResult();
        });
      },
      LocationCurveX: this.ParentArea.ParentArea.RecycleCurve,
      LocationCurveY: this.ParentArea.ParentArea.RecycleCurve
    };
    this.Card?.PlayLocationByItem(this.GetCardAttachItem(), t, i);
    this.Card?.PlaySequenceWithoutStop("DragUpHandtoTable");
    await a.Promise;
  }
  PointerClickCard(t, a) {
    var i;
    if (this.x31) {
      i = !this.dXu;
      if (this.x31.ReceiveClickData(2, t, this.Index, i)) {
        if (i) {
          this.dXu = true;
          this.Card?.PlaySequence("Point");
        } else {
          this.dXu = false;
          this.Card?.PlaySequence("PointClose");
        }
      } else {
        this.Card?.SetToggleState(0, false);
      }
    } else if (this.Card) {
      this.ParentArea.ParentArea.ViewProxy.ShowCardTips(this.Card.Data);
      this.ParentArea.ParentArea.ViewProxy.SetSelectedCardId(t, 3);
    }
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, a) {}
  CheckCanvasSortOrder(t, a) {
    return !!this.Card && !!a.SelectFightIdList.includes(this.Card.Data.FightId) && !!t.includes(1) && !!this.IsMonster;
  }
  HandleSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(true);
      this.Card.PlayStateSequence("PointStart");
      this.IsInSkillInteract = true;
    }
  }
  CancelSortOrder() {
    if (this.Card) {
      this.Card.OverrideCanvasSortOrder(false);
      this.Card.PlayStateSequence("PointClose");
      if (this.Card.GetToggleState() === 1) {
        this.Card.SetToggleState(0, false);
      }
      if (this.dXu) {
        this.Card.PlaySequence("PointClose");
      }
      this.dXu = false;
      this.IsInSkillInteract = false;
    }
  }
  ReceiveUiInteract(t) {
    this.x31 = t;
  }
}
exports.OpponentFunctionAreaProxy = OpponentFunctionAreaProxy;
//# sourceMappingURL=OpponentFunctionAreaProxy.js.map