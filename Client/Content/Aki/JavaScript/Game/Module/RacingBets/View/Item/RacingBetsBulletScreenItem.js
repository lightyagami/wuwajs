"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsBulletScreenItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
class RacingBetsBulletScreenItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.S01 = void 0, this.M01 = !1
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UISizeControlByOther],
      [4, UE.UIItem]
    ]
  }
  RefreshUi(e, t) {
    this.S01 = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreen(e), this.M01 = t;
    var i, e = this.GetTexture(0),
      s = this.GetTexture(2),
      h = this.GetText(1);
    1 === this.S01.Type ? (e.SetUIActive(!1), s.SetUIActive(!0), h.SetUIActive(!1), this.GetItem(4).SetUIActive(!1), this.SetTextureShowUntilLoaded(this.S01.Icon, s)) : (2 === this.S01.Type ? (e.SetUIActive(!0), s.SetUIActive(!1), h.SetUIActive(!0), this.GetItem(4).SetUIActive(!0), i = DangoManager_1.DangoManager.GetDangoData(this.S01.DangoId), this.SetTextureShowUntilLoaded(i.DangoConfig.IconSmall, e)) : (e.SetUIActive(!1), s.SetUIActive(!1), h.SetUIActive(!0), this.GetItem(4).SetUIActive(!0)), h.ShowTextNew(this.S01.Name)), this.GetUiSizeControlByOther(3).RootUIComp.SetUIActive(t)
  }
  GetBulletScreenItemWidth() {
    let e = 0;
    var t;
    return e = 1 === this.S01.Type ? this.GetTexture(2).GetWidth() + 200 : 2 === this.S01.Type ? this.GetText(1).GetTextRenderSize().X + this.GetTexture(0).GetWidth() : this.GetText(1).GetTextRenderSize().X, this.M01 ? (t = this.GetUiSizeControlByOther(3), e + t.AdditionalWidth / 2) : e
  }
  GetBulletScreenItemHeight() {
    let e = this.GetTexture(0).GetHeight();
    var t;
    return 1 === this.S01.Type && (e = this.GetTexture(2).GetHeight()), this.M01 ? (t = this.GetUiSizeControlByOther(3), e + t.AdditionalHeight) : e
  }
  MoveLeft(e) {
    this.GetRootItem().SetAnchorOffsetX(this.GetRootItem().GetAnchorOffsetX() - e)
  }
}
exports.RacingBetsBulletScreenItem = RacingBetsBulletScreenItem;
//# sourceMappingURL=RacingBetsBulletScreenItem.js.map