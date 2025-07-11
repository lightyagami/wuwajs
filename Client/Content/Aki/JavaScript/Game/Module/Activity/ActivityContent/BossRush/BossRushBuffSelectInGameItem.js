"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushBuffSelectInGameItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BossRushBuffSelectInGameItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ClickCallBack = undefined;
    this.Vao = e => {
      this.ClickCallBack?.(e === 1 ? this : undefined);
    };
  }
  SetClickCallBack(e) {
    this.ClickCallBack = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[5, this.Vao]];
  }
  OnStart() {
    this.GetHorizontalLayout(3).RootUIComp.SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetSprite(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
  }
  RefreshItem(e) {
    var e = ConfigManager_1.ConfigManager.BossRushConfig?.GetBossRushBuffConfigById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    var t = [];
    for (const s of e.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      if (i && i.length > 1) {
        t.push(...i[1].split(","));
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Description, ...t);
    this.SetTextureByPath(e.Texture, this.GetTexture(1));
  }
  SetToggleUnCheck() {
    this.GetExtendToggle(5).SetToggleState(0);
  }
}
exports.BossRushBuffSelectInGameItem = BossRushBuffSelectInGameItem;
//# sourceMappingURL=BossRushBuffSelectInGameItem.js.map