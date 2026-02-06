"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineChoosePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRefineMediumItemGrid_1 = require("./VisionRefineMediumItemGrid");
const VisionRefineTabCostItem_1 = require("./VisionRefineTabCostItem");
class VisionRefineChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.w1c = [];
    this.tRg = [];
    this.iRg = undefined;
    this.UiViewSequence = undefined;
    this.Vvt = undefined;
    this.A1c = undefined;
    this.vpt = undefined;
    this.Mpt = undefined;
    this.rRg = new Map([[2, []], [1, []], [0, []]]);
    this.oRg = undefined;
    this.nRg = undefined;
    this.sRg = 0;
    this.H7g = undefined;
    this.lqe = undefined;
    this.OnClickCloseCallBack = undefined;
    this.OnChangeCallBack = undefined;
    this.OnChangeMultiCallback = undefined;
    this.OnCostTabChangeCallback = undefined;
    this.OnGetMainPropItemIdCallback = undefined;
    this.sGe = () => {
      var i = new VisionRefineMediumItemGrid_1.VisionRefineMediumItemGrid();
      i.BindOnExtendToggleStateChanged(this.x1c);
      i.BindOnCanExecuteChange(this.X8a);
      i.BindReduceButtonCallback(this.nAg);
      i.CheckSelectByView = this.vRu;
      i.CheckWarningByView = this.aRg;
      i.GetRefineType = () => this.CurrentRefineType;
      return i;
    };
    this.hRg = () => new VisionRefineTabCostItem_1.VisionRefineTabCostItem();
    this.lRg = i => {
      i = i.GetConfig().Rarity;
      switch (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(i).Cost) {
        case 1:
          return this.CurrentCostType === 2;
        case 3:
          return this.CurrentCostType === 1;
        case 4:
          return this.CurrentCostType === 0;
        default:
          return false;
      }
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
      i = i.Data;
      this.RefreshSelectionByItemData(i);
    };
    this.OnItemFuncValueChange = t => {
      if (ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t)) {
        for (let i = 0; i < this.w1c.length; i++) {
          if (this.w1c[i].GetUniqueId() === t) {
            this.A1c.RefreshGridProxy(i);
            break;
          }
        }
      }
    };
    this.X8a = (i, t, e) => {
      const s = i.GetUniqueId();
      if (!ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s).GetVisionIfCanRefine(this.CurrentRefineType)) {
        switch (this.CurrentRefineType) {
          case 0:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_ONLY_FIVE_STAR_TIP_TEXT_ID);
            break;
          case 1:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_SUB_ONLY_FULL_LEVEL_TIP_TEXT_ID);
        }
        this.ShowTipsComponent(i);
        return false;
      }
      if (this.CurrentRefineType === 0 && this.CurrentSelectedList !== undefined) {
        if (this.CurrentSelectedList.some(i => i.GetUniqueId() === s)) {
          return false;
        }
        if (this.CurrentSelectedList.length >= 10) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_CHOOSE_LIST_IS_FULL_TIP_TEXT_ID);
          this.ShowTipsComponent(i);
          return false;
        }
      }
      return true;
    };
    this.nAg = i => {
      i = i.Data;
      this.RefreshSelectionByItemData(i);
      this.ShowTipsComponent(undefined);
    };
    this.FNt = i => {
      this.w1c = i;
      this.A1c.RefreshByData(this.w1c);
      this.GetItem(6).SetUIActive(i?.length <= 0);
      this.ShowTipsComponent(undefined);
    };
    this.vRu = i => {
      if (this.CurrentRefineType === 0) {
        if (this.CurrentSelectedList !== undefined) {
          for (const t of this.CurrentSelectedList) {
            if (t.GetUniqueId() === i?.GetUniqueId()) {
              return true;
            }
          }
        }
        return false;
      }
      return !!i && !!this.ys_ && i.GetUniqueId() === this.ys_.GetUniqueId();
    };
    this.aRg = i => {
      var t;
      var i = i?.GetUniqueId();
      return i !== undefined && this.OnGetMainPropItemIdCallback !== undefined && (i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i)) !== undefined && (t = this.OnGetMainPropItemIdCallback()) !== undefined && t === i.GetPhantomFirstMainProp().Yws;
    };
    this.ph1 = (i, t) => {
      t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(t);
      this.ShowTipsComponent(t);
    };
  }
  get ys_() {
    if (this.CurrentRefineType !== 0) {
      return this.iRg;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 64, "主音洗练时不应该使用单选逻辑");
    }
  }
  get FilterSortGroupId() {
    if (this.CurrentRefineType === 0) {
      switch (this.CurrentCostType) {
        case 0:
          return 53;
        case 1:
          return 54;
        case 2:
          return 55;
        default:
          return 40;
      }
    }
    if (this.CurrentRefineType === 1) {
      return 51;
    } else {
      return 40;
    }
  }
  get CurrentSelectedList() {
    if (this.CurrentRefineType !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 64, "辅音洗练时不应该使用多选逻辑");
      }
    } else {
      if (this.CurrentCostType !== undefined) {
        return this.rRg.get(this.CurrentCostType);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Calabash", 64, "主音洗练时尚未选择cost，检查调用时机");
      }
    }
  }
  get CurrentRefineType() {
    return this.oRg;
  }
  set CurrentRefineType(i) {
    this.oRg = i;
    this.GetItem(9)?.SetUIActive(this.oRg === 0);
  }
  get CurrentCostType() {
    if (this.CurrentRefineType !== 1) {
      return this.sRg;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 64, "辅音洗练时不应该使用Cost逻辑");
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIItem]];
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
    this.nRg = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.hRg);
    await this.nRg.RefreshByDataAsync(this._Rg());
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(12));
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
  ClearCurrentCostMultiChoose() {
    if (this.CurrentCostType !== undefined) {
      var t = this.rRg.get(this.CurrentCostType);
      if (t !== undefined) {
        for (let i = t.length - 1; i >= 0; i--) {
          var e = t[i];
          t.splice(i, 1);
          this.SRu(e);
        }
      }
    }
  }
  RemoveInvalidSelections() {
    var i;
    var t;
    this.ShowTipsComponent(undefined);
    if (this.iRg !== undefined) {
      i = this.iRg.GetUniqueId();
      if (!ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i)) {
        this.iRg = undefined;
      }
    }
    for ([, t] of this.rRg) {
      for (let i = t.length - 1; i >= 0; i--) {
        var e = t[i].GetUniqueId();
        if (!ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e)) {
          t.splice(i, 1);
        }
      }
    }
  }
  GetSelection() {
    return this.ys_;
  }
  SetSelection(i) {
    this.iRg = i;
  }
  SetSelectionDummy(i) {
    var t = i.GetConfig().Rarity;
    switch (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(t).Cost) {
      case 1:
        this.sRg = 2;
        break;
      case 3:
        this.sRg = 1;
        break;
      case 4:
        this.sRg = 0;
    }
    t = this.rRg.get(this.sRg);
    if (t === undefined || t.length !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Calabash", 64, "已经选中dummy", ["CostType", this.sRg], ["List", t]);
      }
    } else {
      t.push(i);
    }
  }
  RefreshList(i) {
    let t = this.tRg = i;
    if (this.CurrentRefineType === 0) {
      t = i.filter(this.lRg);
    }
    this.Mpt.SetSortToggleState(false);
    this.vpt.UpdateData(this.FilterSortGroupId, t);
    i = this.vpt.GetUniqueIdByGroupId(this.FilterSortGroupId);
    this.Mpt.SetFilterUniqueId(i);
    this.Mpt.UpdateData(this.FilterSortGroupId, t);
    i = this.Mpt.GetUniqueIdByGroupId(this.FilterSortGroupId);
    this.vpt.SetSortUniqueId(i);
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
  RefreshCurrency(i) {
    if (i === undefined) {
      this.lqe?.SetUiActive(false);
    } else {
      this.lqe?.SetUiActive(true);
      this.lqe?.SetCurrencyItemList(i);
    }
  }
  RefreshSelectionByItemData(i) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i.GetUniqueId());
    if (t && t.GetVisionIfCanRefine(this.CurrentRefineType)) {
      if (this.CurrentRefineType === 0) {
        if (this.CurrentSelectedList !== undefined) {
          for (var [e, s] of this.CurrentSelectedList.entries()) {
            if (i.GetUniqueId() === s.GetUniqueId()) {
              this.CurrentSelectedList.splice(e, 1);
              this.SRu(i);
              this.ShowTipsComponent(i);
              if (this.OnChangeMultiCallback !== undefined && this.CurrentCostType !== undefined) {
                this.OnChangeMultiCallback(this.rRg.get(this.CurrentCostType));
              }
              return;
            }
          }
          this.uRg(i);
          this.ShowTipsComponent(i);
          if (this.OnChangeMultiCallback !== undefined && this.CurrentCostType !== undefined) {
            this.OnChangeMultiCallback(this.rRg.get(this.CurrentCostType));
          }
        }
      } else if (this.ys_ === i) {
        this.ClearSelection();
      } else {
        this.yRu(i);
        this.ShowTipsComponent(i);
        if (this.OnChangeCallBack) {
          this.OnChangeCallBack(this.ys_);
        }
      }
    }
  }
  yRu(i) {
    var t = this.ys_;
    this.iRg = undefined;
    this.SRu(t);
    this.iRg = i;
    this.SRu(i);
  }
  uRg(i) {
    if (this.CurrentSelectedList !== undefined && !(this.CurrentSelectedList.length >= 10)) {
      this.CurrentSelectedList.push(i);
      this.SRu(i);
    }
  }
  SRu(t) {
    if (t) {
      let i = -1;
      for (var [e, s] of this.w1c.entries()) {
        if (s.GetUniqueId() === t.GetUniqueId()) {
          i = e;
          break;
        }
      }
      if (this.A1c.IsGridDisplaying(i)) {
        this.A1c.UnsafeGetGridProxy(i)?.RefreshByView(t);
      }
    }
  }
  _Rg() {
    var i = [];
    for (const [e, s] of CalabashDefine_1.visionRefineCostMap) {
      var t = new VisionRefineTabCostItem_1.VisionRefineTabCostItemData();
      t.IsChosen = e === this.CurrentCostType;
      t.CostType = e;
      t.TabTextId = s;
      t.OnClick = () => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Calabash", 64, "点击tab", ["type", e]);
        }
        this.H7g = e;
        this.sRg = e;
        this.cRg(e);
        this.RefreshList(this.tRg);
        if (this.OnCostTabChangeCallback !== undefined) {
          this.OnCostTabChangeCallback();
        }
      };
      t.CanChangeExecute = i => i !== this.H7g;
      i.push(t);
    }
    return i;
  }
  cRg(i) {
    if (this.nRg !== undefined) {
      for (const t of this.nRg.GetLayoutItemList()) {
        if (t.CheckChosen(i)) {
          t.OnSelected(false);
        } else {
          t.OnDeselected(false);
        }
      }
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