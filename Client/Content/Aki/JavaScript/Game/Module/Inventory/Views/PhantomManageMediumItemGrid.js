"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageMediumItemGrid = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RED_TICK_HEX = "bf5c5c";
const TICK_COLOR_HEX = "663738";
const RED_TICK_ALPHA = 0.9;
class PhantomManageMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Fzu = () => {
      if (this.Data && PhantomManageMediumItemGrid.CallbackListenerFocus) {
        PhantomManageMediumItemGrid.CallbackListenerFocus(this.Data);
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.GetItemGridExtendToggle().FocusListenerDelegate.Bind(this.Fzu);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.GetItemGridExtendToggle().FocusListenerDelegate.Unbind();
  }
  OnRefresh(e, t, r) {
    this.Data = e;
    this.MRu(e);
  }
  MRu(e) {
    var t = e.GetConfig();
    var r = e.GetUniqueId();
    var t = t.QualityId;
    var i = ModelManager_1.ModelManager.InventoryModel;
    var a = this.Hqu(e);
    var o = this.YGu(e);
    var d = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetConfigId(),
      StarLevel: t,
      IsNewVisible: i.IsNewAttributeItem(r),
      IsLockVisible: e.GetIsLock(),
      IsDeprecate: e.GetIsDeprecated(),
      IsRedDotVisible: i.IsAttributeItemHasRedDot(r),
      IsGreenSelected: a
    };
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r);
    var i = e.GetCurrentSlotData();
    d.Level = e.GetCost();
    d.IsLevelTextUseChangeColor = true;
    d.BottomText = "+" + e.GetPhantomLevel().toString();
    d.IsOmitBottomText = true;
    if (i.length > 0) {
      var n = i[0]?.SlotState ?? 0;
      var s = i[1]?.SlotState ?? 0;
      var m = i[2]?.SlotState ?? 0;
      switch (t) {
        case 3:
          d.VisionSlotStateList = [n];
          break;
        case 4:
          d.VisionSlotStateList = [n, s];
          break;
        case 5:
          d.VisionSlotStateList = [n, s, m];
      }
    }
    if (!a && ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(r)) {
      i = e.GetUniqueId();
      t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(i);
      r = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      d.VisionRoleHeadInfo = {
        RoleConfigId: t,
        VisionUniqueId: i
      };
      d.IsMainVisionVisible = r;
    }
    d.VisionFetterGroupId = e.GetFetterGroupId();
    this.Apply(d);
    this.SetCheckTickPerformance(a, RED_TICK_HEX, RED_TICK_ALPHA, TICK_COLOR_HEX);
    this.SetSelected(o, true);
  }
  RefreshByView(e) {
    this.MRu(e);
  }
  YGu(e) {
    return !!PhantomManageMediumItemGrid.CallbackCheckTips && PhantomManageMediumItemGrid.CallbackCheckTips(e);
  }
  Hqu(e) {
    return !!PhantomManageMediumItemGrid.CallbackCheckSelect && PhantomManageMediumItemGrid.CallbackCheckSelect(e);
  }
  GetKey(e, t) {
    return e.GetUniqueId();
  }
}
(exports.PhantomManageMediumItemGrid = PhantomManageMediumItemGrid).CallbackCheckSelect = undefined;
PhantomManageMediumItemGrid.CallbackCheckTips = undefined;
PhantomManageMediumItemGrid.CallbackListenerFocus = undefined; //# sourceMappingURL=PhantomManageMediumItemGrid.js.map