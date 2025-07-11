"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectCardDetailTabItem = exports.CollectCardDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DeckBuilderCardOutlookUnlockPanel_1 = require("../DeckBuilder/DeckBuilderCardOutlookUnlockPanel");
const CollectCardDetailPanel_1 = require("./CollectCardDetailPanel");
class CollectCardDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UX1 = -1;
    this.Feu = -1;
    this.vua = -1;
    this.ypt = [];
    this.cs1 = undefined;
    this.pfu = undefined;
    this.lqe = undefined;
    this.B7t = undefined;
    this.gnu = undefined;
    this.Hwn = () => {
      var t = new CollectCardDetailTabItem();
      t.CallbackOnClick = this.l6c;
      return t;
    };
    this.l6c = t => {
      if (this.vua >= 0) {
        this.Neu(this.vua, false);
      }
      this.vua = t;
      this.B7t.SelectGridProxy(t);
      this.Neu(this.vua, true);
    };
    this.qLn = () => {
      var t = (this.Feu - 1 + this.ypt.length) % this.ypt.length;
      this.Feu = t;
      this.UX1 = this.ypt[this.Feu].CardId;
      this.Veu();
      this.KAu();
    };
    this.GLn = () => {
      var t = (this.Feu + 1) % this.ypt.length;
      this.Feu = t;
      this.UX1 = this.ypt[this.Feu].CardId;
      this.Veu();
      this.KAu();
    };
    this.I5t = () => {
      this.CloseMe(this.Qfu);
    };
    this.Qfu = t => {
      if (this.gnu) {
        this.gnu(this.UX1);
      }
    };
    this.jeu = t => {
      if (t === this.UX1) {
        this.Veu();
        this.KAu();
      }
    };
    this.vfu = t => {
      if (t === this.UX1) {
        this.Veu();
        this.KAu();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.qLn], [3, this.GLn]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.UX1 = t.CardId ?? -1;
    this.gnu = t.CallbackOnClose;
    this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataList();
    this.Feu = this.ypt.findIndex(t => t.CardId === this.UX1);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn);
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewTabDataList();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.I5t);
    this.cs1 = new CollectCardDetailPanel_1.CollectCardDetailPanel();
    this.pfu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel();
    await Promise.all([this.B7t.RefreshByDataAsync(t), this.cs1.CreateByResourceIdAsync("UiItem_CardDetail", this.GetItem(4)), this.pfu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)), this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId();
    await this.lqe.SetCurrencyItemList([t]);
  }
  OnStart() {
    if (this.ypt.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "获取卡牌图鉴数据错误");
    }
    if (this.UX1 < 0 || this.Feu < 0) {
      this.Feu = 0;
      this.UX1 = this.ypt[0].CardId;
    }
    this.Veu();
    this.vua = 0;
    this.B7t.SelectGridProxyByKey(this.vua, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.jeu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.vfu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.jeu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.vfu);
  }
  Veu() {
    this.cs1?.Refresh(this.UX1);
    var t = {
      CardId: this.UX1
    };
    this.pfu?.Refresh(t);
  }
  KAu() {
    (this.vua === 0 ? this.cs1 : this.pfu)?.PlaySwitchSequence();
  }
  Neu(t, i) {
    if (t === 0) {
      this.cs1?.SetActive(i);
      if (i) {
        this.cs1?.PlayShowSequence();
      }
    } else {
      this.pfu?.SetActive(i);
      if (i) {
        this.pfu?.PlayShowSequence();
      }
    }
  }
}
exports.CollectCardDetailView = CollectCardDetailView;
class CollectCardDetailTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackOnClick = undefined;
    this.jA1 = t => {
      if (t === 1) {
        this.CallbackOnClick?.(this.Pe.Index);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.jA1]];
  }
  Refresh(t) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameId);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, i) {
    return t.Index;
  }
}
exports.CollectCardDetailTabItem = CollectCardDetailTabItem;
//# sourceMappingURL=CollectCardDetailView.js.map