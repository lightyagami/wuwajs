"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitDisplayItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RoleDevPhantomVisionSuitDisplayItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
  }
  OnRefresh(e, o, r) {
    if ((this.fGt = e).RewardData) {
      this.sqe(e.RewardData);
    } else if (e.MonsterData) {
      this.$hd(e.MonsterData);
    }
    this.SetSelected(o);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  sqe(e) {
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.ItemId)) {
      e = {
        Type: 4,
        Data: e,
        BottomText: e.Count === 0 ? "" : e.Count.toString(),
        ItemConfigId: e.ItemId
      };
      this.Apply(e);
    }
  }
  OnExtendToggleClicked() {
    var e = this.fGt?.RewardData;
    if (e) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
    } else if (e = this.fGt?.MonsterData) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.TryJumpToTargetViewByMonsterId(e.MonsterId);
    }
  }
  $hd(o) {
    var r = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, o.MonsterId) !== undefined;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o.RoleId);
    var t = e?.GetPhantomData()?.GetDataMap();
    let a = 0;
    if (t) {
      for (var [, i] of t) {
        if (i?.GetConfig().MonsterId === o.MonsterId) {
          a = e?.GetRoleId();
          break;
        }
      }
    }
    t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(o.MonsterId);
    if (t) {
      let e = undefined;
      if (o.QualityId > 0) {
        l = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(o.MonsterId);
        e = l[o.QualityId - 1];
      }
      var l = {
        Data: o,
        Type: 3,
        ItemConfigId: e,
        BottomText: "",
        IsNotFoundVisible: !r,
        MonsterId: t.MonsterInfoId,
        IconHidden: !r
      };
      l.VisionRoleHeadInfo = a;
      this.Apply(l);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
}
exports.RoleDevPhantomVisionSuitDisplayItem = RoleDevPhantomVisionSuitDisplayItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitDisplayItem.js.map