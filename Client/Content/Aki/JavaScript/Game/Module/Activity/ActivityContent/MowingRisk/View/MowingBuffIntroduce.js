"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffIntroduce = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GRAY_ALPHA = 0.3;
class MowingBuffIntroduce extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kqe = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UITexture], [6, UE.UINiagara], [9, UE.UINiagara], [10, UE.UINiagara], [7, UE.UISprite], [8, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetSprite(8)?.SetUIActive(false);
  }
  RefreshByCustomData(i) {
    var t = this.GetText(2);
    t?.SetUIActive(i.LevelTextId !== undefined);
    if (i.LevelTextId) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.LevelTextId, i.LevelTextArgs);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.NameTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TipsTextId, ...i.TipsArgs);
    var s = this.GetTexture(1);
    s?.SetUIActive(i.BackgroundPath !== undefined);
    if (i.BackgroundPath) {
      this.SetTextureByPath(i.BackgroundPath, s);
    }
    var s = this.GetTexture(5);
    s?.SetUIActive(i.IconPath !== undefined);
    if (i.IconPath) {
      this.SetTextureByPath(i.IconPath, s);
    }
    this.o$a(i.HexColor);
    this.GetSprite(7)?.SetUIActive(!i.IsUnlock);
    t?.SetChangeColor(!i.IsUnlock);
    s?.SetIsGray(!i.IsUnlock);
    s?.SetAlpha(i.IsUnlock ? 1 : GRAY_ALPHA);
  }
  o$a(i) {
    this.GetUiNiagara(6)?.SetUIActive(i === "3E9DFFFF");
    this.GetUiNiagara(9)?.SetUIActive(i === "7645A3FF");
    this.GetUiNiagara(10)?.SetUIActive(i === "FFBD47FF");
  }
}
exports.MowingBuffIntroduce = MowingBuffIntroduce;
//# sourceMappingURL=MowingBuffIntroduce.js.map