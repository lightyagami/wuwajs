"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleEnvironmentBuffView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleEnvironmentBuffItem_1 = require("../Component/RogueBattleEnvironmentBuffItem");
class RogueBattleEnvironmentBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$T1 = undefined;
    this.WT1 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIVerticalLayout]];
  }
  async OnBeforeStartAsync() {
    this.$T1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), () => new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithTexture());
    this.WT1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), () => new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithSprite());
    await this.RefreshView();
  }
  async RefreshView() {
    var e = this.OpenParam;
    var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(e);
    if (t) {
      var i = [];
      for (let e = 0; e < t.EnvDesc.length; e++) {
        var n = t.EnvDesc[e];
        var r = t.EnvDescParams[e];
        i.push({
          TextId: n,
          Param: r ? r.split("#") : [],
          Icon: t.EnvFig[e] || ""
        });
      }
      var a = [];
      for (let e = 0; e < t.MonsterDesc.length; e++) {
        var o = t.MonsterDesc[e];
        var s = t.MonsterDescParams[e];
        a.push({
          TextId: o,
          Param: s ? s.split("#") : [],
          Icon: t.MonsterFig[e] || ""
        });
      }
      await Promise.all([this.$T1.RefreshByDataAsync(i), this.WT1.RefreshByDataAsync(a)]);
    }
  }
}
exports.RogueBattleEnvironmentBuffView = RogueBattleEnvironmentBuffView;
//# sourceMappingURL=RogueBattleEnvironmentBuffView.js.map