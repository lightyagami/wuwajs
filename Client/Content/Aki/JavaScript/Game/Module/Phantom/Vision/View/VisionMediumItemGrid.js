"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionMediumItemGrid = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.NOe = 0;
    this.Nji = undefined;
    this.Oji = undefined;
    this.kji = undefined;
    this.Fji = undefined;
    this.Vji = () => {
      this.kji?.(this, this.$8i);
    };
    this.Hji = () => {
      this.Fji?.(this, this.$8i);
    };
    this.RFe = () => {
      this.Nji?.(this.$8i, this.NOe);
    };
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.RFe);
    this.BindOnExtendTogglePress(this.Vji);
    this.BindOnExtendToggleRelease(this.Hji);
  }
  SetOnPointDownCallBack(e) {
    this.kji = e;
  }
  SetOnPointUpCallBack(e) {
    this.Fji = e;
  }
  SetClickToggleEvent(e) {
    this.Nji = e;
  }
  OnSelected(e) {
    if (this.GetItemGridExtendToggle().ToggleState !== 1) {
      this.SetSelected(true, false);
    }
    this.SetNewVisible(false);
    this.SetRedDotVisible(ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(this.$8i.GetConfigId()));
    ModelManager_1.ModelManager.InventoryModel.RemoveNewAttributeItem(this.$8i.GetUniqueId());
    ModelManager_1.ModelManager.InventoryModel.SaveNewAttributeItemUniqueIdList();
  }
  OnDeselected(e) {
    if (this.GetItemGridExtendToggle().ToggleState !== 0) {
      this.SetSelected(false, true);
    }
  }
  SetOnRefreshEvent(e) {
    this.Oji = e;
  }
  CheckSelectedState(e) {
    return e === this.$8i;
  }
  OnRefresh(e, t, i) {
    this.$8i = e;
    this.NOe = i;
    var i = ModelManager_1.ModelManager.InventoryModel;
    var s = e.GetUniqueId();
    var o = i.IsNewAttributeItem(s);
    var i = i.GetPhantomItemData(s);
    var r = e.GetCurrentSlotData();
    var h = e.GetQuality();
    var l = !o && ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListHasNew(e.GetConfigId());
    var a = {
      Type: 3,
      Data: e,
      ItemConfigId: e.GetConfigId(true),
      BottomText: "+" + e.GetPhantomLevel().toString(),
      StarLevel: h,
      QualityId: h,
      IsLockVisible: i.GetIsLock(),
      IsDeprecate: i.GetIsDeprecated(),
      IsRedDotVisible: l,
      IsNewVisible: o,
      Level: e.GetCost(),
      IsLevelTextUseChangeColor: true,
      FetterGroupId: e.GetFetterGroupId()
    };
    if (r.length > 0) {
      var d = r[0]?.SlotState ?? 1;
      var n = r[1]?.SlotState ?? 1;
      var M = r[2]?.SlotState ?? 1;
      switch (h) {
        case 3:
          a.VisionSlotStateList = [d];
          break;
        case 4:
          a.VisionSlotStateList = [d, n];
          break;
        case 5:
          a.VisionSlotStateList = [d, n, M];
      }
    }
    if (ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(s)) {
      i = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(s);
      l = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(s);
      a.VisionRoleHeadInfo = {
        RoleConfigId: i,
        VisionUniqueId: s
      };
      a.IsMainVisionVisible = l;
    }
    this.Apply(a);
    if (this.GetItemGridExtendToggle().ToggleState !== 0) {
      this.SetSelected(false, true);
    }
    this.Oji?.(this);
  }
}
exports.VisionMediumItemGrid = VisionMediumItemGrid;
//# sourceMappingURL=VisionMediumItemGrid.js.map