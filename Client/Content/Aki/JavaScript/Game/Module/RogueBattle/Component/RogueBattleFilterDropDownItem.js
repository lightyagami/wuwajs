"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFilterDropDownItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const DropDownItemBase_1 = require("../../Common/DropDown/Item/DropDownItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleFilterDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem]];
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    var t;
    var o;
    var r;
    if (e.v9n === 0) {
      this.wLu();
    } else if (t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e.v9n)) {
      o = ModelManager_1.ModelManager.RogueBattleModel.IsBondLinkCanActivate(e.v9n);
      r = this.GetTexture(2);
      this.SetTextureShowUntilLoaded(t.Icon, r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "RogueResSynergyLV", e.F6n);
      this.GetText(3).SetUIActive(true);
      this.GetItem(4).SetUIActive(o);
    }
  }
  wLu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_RogueSelectAll");
    this.SetTextureShowUntilLoaded(e, this.GetTexture(2));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueRes_BondSelect_Desc");
    this.GetText(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
  }
}
exports.RogueBattleFilterDropDownItem = RogueBattleFilterDropDownItem;
//# sourceMappingURL=RogueBattleFilterDropDownItem.js.map