"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookingIngredientsVerticalView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent");
const ManufactureMaterialItem_1 = require("../Manufacture/Common/Item/ManufactureMaterialItem");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const CookController_1 = require("./CookController");
const CookItemView_1 = require("./View/CookItemView");
const CookProficiencyView_1 = require("./View/CookProficiencyView");
class MaterialSelectionCacheData {
  static SetMaterialSelectIndex(e) {
    MaterialSelectionCacheData.cGt = e;
  }
  static GetMaterialSelectIndex() {
    return MaterialSelectionCacheData.cGt;
  }
  static SetMaterialUseNum(e) {
    MaterialSelectionCacheData.mGt = e;
  }
  static GetMaterialUseNum() {
    return MaterialSelectionCacheData.mGt;
  }
  static CheckCanSelected(e) {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >= MaterialSelectionCacheData.GetMaterialUseNum();
  }
}
MaterialSelectionCacheData.TmpSelectedMaterialData = undefined;
MaterialSelectionCacheData.MaterialTypeNum = 0;
MaterialSelectionCacheData.cGt = 0;
MaterialSelectionCacheData.mGt = 0;
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CGt = undefined;
    this.fGt = undefined;
    this.pGt = (e, t, i) => {
      t = new CookItemView_1.MachiningClueItem(t);
      t.Update(e.IsUnlock, e.ContentText);
      return {
        Key: i,
        Value: t
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIVerticalLayout]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.CGt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(6), this.pGt);
    this.GetText(3).SetUIActive(false);
    this.dde();
    this.GetItem(1).SetUIActive(false);
    this.GetText(3).SetUIActive(true);
  }
  OnBeforeDestroy() {
    this.CGt = undefined;
    this.fGt = undefined;
    this.Cde();
  }
  dde() {}
  Cde() {}
  SetTypeName(e = undefined) {
    var t = this.GetText(0);
    if (e) {
      t.SetUIActive(true);
      t.SetText(e);
    } else {
      t.SetUIActive(false);
    }
  }
  RefreshCooking(e, t) {
    var i;
    if (this.vGt(e)) {
      if (this.fGt && this.fGt.ItemId !== e.ItemId) {
        ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = undefined;
      }
      this.fGt = e;
      i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e.ItemId);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetItemAttributeDesc(e.DataId);
      i = StringUtils_1.StringUtils.IsEmpty(i.FoodBackground) ? "" : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.FoodBackground);
      this.CGt.SetActive(false);
      this.GetText(3).SetUIActive(true);
      this.GetText(3).SetText(e);
      this.GetText(5).SetText(i);
    }
  }
  vGt(e) {
    return !!e || (Log_1.Log.CheckError() && Log_1.Log.Error("Cook", 49, "缺少itemData数据"), false);
  }
  RefreshMachining(e) {
    if (this.vGt(e)) {
      this.fGt = e;
      this.CGt.SetActive(true);
      var t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e.ItemId);
      var i = ItemInfoById_1.configItemInfoById.GetConfig(t.FinalItemId);
      var i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.BgDescription);
      this.GetText(3).SetUIActive(false);
      this.GetText(5).SetText(i);
      var r = new Array();
      for (const a of t.InterationId) {
        var s;
        var o = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(a);
        if (e.InteractiveList.includes(a)) {
          s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Introduce);
          r.push({
            IsUnlock: true,
            ContentText: s
          });
        } else {
          s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Description);
          r.push({
            IsUnlock: false,
            ContentText: s
          });
        }
      }
      this.CGt.RebuildLayoutByDataNew(r);
    }
  }
}
class CookingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MGt = undefined;
    this.ItemData = undefined;
    this.WGe = undefined;
    this.t6 = 1;
    this.ShowMaterialItemRemoveControl = false;
    this.EGt = undefined;
    this.gGt = undefined;
    this.SGt = false;
    this.yGt = 0;
    this.IGt = undefined;
    this.OnChangeMaterialSelectionDelegate = undefined;
    this.TGt = () => {
      var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(e => {
        e = e.Data;
        if (e.K6n) {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.L8n);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ItemSelectCookUnlockTip");
        }
      });
      return e;
    };
    this.I7e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenCookRole, this.ItemData.ItemId);
    };
    this.LGt = e => {
      var t;
      this.t6 = e;
      this.DGt();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "Text_ItemSelectCookQuantityTip_text", this.t6);
      if (this.ItemData && this.ItemData.MainType === 0) {
        this.RefreshProficiency(this.ItemData, this.t6);
      }
      if (this.ItemData) {
        t = CookController_1.CookController.GetMaxCreateCount(this.ItemData.ItemId, this.ItemData.MainType);
        this.WGe.SetAddButtonInteractive(e < t);
        this.WGe.SetReduceButtonInteractive(e > 1);
      }
    };
  }
  get CurrentSetCount() {
    return this.t6;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [19, UE.UIScrollViewWithScrollbarComponent], [17, UE.UIText], [18, UE.UIItem], [20, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [21, UE.UIItem], [8, UE.UIItem], [16, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [24, UE.UIItem], [25, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UITexture], [26, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(19), this.TGt);
    this.MGt = new SvInfo();
    await this.MGt.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.MGt.SetActive(true);
    this.gGt = new CookProficiencyView_1.ProficiencyView();
    await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
    this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.GetItem(18).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(16).SetUIActive(true);
    this.GetItem(18).SetUIActive(true);
    this.GetItem(22).SetUIActive(false);
    this.GetText(23).ShowTextNew("NeedMaterialTitleText");
    this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text");
    var e = this.GetItem(8);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e);
    var e = {
      MaxNumber: 0,
      ValueChangeFunction: this.LGt
    };
    this.WGe.Init(e);
    this.WGe.SetUiActive(true);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.WGe.SetAddReduceButtonActive(true);
    this.GetText(12).SetUIActive(false);
    this.IGt = new MediumItemGrid_1.MediumItemGrid();
    this.IGt.Initialize(this.GetItem(21).GetOwner());
    this.IGt.BindOnCanExecuteChange(() => false);
    this.IGt.BindOnExtendToggleClicked(e => {
      e = e.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    });
  }
  OnBeforeDestroy() {
    this.MGt = undefined;
    this.EGt = undefined;
    this.OnChangeMaterialSelectionDelegate = undefined;
  }
  vGt(e) {
    return !!e || (Log_1.Log.CheckError() && Log_1.Log.Error("Cook", 49, "缺少itemData数据"), false);
  }
  STi(t) {
    if (this.vGt(t)) {
      let e = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId;
      if (!e) {
        e = ModelManager_1.ModelManager.CookModel.GetCookRoleId(t.ItemId);
        ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = e;
      }
      this.gGt.SetRoleTexture(e, t.ItemId);
    }
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) {
      for (const t of e) {
        t.SetTimes(this.t6);
      }
    }
  }
  UGt(e, t) {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    switch (t) {
      case 0:
        this.MGt.SetTypeName();
        this.gGt.SetTypeContent(i);
        break;
      case 1:
        this.MGt.SetTypeName(i);
        this.gGt.SetTypeContent();
        break;
      default:
        this.MGt.SetTypeName();
        this.gGt.SetTypeContent();
    }
  }
  AGt(e) {
    if (e.ExistEndTime <= 0) {
      this.GetItem(24).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      this.GetItem(24).SetUIActive(true);
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime());
      this.GetText(25).SetText(e.CountDownText);
    }
  }
  PGt(t) {
    if (t === undefined || t.LimitTotalCount <= 0) {
      this.GetItem(3).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      var i = t.LimitTotalCount - t.CookCount;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let e = i.toString();
      if (i === 0) {
        e = StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", i.toString());
      }
      this.GetItem(3).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "MakeLimit", e, t.LimitTotalCount);
    }
  }
  RGt(e, t) {
    var i;
    this.GetText(12).GetParentAsUIItem().SetUIActive(e);
    if (e) {
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(CookController_1.CookController.CookCoinId);
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(CookController_1.CookController.CookCoinId);
      if (e < t) {
        this.GetText(11).SetText(StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", t.toString()));
      } else {
        this.GetText(11).SetText(t.toString());
      }
      this.SetTextureByPath(i.IconSmall, this.GetTexture(13));
    }
  }
  RefreshProficiency(e, t) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e.ItemId);
    var r = i.Proficiency;
    var i = i.MaxProficiencyCount;
    this.gGt.SetExpNum(e.CookCount, r, i, t);
    this.STi(e);
  }
  xGt(e) {
    let t = false;
    let i = 0;
    e = e.filter(e => e.L8n !== CookController_1.CookController.CookCoinId || (t = true, i = e.UVn, false));
    return [t, i, e];
  }
  OnSecondTimerRefresh() {
    if (this.ItemData && this.ItemData.MainType === 0) {
      this.AGt(this.ItemData);
    }
  }
  RefreshCooking(e) {
    var t;
    if (e) {
      this.ItemData = e;
      this.t6 = 1;
      this.WGe.SetUiActive((t = e).IsUnLock);
      this.GetItem(9).SetUIActive(e.IsUnLock);
      this.MGt.RefreshCooking(t, this.t6);
      this.GetItem(26).SetUIActive(true);
      this.RefreshProficiency(t, this.t6);
      this.UGt("Dishes", 0);
      if (e.IsUnLock) {
        this.GetItem(20).SetUIActive(false);
        this.GetItem(18).SetUIActive(true);
        t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(this.ItemData.ItemId, 0);
        [this.SGt, this.yGt, t] = this.xGt(t);
        this.EGt.RefreshByData(t, () => {
          this.DGt();
        });
        this.WGe.SetUiActive(true);
        this.GetItem(9).SetUIActive(true);
        this.AGt(e);
        this.PGt(e);
        t = CookController_1.CookController.GetMaxCreateCount(this.ItemData.ItemId, ModelManager_1.ModelManager.CookModel.CurrentCookListType);
        this.WGe.Refresh(t);
        this.WGe.SetAddReduceButtonActive(true);
        this.WGe.SetReduceButtonInteractive(false);
      } else {
        this.PGt();
        this.GetItem(20).SetUIActive(true);
        this.GetItem(18).SetUIActive(false);
        e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(this.ItemData.ItemId);
        if (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e.FormulaItemId)) {
          e = {
            Type: 4,
            Data: e.FormulaItemId,
            ItemConfigId: e.FormulaItemId,
            BottomTextId: t.Name,
            IsProhibit: true,
            IsOmitBottomText: true
          };
          this.IGt.Apply(e);
        }
      }
    }
  }
  RefreshMachining(t) {
    if (t) {
      this.GetItem(20).SetUIActive(false);
      this.GetItem(18).SetUIActive(true);
      this.ItemData = t;
      this.UGt("Accessory", 1);
      this.MGt.RefreshMachining(t);
      this.GetItem(26).SetUIActive(false);
      MaterialSelectionCacheData.TmpSelectedMaterialData = [];
      this.ShowMaterialItemRemoveControl = false;
      var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(this.ItemData.ItemId, this.ItemData.MainType);
      ModelManager_1.ModelManager.CookModel.CreateTmpMachiningItemList(t);
      this.EGt.RefreshByData(t, () => {
        this.DGt();
      });
      let e = true;
      for (const i of t) {
        if (!i.K6n) {
          e = false;
          break;
        }
      }
      this.WGe.SetUiActive(e);
      this.GetItem(9).SetUIActive(e);
      if (e) {
        t = CookController_1.CookController.GetMaxCreateCount(this.ItemData.ItemId, ModelManager_1.ModelManager.CookModel.CurrentCookListType);
        this.WGe.ResetLimitMaxValue();
        this.WGe.Refresh(t);
        this.WGe.SetAddReduceButtonActive(true);
        this.WGe.SetReduceButtonInteractive(false);
        this.GetItem(24).SetUIActive(false);
        this.GetItem(3).SetUIActive(false);
      }
    }
  }
}
exports.CookingIngredientsVerticalView = CookingIngredientsVerticalView;
//# sourceMappingURL=CookingIngredientsVerticalView.js.map