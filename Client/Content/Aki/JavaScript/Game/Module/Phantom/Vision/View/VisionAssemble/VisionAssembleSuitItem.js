"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleSuitItem = exports.VisionAssembleSuitItemData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const VisionFetterSuitItem_1 = require("../VisionFetterSuitItem");
class VisionAssembleSuitItemData {
  constructor() {
    this.FetterGroupId = 0;
    this.CurrentProgress = 0;
    this.MaxProgress = 0;
  }
  Phrase(t) {
    this.FetterGroupId = t.FetterGroupId;
    this.CurrentProgress = t.ActiveFetterGroupNum;
    this.MaxProgress = t.NeedActiveNum;
  }
}
exports.VisionAssembleSuitItemData = VisionAssembleSuitItemData;
class VisionAssembleSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(0));
    await this.bxt.Init();
    this.bxt.SetActive(true);
  }
  Refresh(t, e, s) {
    var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t.FetterGroupId);
    this.bxt?.Update(i);
    this.GetText(1).SetText(`（${t.CurrentProgress}/${t.MaxProgress}）`);
  }
}
exports.VisionAssembleSuitItem = VisionAssembleSuitItem;
//# sourceMappingURL=VisionAssembleSuitItem.js.map