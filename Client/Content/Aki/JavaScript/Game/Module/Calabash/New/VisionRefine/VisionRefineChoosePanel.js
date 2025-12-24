"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineChoosePanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const VisionRefineMediumItemGrid_1 = require("./VisionRefineMediumItemGrid");
class VisionRefineChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.w1c = [];
    this.ys_ = undefined;
    this.FilterSortGroupId = 0;
    this.UiViewSequence = undefined;
    this.Vvt = undefined;
    this.A1c = undefined;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.OnClickCloseCallBack = undefined;
    this.OnChangeCallBack = undefined;
    this.sGe = () => {
      var i = new VisionRefineMediumItemGrid_1.VisionRefineMediumItemGrid();
      i.BindOnExtendToggleStateChanged(this.x1c);
      i.BindOnCanExecuteChange(this.X8a);
      i.CheckSelectByView = this.vRu;
      return i;
    };
    this.OnClickMask = () => {
      this.GetItem(2).SetUIActive(false);
      this.GetButton(1).RootUIComp.SetUIActive(false);
    };
    this.OnClickClose = () => {
      if (this.OnClickCloseCallBack) {
        this.OnClickCloseCallBack();
      } else {
        this.SetActive(false);
      }
    };
    this.x1c = i => {
      var e;
      var i = i.Data;
      if (this.ys_ === i) {
        this.ClearSelection();
      } else if ((e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i.GetUniqueId())) && e.GetVisionIfCanRefine() && (this.yRu(i), this.ShowTipsComponent(i), this.OnChangeCallBack)) {
        this.OnChangeCallBack(this.ys_);
      }
    };
    this.OnItemFuncValueChange = e => {
      if (ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e)) {
        for (let i = 0; i < this.w1c.length; i++) {
          if (this.w1c[i].GetUniqueId() === e) {
            this.A1c.RefreshGridProxy(i);
            break;
          }
        }
      }
    };
    this.X8a = (i, e, t) => {
      var s = i.GetUniqueId();
      return !!ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s).GetVisionIfCanRefine() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineChooseCheck"), this.ShowTipsComponent(i), false);
    };
    this.FNt = i => {
      this.w1c = i;
      this.A1c.RefreshByData(this.w1c);
      this.GetItem(6).SetUIActive(i?.length <= 0);
      this.ShowTipsComponent(undefined);
    };
    this.vRu = i => {
      return !!i && !!this.ys_ && i.GetUniqueId() === this.ys_.GetUniqueId();
    };
    this.ph1 = (i, e) => {
      e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(e);
      this.ShowTipsComponent(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[1, this.OnClickMask], [3, this.OnClickClose]];
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent();
    await this.Vvt.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.A1c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.sGe);
  }
  OnStart() {
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(7), this.FNt);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(8), this.FNt);
  }
  ClearSelection() {
    this.yRu(undefined);
    if (this.OnChangeCallBack) {
      this.OnChangeCallBack(this.ys_);
    }
  }
  GetSelection() {
    return this.ys_;
  }
  SetSelection(i) {
    this.ys_ = i;
  }
  RefreshList(i) {
    this.Mpt.SetSortToggleState(false);
    this.vpt.UpdateData(this.FilterSortGroupId, i);
    var e = this.vpt.GetUniqueIdByGroupId(this.FilterSortGroupId);
    this.Mpt.SetFilterUniqueId(e);
    this.Mpt.UpdateData(this.FilterSortGroupId, i);
    var e = this.Mpt.GetUniqueIdByGroupId(this.FilterSortGroupId);
    this.vpt.SetSortUniqueId(e);
  }
  ShowTipsComponent(i) {
    if (i) {
      i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(i.GetConfigId(), i.GetUniqueId());
      this.Vvt.Refresh(i);
      this.GetItem(2).SetUIActive(true);
      this.GetButton(1).RootUIComp.SetUIActive(true);
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetButton(1).RootUIComp.SetUIActive(false);
    }
  }
  yRu(i) {
    var e = this.ys_;
    this.ys_ = undefined;
    this.SRu(e);
    this.ys_ = i;
    this.SRu(i);
  }
  SRu(i) {
    var e;
    if (i && (e = this.w1c.indexOf(i), this.A1c.IsGridDisplaying(e))) {
      this.A1c.UnsafeGetGridProxy(e)?.RefreshByView(i);
    }
  }
  OnAfterShow() {
    this.OnAddEventListener();
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectItemAdd, this.ph1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectItemAdd, this.ph1);
  }
}
exports.VisionRefineChoosePanel = VisionRefineChoosePanel;
//# sourceMappingURL=VisionRefineChoosePanel.js.map