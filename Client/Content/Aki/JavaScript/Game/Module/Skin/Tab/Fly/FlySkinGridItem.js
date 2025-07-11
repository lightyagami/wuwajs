"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinGridItem = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class FlySkinGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnSelected(e) {
    this.SetSelected(true, true);
    var r = this.Data;
    if (r.GetIsNew()) {
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot, r.SkinId);
      this.SetNewFlagVisible(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, r.SkinType);
      ControllerHolder_1.ControllerHolder.FlySkinController.UpdateAllRoleSkinRedDot();
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnRefresh(e, r, t) {
    var o = {
      Type: 4,
      Data: this.Data = e,
      IconPath: e.IsEmptyData ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinIconPath(e.SkinType) : undefined,
      ItemConfigId: e.IsEmptyData ? undefined : e.SkinId,
      IsNewVisible: e.GetIsNew()
    };
    this.Apply(o);
    this.SetSelected(r);
    this.SetLockBlackVisible(e.GetIsLock());
    this.RefreshEquipState();
    this.SetRoleHead(undefined);
  }
  RefreshEquipState() {
    var e = this.Data;
    this.SetSelectVisible(e.IsCurrentEquipSkinId());
  }
}
exports.FlySkinGridItem = FlySkinGridItem;
//# sourceMappingURL=FlySkinGridItem.js.map