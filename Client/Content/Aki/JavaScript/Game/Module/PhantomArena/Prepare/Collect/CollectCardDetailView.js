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
    this.nY1 = -1;
    this.LOe = 0;
    this.ctu = -1;
    this.vua = -1;
    this.ypt = [];
    this.cs1 = undefined;
    this.dgu = undefined;
    this.lqe = undefined;
    this.B7t = undefined;
    this.Vnu = undefined;
    this.Hwn = () => {
      var t = new CollectCardDetailTabItem();
      t.CallbackOnClick = this.l6c;
      return t;
    };
    this.l6c = t => {
      if (this.vua >= 0) {
        this.dtu(this.vua, false);
      }
      this.vua = t;
      this.B7t.SelectGridProxy(t);
      this.dtu(this.vua, true);
    };
    this.qLn = () => {
      var t = (this.ctu - 1 + this.ypt.length) % this.ypt.length;
      this.ctu = t;
      this.nY1 = this.ypt[this.ctu].CardId;
      this.mtu();
      this.SPu();
    };
    this.GLn = () => {
      var t = (this.ctu + 1) % this.ypt.length;
      this.ctu = t;
      this.nY1 = this.ypt[this.ctu].CardId;
      this.mtu();
      this.SPu();
    };
    this.I5t = () => {
      this.CloseMe(this.Vgu);
    };
    this.Vgu = t => {
      if (this.Vnu) {
        this.Vnu(this.nY1);
      }
    };
    this.ftu = t => {
      if (t === this.nY1) {
        this.mtu();
        this.SPu();
      }
    };
    this.mgu = t => {
      if (t === this.nY1) {
        this.mtu();
        this.SPu();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.qLn], [3, this.GLn]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.nY1 = t.CardId ?? -1;
    this.LOe = t.ActivityId;
    this.Vnu = t.CallbackOnClose;
    this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataList(this.LOe);
    this.ctu = this.ypt.findIndex(t => t.CardId === this.nY1);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn);
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewTabDataList();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.I5t);
    this.cs1 = new CollectCardDetailPanel_1.CollectCardDetailPanel();
    var i = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.LOe);
    var e = (this.cs1.IsNewPhantomArenaActivity = i) ? "UiItem_CardDetailNew" : "UiItem_CardDetail";
    this.dgu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel();
    this.GetItem(5)?.SetUIActive(!i);
    await Promise.all([this.B7t.RefreshByDataAsync(t), this.cs1.CreateByResourceIdAsync(e, this.GetItem(4)), this.dgu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)), this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    var i = ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId(this.LOe);
    await this.lqe.SetCurrencyItemList([i]);
  }
  OnStart() {
    if (this.ypt.length <= 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "获取卡牌图鉴数据错误");
    }
    if (this.nY1 < 0 || this.ctu < 0) {
      this.ctu = 0;
      this.nY1 = this.ypt[0].CardId;
    }
    this.mtu();
    this.vua = 0;
    this.B7t.SelectGridProxyByKey(this.vua, true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ftu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.mgu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.ftu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.mgu);
  }
  mtu() {
    this.cs1?.Refresh(this.nY1);
    var t = {
      CardId: this.nY1
    };
    this.dgu?.Refresh(t);
  }
  SPu() {
    (this.vua === 0 ? this.cs1 : this.dgu)?.PlaySwitchSequence();
  }
  dtu(t, i) {
    if (t === 0) {
      this.cs1?.SetActive(i);
      if (i) {
        this.cs1?.PlayShowSequence();
      }
    } else {
      this.dgu?.SetActive(i);
      if (i) {
        this.dgu?.PlayShowSequence();
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