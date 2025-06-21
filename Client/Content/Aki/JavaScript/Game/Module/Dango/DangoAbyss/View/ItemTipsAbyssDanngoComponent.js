"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ItemTipsAbyssDangoComponent = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  InActiveRedItem_1 = require("../../../Common/InActiveRedItem"),
  ItemTipsBaseSubComponent_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsBaseSubComponent"),
  RoleAttributeItem_1 = require("../../../RoleUi/TabView/VisionSubView/RoleAttributeItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssTagItem_1 = require("./DangoAbyssTagItem");
class ItemTipsAbyssDangoComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e), this.$8i = void 0, this.Yyc = void 0, this.ucc = void 0, this.pSc = void 0, this.vSc = void 0, this.L3a = e => {
      this.Og(this.$8i)
    }, this.tWt = () => {}, this.ySc = () => {
      return new DangoAbyssTagItem_1.DangoAbyssTagItem
    }, this.Bqe = () => {
      return new RoleAttributeItem_1.RoleAttributeItem
    }, this.CreateThenShowByResourceIdAsync("UiItem_TipsChipInfo", e)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a)
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a)
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Yyc = new InActiveRedItem_1.InActiveRedItem, e.push(this.Yyc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this.ucc = new ButtonItem_1.ButtonItem, e.push(this.ucc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())), this.ucc.SetFunction(this.tWt), await Promise.all(e)
  }
  OnStart() {
    this.pSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe, this.GetItem(2).GetOwner()), this.vSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ySc, this.GetItem(4).GetOwner())
  }
  Refresh(e) {
    var t = () => {
      this.Og(e)
    };
    this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t()
  }
  Og(e) {
    this.$8i = e;
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowAttributeList(e.ConfigId),
      t = (this.fvt(t), ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowTagDataList(e.ConfigId)),
      t = (this.qSo(t), ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemConfig(e.ConfigId));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.BgDescription), this.Zyc(e), this.P7e(e), this.ASc(e)
  }
  ASc(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemLockState(e.IncId) ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e)
  }
  P7e(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(e.IncId),
      e = 0 === t || e.DangoId === t;
    this.ucc?.SetButtonAllowEventBubbleUp(e)
  }
  Zyc(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(e.IncId);
    0 === t ? this.Yyc?.SetActive(!1) : (e = e.DangoId !== t, this.Yyc?.SetActive(e))
  }
  fvt(e) {
    const i = new Array;
    e?.forEach(e => {
      var t = new RoleAttributeItem_1.RoleAttributeSt;
      t.Data = e, t.NeedCheckBg = !1, i.push(t)
    }), this.pSc.RefreshByData(i)
  }
  qSo(e) {
    this.vSc.RefreshByData(e)
  }
}
exports.ItemTipsAbyssDangoComponent = ItemTipsAbyssDangoComponent;
//# sourceMappingURL=ItemTipsAbyssDanngoComponent.js.map