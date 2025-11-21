"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreDetailLockItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreDetailLockItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FSd = 0;
    this.Pkc = () => {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(this.FSd);
      if (e?.GameplayLockJumpId) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.GameplayLockJumpId);
      }
    };
  }
  get MarkId() {
    return this.FSd;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.Pkc]];
  }
  RefreshExternalByData(e) {
    this.FSd = e;
    this.RootItem.SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(this.FSd);
    var i = this.GetText(1);
    if (e.GameplayLockText) {
      i?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.GameplayLockText);
    } else {
      i?.SetUIActive(false);
    }
  }
  Reset(e) {
    this.FSd = e ?? 0;
    this.RootItem.SetUIActive(false);
  }
}
exports.ExploreDetailLockItem = ExploreDetailLockItem;
//# sourceMappingURL=ExploreDetailLockItem.js.map