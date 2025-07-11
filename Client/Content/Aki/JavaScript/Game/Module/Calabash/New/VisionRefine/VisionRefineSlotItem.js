"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineSlotItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class VisionRefineSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.aho = undefined;
    this.rMt = undefined;
    this.sMt = () => {
      if (this.rMt) {
        this.rMt(true);
      }
    };
    this.aMt = () => {
      if (this.rMt) {
        this.rMt(false);
      }
    };
    this.rMt = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UITexture], [0, UE.UISpriteTransition], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[4, this.sMt], [5, this.aMt]];
  }
  async OnBeforeStartAsync() {
    this.aho = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(6));
    await this.aho.Init();
  }
  OnStart() {
    var i = this.rMt !== undefined;
    this.GetUiSpriteTransition(0).SetEnable(i);
  }
  RefreshEmpty() {
    this.GetItem(1).SetUIActive(true);
    this.GetItem(7).SetUIActive(false);
    this.GetTexture(2).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    this.GetButton(5).RootUIComp.SetUIActive(false);
    this.aho.SetUiActive(false);
  }
  RefreshByData(t, s, e) {
    const h = this.GetTexture(2);
    const i = this.GetSprite(3);
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(t.GetQuality());
    this.SetSpriteByPath(n, i, false, undefined, () => {
      i.SetUIActive(true);
    });
    var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.GetConfigId());
    this.SetTextureByPath(n.IconMiddle, h, undefined, () => {
      h.SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
      this.GetButton(5).RootUIComp.SetUIActive(!s);
      var i = t.GetFetterGroupConfig();
      if (i !== undefined) {
        this.aho.Update(i);
        this.aho.SetUiActive(s);
      }
      this.GetItem(7).SetUIActive(true);
      this.GetText(8).SetText(e.toString());
    });
  }
}
exports.VisionRefineSlotItem = VisionRefineSlotItem;
//# sourceMappingURL=VisionRefineSlotItem.js.map