"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryMediumItemGrid = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RED_TICK_HEX = "bf5c5c";
const TICK_COLOR_HEX = "663738";
const RED_TICK_ALPHA = 0.9;
class InventoryMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.rdi = undefined;
    this.ndi = undefined;
  }
  OnStart() {
    this.SetUseFixedAsync(true);
  }
  OnRefresh(e, t, i) {
    var r = (this.rdi = e).GetItemViewInfo();
    var o = r.ItemDataType;
    var s = r.QualityId;
    var l = e.GetItemOperationType() === 1;
    var a = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetConfigId(),
      StarLevel: s,
      IsNewVisible: r.IsNewItem,
      IsLockVisible: r.IsLock,
      IsDeprecate: r.IsDeprecate,
      CoolDown: this.GetRemainingCoolDownTime(),
      TotalCoolDown: this.GetTotalCoolDownTime(),
      IsRedDotVisible: r.HasRedDot,
      IsDisable: l && !e.IsItemCanDestroy(),
      IsCheckTick: r.IsSelectOn
    };
    switch (o) {
      case 0:
        var n = this.rdi.GetItemDataBase();
        if (r.SelectOnNum) {
          d = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemRecycleChosen_text");
          d = StringUtils_1.StringUtils.Format(d, r.SelectOnNum.toString(), e.GetCount().toString());
          a.BottomText = d;
        } else {
          a.BottomText = e.GetCount().toString();
        }
        a.IsTimeFlagVisible = n.IsLimitTimeItem();
        a.BuffIconType = n.GetConfig().ItemBuffType;
        a.IsOmitBottomText = false;
        break;
      case 2:
        var d = this.rdi.GetItemDataBase().GetUniqueId();
        var n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(d);
        a.BottomTextId = "Text_LevelShow_Text";
        a.BottomTextParameter = [n.GetLevel()];
        a.Level = n.GetResonanceLevel();
        a.RoleHeadInfo = {
          RoleConfigId: n.GetRoleId()
        };
        break;
      case 3:
        var _;
        var d = this.rdi.GetItemDataBase().GetUniqueId();
        var n = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(d);
        var h = n.GetCurrentSlotData();
        a.ItemConfigId = n.GetConfigId(true);
        a.QualityId = s;
        a.Level = n.GetCost();
        a.IsLevelTextUseChangeColor = true;
        a.BottomText = "+" + n.GetPhantomLevel().toString();
        a.IsOmitBottomText = true;
        if (h.length > 0) {
          var c = h[0]?.SlotState ?? 0;
          var C = h[1]?.SlotState ?? 0;
          var I = h[2]?.SlotState ?? 0;
          switch (s) {
            case 3:
              a.VisionSlotStateList = [c];
              break;
            case 4:
              a.VisionSlotStateList = [c, C];
              break;
            case 5:
              a.VisionSlotStateList = [c, C, I];
          }
        }
        if (ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(d)) {
          h = n.GetUniqueId();
          d = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(h);
          _ = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(h);
          a.VisionRoleHeadInfo = {
            RoleConfigId: d,
            VisionUniqueId: h
          };
          a.IsMainVisionVisible = _;
        }
        a.VisionFetterGroupId = n.GetFetterGroupId();
        break;
      default:
        a.BottomText = e.GetCount().toString();
    }
    this.Apply(a);
    this.SetCheckTickPerformance(r.IsSelectOn, RED_TICK_HEX, RED_TICK_ALPHA, TICK_COLOR_HEX);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  GetRemainingCoolDownTime() {
    var e = this.rdi.GetConfigId();
    return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
  }
  GetTotalCoolDownTime() {
    var e = this.rdi.GetConfigId();
    return ModelManager_1.ModelManager.BuffItemModel.GetBuffItemTotalCdTime(e);
  }
  RefreshCoolDown() {
    var e = this.GetRemainingCoolDownTime();
    var t = this.GetTotalCoolDownTime();
    this.SetCoolDown(e, t);
  }
  BindOnItemButtonClickedCallback(e) {
    this.ndi = e;
  }
  OnExtendToggleStateChanged(e) {
    if (this.ndi) {
      this.ndi(this.rdi);
    }
  }
}
exports.InventoryMediumItemGrid = InventoryMediumItemGrid;
//# sourceMappingURL=InventoryMediumItemGrid.js.map