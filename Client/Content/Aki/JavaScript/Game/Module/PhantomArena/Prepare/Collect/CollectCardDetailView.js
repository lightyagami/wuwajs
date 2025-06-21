"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectCardDetailTabItem = exports.CollectCardDetailView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DeckBuilderCardOutlookUnlockPanel_1 = require("../DeckBuilder/DeckBuilderCardOutlookUnlockPanel"),
  CollectCardDetailPanel_1 = require("./CollectCardDetailPanel");
class CollectCardDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.FK1 = -1, this.$Z1 = -1, this.vua = -1, this.ypt = [], this.$n1 = void 0, this.xhu = void 0, this.lqe = void 0, this.B7t = void 0, this.eiu = void 0, this.Hwn = () => {
      var t = new CollectCardDetailTabItem;
      return t.CallbackOnClick = this.l6c, t
    }, this.l6c = t => {
      0 <= this.vua && this.WZ1(this.vua, !1), this.vua = t, this.B7t.SelectGridProxy(t), this.WZ1(this.vua, !0)
    }, this.qLn = () => {
      var t = (this.$Z1 - 1 + this.ypt.length) % this.ypt.length;
      this.$Z1 = t, this.FK1 = this.ypt[this.$Z1].CardId, this.QZ1(), this.emu()
    }, this.GLn = () => {
      var t = (this.$Z1 + 1) % this.ypt.length;
      this.$Z1 = t, this.FK1 = this.ypt[this.$Z1].CardId, this.QZ1(), this.emu()
    }, this.I5t = () => {
      this.CloseMe(this.elu)
    }, this.elu = t => {
      this.eiu && this.eiu(this.FK1)
    }, this.KZ1 = t => {
      t === this.FK1 && (this.QZ1(), this.emu())
    }, this.Uhu = t => {
      t === this.FK1 && (this.QZ1(), this.emu())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.qLn],
      [3, this.GLn]
    ]
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam,
      t = (this.FK1 = t.CardId ?? -1, this.eiu = t.CallbackOnClose, this.ypt = ModelManager_1.ModelManager.PhantomArenaModel.GetCollectCardDataList(), this.$Z1 = this.ypt.findIndex(t => t.CardId === this.FK1), this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn), ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewTabDataList()),
      t = (this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.lqe.SetCloseCallBack(this.I5t), this.$n1 = new CollectCardDetailPanel_1.CollectCardDetailPanel, this.xhu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel, await Promise.all([this.B7t.RefreshByDataAsync(t), this.$n1.CreateByResourceIdAsync("UiItem_CardDetail", this.GetItem(4)), this.xhu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)), this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]), ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId());
    await this.lqe.SetCurrencyItemList([t])
  }
  OnStart() {
    this.ypt.length <= 0 && Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌图鉴数据错误"), (this.FK1 < 0 || this.$Z1 < 0) && (this.$Z1 = 0, this.FK1 = this.ypt[0].CardId), this.QZ1(), this.vua = 0, this.B7t.SelectGridProxyByKey(this.vua, !0)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.KZ1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Uhu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.KZ1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.Uhu)
  }
  QZ1() {
    this.$n1?.Refresh(this.FK1);
    var t = {
      CardId: this.FK1
    };
    this.xhu?.Refresh(t)
  }
  emu() {
    (0 === this.vua ? this.$n1 : this.xhu)?.PlaySwitchSequence()
  }
  WZ1(t, i) {
    0 === t ? (this.$n1?.SetActive(i), i && this.$n1?.PlayShowSequence()) : (this.xhu?.SetActive(i), i && this.xhu?.PlayShowSequence())
  }
}
exports.CollectCardDetailView = CollectCardDetailView;
class CollectCardDetailTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.CallbackOnClick = void 0, this.fA1 = t => {
      1 === t && this.CallbackOnClick?.(this.Pe.Index)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.fA1]
    ]
  }
  Refresh(t) {
    this.Pe = t, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.NameId)
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t)
  }
  GetKey(t, i) {
    return t.Index
  }
}
exports.CollectCardDetailTabItem = CollectCardDetailTabItem;
//# sourceMappingURL=CollectCardDetailView.js.map