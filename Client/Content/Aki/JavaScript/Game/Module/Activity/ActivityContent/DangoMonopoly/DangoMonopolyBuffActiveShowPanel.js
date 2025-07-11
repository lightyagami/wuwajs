"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyBuffActiveShowPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyBuffActiveShowPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GridData = undefined;
  }
  async Init(e, n) {
    this.GridData = n;
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.GetText(1)?.SetUIActive(false);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  UpdateData() {
    var e = this.GridData.GetDangoData()?.NameKey ?? "DangoName";
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    var n = DangoMonopolyDefine_1.dangoMonopolyTextKey.DangoMonopolyMeetDango;
    var n = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, e);
    this.GetText(0)?.SetText(n);
    var e = this.GetSprite(2);
    this.SetSpriteByPath(this.GetSpriteTitlePath(), e, true);
  }
  GetSpriteTitlePath(e = true) {
    e = e ? "SP_TuanziGetTxt" : "SP_TuanziUnlockTxt";
    return ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(e) ?? "";
  }
}
exports.DangoMonopolyBuffActiveShowPanel = DangoMonopolyBuffActiveShowPanel;
//# sourceMappingURL=DangoMonopolyBuffActiveShowPanel.js.map