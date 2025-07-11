"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRoleDescribeComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout");
class ActivityRoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.SPe = undefined;
    this.$be = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [3, UE.UITexture], [4, UE.UISprite], [2, UE.UIHorizontalLayout], [5, UE.UISprite]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.PlayLevelSequenceByName("Start");
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2));
    this.GetTexture(3)?.SetUIActive(true);
    this.GetSprite(5)?.SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
  }
  Update(e) {
    this.dFe = e;
    var i;
    var t;
    var s;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe);
    if (e) {
      this.GetText(0).ShowTextNew(e.Name);
      i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e.ElementId);
      t = this.GetTexture(3);
      s = this.GetSprite(4);
      this.SetTextureByPath(i.Icon, t);
      this.SetSpriteByPath(i.GachaElementBgSpritePath, s, false);
      this.n4e(e.QualityId);
    }
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
  }
}
exports.ActivityRoleDescribeComponent = ActivityRoleDescribeComponent;
//# sourceMappingURL=ActivityRoleDescribeComponent.js.map