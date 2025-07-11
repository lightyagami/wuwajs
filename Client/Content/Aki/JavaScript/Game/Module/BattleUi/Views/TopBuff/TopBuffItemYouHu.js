"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBuffItemYouHu = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TopBuffItem_1 = require("./TopBuffItem");
const tag2IconMap = new Map([[-1776747611, "T_IconYouhuBuff05"], [166342785, "T_IconYouhuBuff01"], [789955629, "T_IconYouhuBuff04"], [-2102795492, "T_IconYouhuBuff02"]]);
class TopBuffItemYouHu extends TopBuffItem_1.TopBuffItem {
  constructor() {
    super(...arguments);
    this.Qor = 0;
    this.Cdt = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  RefreshByTag(e) {
    if (this.Qor !== e && (this.Qor = e, e = tag2IconMap.get(e))) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetIcon(e);
    }
  }
  SetIcon(e) {
    this.GetTexture(0).SetUIActive(false);
    if (e) {
      this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
        var s;
        this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
        if (e && (s = this.GetTexture(0))) {
          s.SetUIActive(true);
          s.SetTexture(e);
        }
      }, 103);
    }
  }
  OnBeforeDestroyImplement() {
    super.OnBeforeDestroyImplement();
    if (this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt);
      this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
}
exports.TopBuffItemYouHu = TopBuffItemYouHu;
//# sourceMappingURL=TopBuffItemYouHu.js.map