"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingLevelUpTips = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const FishingDefine_1 = require("../FishingDefine");
const TICK_TIME = 2000;
class FishingLevelUpTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ExpData = undefined;
    this.Level = 0;
    this.CurrentExp = 0;
    this.DeltaAddExp = 0;
    this.CurrentMaxExp = 0;
    this.IsTick = true;
    this.AddText = undefined;
    this.SpriteBar = undefined;
  }
  OnRegisterComponent() {
    this.ExpData = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIText], [4, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(FishingDefine_1.TIPS_ICON);
    await this.SetTextureAsync(i, this.GetTexture(4));
  }
  OnStart() {
    this.AddText = this.GetText(1);
    this.SpriteBar = this.GetSprite(2);
    this.Level = this.ExpData.LastLevel;
    this.CurrentExp = this.ExpData.LastExp;
    this.CurrentMaxExp = this.ExpData.GetMaxExpByLevel(this.Level);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.AddText, "Fishing_Experience", this.ExpData.AddExp);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Fishing_Level");
    this.GetText(0).SetText(this.Level.toString());
  }
  OnTick(i) {
    if (this.IsTick) {
      if (this.DeltaAddExp >= this.ExpData.AddExp) {
        this.CloseMe();
        this.IsTick = false;
      } else {
        this.oEt(this.ExpData.AddExp / TICK_TIME * i);
      }
    }
  }
  oEt(i) {
    this.DeltaAddExp += i;
    this.CurrentExp = MathUtils_1.MathUtils.Clamp(this.CurrentExp + i, this.CurrentExp, this.CurrentMaxExp);
    this.SpriteBar.SetFillAmount(this.CurrentExp / this.CurrentMaxExp);
    if (this.CurrentExp >= this.CurrentMaxExp && this.Level < this.ExpData.CurrentLevel) {
      this.Level += 1;
      this.CurrentExp = 0;
      this.CurrentMaxExp = this.ExpData.GetMaxExpByLevel(this.Level);
      this.GetText(0).SetText(this.Level.toString());
    }
  }
}
exports.FishingLevelUpTips = FishingLevelUpTips;
//# sourceMappingURL=FishingLevelUpTips.js.map