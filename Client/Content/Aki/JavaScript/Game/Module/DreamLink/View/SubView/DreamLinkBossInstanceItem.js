"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkBossInstanceItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DreamLinkController_1 = require("../../DreamLinkController");
class DreamLinkBossInstanceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.InstData = undefined;
    this.ActivityDataBase = undefined;
    this.ToggleFunction = undefined;
    this.Lcl = t => {
      if (t) {
        this.ActivityDataBase.SaveBossInstRedDotState(this.InstData.InstId);
        this.BNe();
        this.ToggleFunction?.(this.InstData, this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Lcl]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.ActivityDataBase = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
  }
  OnBeforeDestroy() {}
  Refresh(t, i, e) {
    this.InstData = t;
    var s = ConfigManager_1.ConfigManager.DreamLinkConfig.GetRogueBossInstanceConfig(t.TypeId);
    if (s.InstTitle) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.InstTitle);
    }
    this.GetText(6).SetText(s.InstNumber);
    if (t.IsUnlock) {
      if (t.Score > 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "DaMaoScore_Normal", t.Score);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "DaMaoScore_Unfinish");
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "DaMaoFushua_Level_Unlock");
    }
    this.GetItem(4).SetUIActive(!t.IsUnlock);
    this.GetItem(8).SetUIActive(!t.IsUnlock);
    this.BNe();
  }
  OnSelected(t) {
    this.Rcl(true);
  }
  OnDeselected(t) {
    this.Rcl(false);
  }
  BNe() {
    var t = this.ActivityDataBase.GetBossInstRedDotState(this.InstData.InstId);
    this.GetItem(5).SetUIActive(t);
    this.GetItem(9).SetUIActive(t);
  }
  Rcl(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, true);
  }
  GetKey(t, i) {
    return this.InstData.InstId;
  }
}
exports.DreamLinkBossInstanceItem = DreamLinkBossInstanceItem;
//# sourceMappingURL=DreamLinkBossInstanceItem.js.map