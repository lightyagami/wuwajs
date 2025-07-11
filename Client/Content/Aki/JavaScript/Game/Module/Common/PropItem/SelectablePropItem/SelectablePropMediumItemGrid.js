"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropMediumItemGrid = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../MediumItemGrid/LoopScrollMediumItemGrid");
class SelectablePropMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.SelectablePropData = undefined;
    this.zBt = undefined;
    this.ZBt = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectItemAdd, this.SelectablePropData.ItemId, this.SelectablePropData.IncId);
    };
  }
  OnSelected(e) {
    if (e) {
      e = {
        IsVisible: true,
        LongPressConfigId: 1
      };
      this.SetSelected(true, true);
      this.SetReduceButton(e);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  SetSelected(e, t = false) {
    this.RefreshUi(this.SelectablePropData);
    super.SetSelected(e, t);
  }
  OnStart() {
    this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.ZBt);
  }
  OnBeforeDestroy() {
    this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind();
    this.zBt = undefined;
  }
  OnRefresh(e, t, i) {
    this.SelectablePropData = e;
    this.SetSelected(e.SelectedCount > 0, true);
    if (this.zBt) {
      this.zBt(this);
    }
  }
  RefreshUi(e) {
    this.SelectablePropData = e;
    var t = ModelManager_1.ModelManager.InventoryModel;
    var i = e.IncId;
    var s = e.ItemId;
    var r = e.ItemDataType;
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s);
    let n = undefined;
    if (n = i > 0 ? t.GetAttributeItemData(i) : t.GetCommonItemData(s)) {
      var a = this.SelectablePropData.SelectedCount;
      var h = this.SelectablePropData.Count;
      var d = {
        Type: 4,
        Data: e,
        ItemConfigId: s,
        StarLevel: o.QualityId,
        ReduceButtonInfo: {
          IsVisible: a > 0,
          LongPressConfigId: 1
        },
        IsLockVisible: n.GetIsLock(),
        IsDeprecate: n.GetIsDeprecated()
      };
      switch (r) {
        case 0:
          d.BuffIconType = o.ItemBuffType;
          d.IsOmitBottomText = false;
          if (a > 0) {
            d.BottomTextId = "Text_ItemEnoughText_Text";
            d.BottomTextParameter = [a, h];
          } else {
            d.BottomText = h.toString();
          }
          break;
        case 2:
          var l = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i);
          var u = l.GetResonanceLevel();
          d.Level = u;
          d.BottomTextId = "Text_LevelShow_Text";
          d.BottomTextParameter = [l.GetLevel()];
          break;
        case 3:
          u = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i);
          d.Level = u.GetCost();
          d.IsLevelTextUseChangeColor = true;
          d.BottomTextId = "VisionLevel";
          d.BottomTextParameter = [u.GetPhantomLevel()];
          d.VisionFetterGroupId = u.GetFetterGroupId();
          d.IsOmitBottomText = true;
          break;
        default:
          if (a > 0) {
            d.BottomTextId = "Text_ItemEnoughText_Text";
            d.BottomTextParameter = [a, h];
          } else {
            d.BottomText = h.toString();
          }
      }
      this.Apply(d);
    }
  }
  RefreshCostCount() {
    if (this.SelectablePropData) {
      var e = this.SelectablePropData.ItemDataType;
      var t = this.SelectablePropData.SelectedCount;
      var i = this.SelectablePropData.Count;
      switch (e) {
        case 0:
          if (t > 0) {
            this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i]);
          } else {
            this.SetBottomText(this.SelectablePropData.Count.toString());
          }
          break;
        case 2:
        case 3:
          break;
        default:
          if (t > 0) {
            this.SetBottomTextId("Text_ItemEnoughText_Text", [t, i]);
          } else {
            this.SetBottomText(this.SelectablePropData.Count.toString());
          }
      }
    }
  }
  BindAfterApply(e) {
    this.zBt = e;
  }
}
exports.SelectablePropMediumItemGrid = SelectablePropMediumItemGrid;
//# sourceMappingURL=SelectablePropMediumItemGrid.js.map