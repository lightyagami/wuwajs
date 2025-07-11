"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFilterDropDownTitle = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TitleItemBase_1 = require("../../Common/DropDown/Item/TitleItemBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleFilterDropDownTitle extends TitleItemBase_1.TitleItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem]];
  }
  ShowTemp(e, t) {
    var i;
    var r;
    if (e.v9n === 0) {
      this.mLu();
    } else if (i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e.v9n)) {
      e = ModelManager_1.ModelManager.RogueBattleModel.IsBondLinkCanActivate(e.v9n);
      r = this.GetTexture(1);
      this.SetTextureShowUntilLoaded(i.Icon, r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Name);
      this.GetItem(2).SetUIActive(e);
    }
  }
  mLu() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_RogueSelectAll");
    this.SetTextureShowUntilLoaded(e, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RogueRes_BondSelect_Desc");
    this.GetItem(2).SetUIActive(false);
  }
}
exports.RogueBattleFilterDropDownTitle = RogueBattleFilterDropDownTitle;
//# sourceMappingURL=RogueBattleFilterDropDownTitle.js.map