"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDescribeComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
class RoleDescribeComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.cWt = 0;
    this.SPe = undefined;
    this.$be = undefined;
    this.OpenRolePreview = () => {};
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [3, UE.UITexture], [4, UE.UISprite], [2, UE.UIHorizontalLayout], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.PlayLevelSequenceByName("Start");
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2));
    this.GetTexture(3)?.SetUIActive(true);
    this.GetSprite(5)?.SetUIActive(false);
  }
  Update(e, t = false) {
    this.cWt = e;
    var i;
    var s;
    var r;
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.cWt);
    if (e) {
      this.GetText(0).ShowTextNew(e.Name);
      i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e.ElementId);
      s = this.GetTexture(3);
      r = this.GetSprite(4);
      this.SetTextureByPath(i.Icon, s);
      this.SetSpriteByPath(i.GachaElementBgSpritePath, r, false);
      this.n4e(e.QualityId);
      this.GetItem(1).SetUIActive(t);
    }
  }
  n4e(e) {
    this.$be.RebuildLayout(e);
  }
  GetJumpBtnRoot() {
    return this.GetItem(7);
  }
}
exports.RoleDescribeComponent = RoleDescribeComponent;
//# sourceMappingURL=RoleDescribeComponent.js.map