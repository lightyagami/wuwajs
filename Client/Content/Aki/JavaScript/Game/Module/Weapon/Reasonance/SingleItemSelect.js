"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleItemSelect = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../Common/CommonItemSelectView");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent");
const AttributeItemData_1 = require("../../Inventory/ItemData/AttributeItemData");
const PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData");
const WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData");
class SingleItemSelect {
  constructor() {
    this.HOo = undefined;
    this.ebt = undefined;
    this.LNt = undefined;
    this.jOo = undefined;
    this.WOo = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
    this.KOo = new SelectableComponent_1.SelectableComponentData();
    this.QOo = 0;
    this.Z6i = 0;
    this.XOo = false;
    this.OpenItemSelectView = () => {
      var t = [];
      if (this.HOo) {
        t.push(this.HOo);
      }
      this.WOo.ItemDataBaseList = this.LNt();
      this.WOo.SelectedDataList = t;
      this.WOo.UseWayId = this.Z6i;
      this.WOo.InitSortToggleState = this.XOo;
      if (this.QOo === 0) {
        UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", this.WOo);
      } else {
        UiManager_1.UiManager.OpenView("CommonItemSelectViewLeft", this.WOo);
      }
    };
    this.$Oo = (t, e) => {
      if (t?.length > 0) {
        this.HOo = t[0];
      } else {
        this.HOo = undefined;
      }
      this.YOo();
    };
    this.JOo = (t, e, i, s) => !this.HOo || e !== this.HOo.IncId || i !== this.HOo.ItemId || !(s > 0);
  }
  Init(t, e = 0) {
    this.ebt = new MediumItemGrid_1.MediumItemGrid();
    this.ebt.Initialize(t.GetOwner());
    this.ebt.Apply({
      Type: 1
    });
    this.QOo = e;
    this.ebt.BindEmptySlotButtonCallback(this.OpenItemSelectView);
    this.ebt.BindReduceButtonCallback(this.OpenItemSelectView);
    this.ebt.BindOnExtendToggleRelease(this.OpenItemSelectView);
    this.ebt.BindOnCanExecuteChange(() => false);
    this.ebt.SetReduceButton(undefined);
    this.KOo.IsSingleSelected = true;
    this.KOo.OnChangeSelectedFunction = this.$Oo;
    this.KOo.CheckIfCanAddFunction = this.JOo;
    this.WOo.SelectableComponentData = this.KOo;
  }
  SetUseWayId(t) {
    this.Z6i = t;
  }
  SetInitSortToggleState(t) {
    this.XOo = t;
  }
  YOo() {
    if (this.HOo === undefined) {
      this.ebt.SetSelected(false);
      this.ebt.Apply({
        Type: 1
      });
    } else {
      var e = this.HOo.IncId;
      var i = this.HOo.ItemId;
      var s = ModelManager_1.ModelManager.InventoryModel;
      let t = s.GetAttributeItemData(e);
      var a;
      var h;
      var s = {
        Type: 4,
        ItemConfigId: i,
        StarLevel: (t = t || s.GetCommonItemData(i)).GetQuality()
      };
      if (t instanceof AttributeItemData_1.AttributeItemData) {
        s.BottomTextId = "Text_LevelShow_Text";
        if (t instanceof PhantomItemData_1.PhantomItemData) {
          i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
          a = (h = ModelManager_1.ModelManager.PhantomBattleModel).GetPhantomBattleData(e);
          h = h.GetPhantomBattleData(e).GetPhantomLevel();
          s.BottomTextParameter = [h];
          s.BottomTextId = i.Name;
          s.StarLevel = i.QualityId;
          s.Level = a.GetCost();
          s.IsLevelTextUseChangeColor = true;
        }
        if (t instanceof WeaponItemData_1.WeaponItemData) {
          i = (h = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)).GetLevel();
          s.Level = h.GetResonanceLevel();
          s.BottomTextParameter = [i];
        }
      } else {
        s.BottomText = this.HOo.SelectedCount.toString();
      }
      this.ebt.Apply(s);
      this.ebt.SetSelected(true);
    }
    this.jOo(this.HOo);
  }
  ClearSelectData() {
    this.HOo = undefined;
    this.YOo();
  }
  SetItemSelectChangeCallBack(t) {
    this.jOo = t;
  }
  SetGetItemListFunction(t) {
    this.LNt = t;
  }
  GetCurrentSelectedData() {
    return this.HOo;
  }
}
exports.SingleItemSelect = SingleItemSelect;
//# sourceMappingURL=SingleItemSelect.js.map