"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsBulletScreenItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
class RacingBetsBulletScreenItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$01 = undefined;
    this.W01 = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture], [3, UE.UISizeControlByOther], [4, UE.UIItem]];
  }
  RefreshUi(e, t) {
    this.$01 = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreen(e);
    this.W01 = t;
    var i;
    var e = this.GetTexture(0);
    var s = this.GetTexture(2);
    var h = this.GetText(1);
    if (this.$01.Type === 1) {
      e.SetUIActive(false);
      s.SetUIActive(true);
      h.SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
      this.SetTextureShowUntilLoaded(this.$01.Icon, s);
    } else {
      if (this.$01.Type === 2) {
        e.SetUIActive(true);
        s.SetUIActive(false);
        h.SetUIActive(true);
        this.GetItem(4).SetUIActive(true);
        i = DangoManager_1.DangoManager.GetDangoData(this.$01.DangoId);
        this.SetTextureShowUntilLoaded(i.DangoConfig.IconSmall, e);
      } else {
        e.SetUIActive(false);
        s.SetUIActive(false);
        h.SetUIActive(true);
        this.GetItem(4).SetUIActive(true);
      }
      h.ShowTextNew(this.$01.Name);
    }
    this.GetUiSizeControlByOther(3).RootUIComp.SetUIActive(t);
  }
  GetBulletScreenItemWidth() {
    let e = 0;
    var t;
    e = this.$01.Type === 1 ? this.GetTexture(2).GetWidth() + 200 : this.$01.Type === 2 ? this.GetText(1).GetTextRenderSize().X + this.GetTexture(0).GetWidth() : this.GetText(1).GetTextRenderSize().X;
    if (this.W01) {
      t = this.GetUiSizeControlByOther(3);
      return e + t.AdditionalWidth / 2;
    } else {
      return e;
    }
  }
  GetBulletScreenItemHeight() {
    let e = this.GetTexture(0).GetHeight();
    var t;
    if (this.$01.Type === 1) {
      e = this.GetTexture(2).GetHeight();
    }
    if (this.W01) {
      t = this.GetUiSizeControlByOther(3);
      return e + t.AdditionalHeight;
    } else {
      return e;
    }
  }
  MoveLeft(e) {
    this.GetRootItem().SetAnchorOffsetX(this.GetRootItem().GetAnchorOffsetX() - e);
  }
}
exports.RacingBetsBulletScreenItem = RacingBetsBulletScreenItem;
//# sourceMappingURL=RacingBetsBulletScreenItem.js.map