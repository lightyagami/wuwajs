"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitPhantomDisplayItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RoleDevPhantomVisionSuitPhantomDisplayItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, o, t) {
    this.SetSelected(o);
    this.Aad(e);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  Aad(o) {
    var t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(1, o.MonsterId) !== undefined;
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o.RoleId);
    var a = e?.GetPhantomData()?.GetDataMap();
    let r = 0;
    if (a) {
      for (var [, n] of a) {
        if (n?.GetConfig().MonsterId === o.MonsterId) {
          r = e?.GetRoleId();
          break;
        }
      }
    }
    a = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(o.MonsterId);
    if (a) {
      let e = undefined;
      if (o.QualityId > 0) {
        i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(o.MonsterId);
        e = i[o.QualityId - 1];
      }
      var i = {
        Data: o,
        Type: 3,
        ItemConfigId: e,
        BottomText: "",
        IsNotFoundVisible: !t,
        MonsterId: a.MonsterInfoId,
        IconHidden: !t
      };
      i.VisionRoleHeadInfo = r;
      this.Apply(i);
    }
  }
  OnExtendToggleClicked() {}
  OnCanExecuteChange() {
    return false;
  }
}
exports.RoleDevPhantomVisionSuitPhantomDisplayItem = RoleDevPhantomVisionSuitPhantomDisplayItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitPhantomDisplayItem.js.map