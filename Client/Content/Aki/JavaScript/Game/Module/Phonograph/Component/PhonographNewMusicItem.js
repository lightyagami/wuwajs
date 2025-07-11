"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographNewMusicItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhonographNewMusicItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  Refresh(e, r, i) {
    e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
    }
  }
}
exports.PhonographNewMusicItem = PhonographNewMusicItem;
//# sourceMappingURL=PhonographNewMusicItem.js.map