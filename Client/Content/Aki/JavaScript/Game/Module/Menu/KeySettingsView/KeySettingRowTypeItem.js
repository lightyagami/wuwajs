"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingRowTypeItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowTypeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(e) {
    var i;
    var t;
    var s;
    if (e.GetRowType() === 1) {
      s = e.KeyTypeIconSpritePath;
      i = this.GetSprite(0);
      t = this.GetText(1);
      if (StringUtils_1.StringUtils.IsEmpty(s)) {
        i.SetUIActive(false);
      } else {
        this.SetSpriteByPath(e.KeyTypeIconSpritePath, i, false);
        i.SetUIActive(true);
      }
      s = e.KeyTypeName;
      if (StringUtils_1.StringUtils.IsEmpty(s)) {
        t.SetUIActive(false);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, s);
        t.SetUIActive(true);
      }
    }
  }
}
exports.KeySettingRowTypeItem = KeySettingRowTypeItem;
//# sourceMappingURL=KeySettingRowTypeItem.js.map