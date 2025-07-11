"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponResonanceItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIText], [0, UE.UIText], [1, UE.UIText], [3, UE.UIText], [4, UE.UISprite]];
  }
  UpdateItem(e) {
    var i = e.GetWeaponConfig();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "WeaponResonanceItemLevelText", e.GetResonanceLevel());
    var a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(i.ResonId, e.GetResonanceLevel());
    this.GetText(1).SetUIActive(a !== undefined);
    this.GetText(3).SetUIActive(a !== undefined);
    if (a) {
      this.GetText(3).SetText(ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(a.Name));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetItemConfig().BgDescription);
    var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, e.GetResonanceLevel());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Desc, ...a);
    var t = i.WeaponType;
    for (const n of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList()) {
      if (t === n.Value) {
        this.SetSpriteByPath(n.Icon, this.GetSprite(4), false);
        break;
      }
    }
  }
}
exports.WeaponResonanceItem = WeaponResonanceItem;
//# sourceMappingURL=WeaponResonanceItem.js.map