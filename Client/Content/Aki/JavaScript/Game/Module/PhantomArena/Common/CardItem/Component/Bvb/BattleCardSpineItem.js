"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleCardSpineItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BattleCardSpineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CardConfigId = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    await this.RAr(this.CardConfigId);
  }
  async RAr(e) {
    var i;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    var t = e.SpineAtlas;
    var e = e.SpineSkeleton;
    if (!StringUtils_1.StringUtils.IsBlank(t) && !StringUtils_1.StringUtils.IsBlank(e)) {
      i = this.GetSpine(0);
      await this.SetSpineAssetByPath(t, e, i);
      this.PlaySpineAnim("idle", true);
    }
  }
  async RefreshSpineById(e) {
    if (this.CardConfigId !== e) {
      this.CardConfigId = e;
      await this.RAr(e);
    }
  }
  PlaySpineAnim(e, i) {
    var t = this.GetSpine(0);
    if (t.IsValid() && (t = t.SetAnimation(0, e, i), e === "start")) {
      t?.AnimationComplete.Add(() => {
        this.PlaySpineAnim("idle", true);
      });
    }
  }
  SetCardConfigId(e) {
    this.CardConfigId = e;
  }
}
exports.BattleCardSpineItem = BattleCardSpineItem;
//# sourceMappingURL=BattleCardSpineItem.js.map