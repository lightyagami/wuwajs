"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapHelpView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleEnvironmentBuffItem_1 = require("../Component/RogueBattleEnvironmentBuffItem");
class RogueBattleMapHelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.iO1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.iO1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), () => new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithTexture());
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig();
    var i = t.MainHelpImageDesc.length;
    var r = [];
    for (let e = 0; e < i; e++) {
      var a = {
        Icon: t.MainHelpImageFig[e],
        TextId: t.MainHelpImageDesc[e],
        Param: []
      };
      r.push(a);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.MainHelpRuleDesc);
    await this.iO1.RefreshByDataAsync(r);
  }
}
exports.RogueBattleMapHelpView = RogueBattleMapHelpView;
//# sourceMappingURL=RogueBattleMapHelpView.js.map