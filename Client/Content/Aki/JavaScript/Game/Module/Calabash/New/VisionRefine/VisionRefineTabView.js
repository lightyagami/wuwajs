"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VisionRefineTabView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CalabashController_1 = require("../../CalabashController"),
  VisionRefineAttributePanel_1 = require("./VisionRefineAttributePanel"),
  VisionRefineChoosePanel_1 = require("./VisionRefineChoosePanel"),
  VisionRefineMaterialItem_1 = require("./VisionRefineMaterialItem"),
  VisionRefineSlotItem_1 = require("./VisionRefineSlotItem");
class VisionRefineTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), this.B1c = void 0, this.k1c = void 0, this.G1c = void 0, this.lqe = void 0, this.F1c = void 0, this.sBc = 0, this.ydu = void 0, this.j1c = !1, this.H1c = () => {
      return new VisionRefineMaterialItem_1.VisionRefineMaterialItem
    }, this.$1c = i => {
      "Start" !== i && "ShowView" !== i && "Sle" !== i || UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", !0)
    }, this.W1c = i => {
      "Start" !== i && "ShowView" !== i && "Sle" !== i || UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", !1)
    }, this.Q1c = () => {
      this.k1c.SetActive(!1), this.k1c.UiViewSequence.RemoveSequenceFinishEvent("SwitchB", this.Q1c)
    }, this.K1c = () => {
      this.k1c.SetActive(!1), this.UiViewSequence.RemoveSequenceFinishEvent("SwitchB_1", this.K1c)
    }, this.X1c = i => {
      this.ydu = void 0, this.Y1c()
    }, this.p5t = i => {
      this.ydu = i, this.G1c.RefreshItemSwitch(this.ydu)
    }, this.z1c = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(262);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)
    }, this.J1c = () => {
      this.q1c ? 2 !== this.sBc && this.q1c ? this.o_1() && this.z3e(2) : 2 === this.sBc && this.n_1() && CalabashController_1.CalabashController.RequestPhantomPolishRequest(this.q1c.GetUniqueId(), this.ydu.PropItemId) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineLackTip")
    }, this.euc = i => {
      i && 1 === this.sBc ? this.tuc() : (i || this.k1c.ClearSelection(), 1 !== this.sBc && this.z3e(1))
    }, this.ouc = () => {
      this.z3e(0)
    }, this.suc = () => {
      var i = this.q1c,
        e = this.p5t,
        i = {
          IncId: i.GetUniqueId(),
          Callback: e
        };
      UiManager_1.UiManager.OpenView("VisionRefineAttributeSelectView", i)
    }, this.rki = () => {
      1 !== this.sBc && this.z3e(1)
    }, this.I3a = i => {
      this.k1c?.OnItemFuncValueChange(i)
    }, this.huc = i => {
      UiManager_1.UiManager.OpenView("VisionRefineResultView", i, (i, e) => {
        this.k1c.ClearSelection(), this.z3e(0), this.GetItem(3).SetAlpha(1), i && (UiManager_1.UiManager.GetView(e).OnCloseCallback = this.hBc)
      })
    }, this.hBc = i => {
      i && (this.z3e(1), this.iuc())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [5, this.z1c],
      [2, this.J1c]
    ]
  }
  async OnBeforeStartAsync() {
    this.B1c = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.euc), await this.B1c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.k1c = new VisionRefineChoosePanel_1.VisionRefineChoosePanel, this.k1c.FilterSortGroupId = 40, this.k1c.OnClickCloseCallBack = this.ouc, this.k1c.OnChangeCallBack = this.X1c;
    var i = this.GetItem(0);
    await this.k1c.CreateByResourceIdAsync("UiItem_VisionRefineList", i), this.G1c = new VisionRefineAttributePanel_1.VisionRefineAttributePanel, this.G1c.BindClickCallBack(this.suc), await this.G1c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.F1c = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.H1c)
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7)), this.lqe.SetCloseCallBack(this.rki), this.lqe.SetUiActive(!1);
    var i = this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer();
    i && (i.BindSequenceStartEvent(this.$1c), i.BindSequenceCloseEvent(this.W1c)), this.sBc = 0, this.ydu = void 0
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineResult, this.huc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a)
  }
  OnBeforeShow() {
    var i;
    this.j1c = !1, this.q1c && 0 === this.sBc && (i = this.q1c.GetUniqueId(), ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i) || (this.k1c.ClearSelection(), this.k1c.ShowTipsComponent(void 0))), this.Y1c()
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRefineRedDot(!1)
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineResult, this.huc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a)
  }
  iuc() {
    this.j1c = !0;
    var i = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.k1c.RefreshList(i)
  }
  z3e(i) {
    this.sBc !== i && (this.k1c.SetActive(1 === i), this.G1c.SetActive(2 === i), this.F1c.SetActive(2 !== i), 1 === i ? this.lBc(this.sBc) : 0 === i ? this._Bc(this.sBc) : 2 === i && this.cBc(this.sBc), this.sBc = i, this.Y1c())
  }
  lBc(i) {
    this.j1c || this.iuc(), 0 === i ? (this.UiViewSequence.PlaySequence("SwitchA_1"), this.k1c.UiViewSequence.PlaySequence("SwitchA"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView)) : 2 === i && (this.UiViewSequence.PlaySequence("SwitchB_2"), this.k1c.UiViewSequence.PlaySequence("SwitchA"))
  }
  _Bc(i) {
    1 === i ? (this.UiViewSequence.PlaySequence("SwitchA_2"), this.k1c.UiViewSequence.PlaySequence("SwitchB"), this.k1c.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.Q1c), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView)) : 2 === i && (this.UiViewSequence.PlaySequence("SwitchC_1"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView), this.lqe.SetUiActive(!1))
  }
  cBc(i) {
    0 === i ? (this.lqe.SetUiActive(!0), this.UiViewSequence.PlaySequence("CaptionIn"), this.UiViewSequence.PlaySequence("SwitchC_2"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView)) : 1 === i && (this.lqe.SetUiActive(!0), this.UiViewSequence.AddSequenceFinishEvent("SwitchB_1", this.K1c), this.UiViewSequence.PlaySequence("SwitchB_1"), this.k1c.UiViewSequence.PlaySequence("SwitchB"))
  }
  tuc() {
    var i;
    this.q1c && (i = this.q1c, i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i.GetUniqueId()), this.k1c.ShowTipsComponent(i))
  }
  Y1c() {
    let i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialDefaultCost();
    this.q1c && (i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialCost(this.q1c.GetUniqueId()));
    const t = new Array;
    var e, s;
    i.forEach((i, e) => {
      e = {
        ItemId: e,
        IncId: 0,
        Count: this.q1c ? i : 0,
        SelectedCount: 0
      };
      t.push(e)
    }), this.F1c.RefreshByData(t), this.q1c ? (s = this.q1c.GetUniqueId(), e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s), s = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(s), this.B1c.RefreshByData(s, 2 === this.sBc, e.GetCost()), s = e.GetMainPropShowAttributeList(1), this.G1c.RefreshItemNow(s), this.G1c.RefreshItemSwitch(this.ydu)) : this.B1c.RefreshEmpty()
  }
  get q1c() {
    return this.k1c?.GetSelection()
  }
  OnClickCloseRoot() {
    return 2 === this.sBc && (this.z3e(1), !0)
  }
  o_1() {
    return !!ModelManager_1.ModelManager.PhantomBattleModel.IsVisionRefineMaterialEnough(this.q1c.GetUniqueId()) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineMaterialLack"), !1)
  }
  n_1() {
    return !!this.ydu || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineAttributeEmpty"), !1)
  }
}
exports.VisionRefineTabView = VisionRefineTabView;
//# sourceMappingURL=VisionRefineTabView.js.map