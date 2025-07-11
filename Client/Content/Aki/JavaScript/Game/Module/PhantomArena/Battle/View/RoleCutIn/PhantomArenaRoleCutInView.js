"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleCutInView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaRoleCutInView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TickTime = 2000;
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  async LoadRoleSkillTexture() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    await this.SetTextureAsync(e.RoleSkillTexture, this.GetTexture(0));
  }
  RefreshSkillName() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var i = e.ActiveSkillId.indexOf(this.Data.SkillId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SkillNameList[i]);
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam;
    this.RefreshSkillName();
    await this.LoadRoleSkillTexture();
  }
  OnBeforeDestroy() {
    this.Data.CloseCallback?.();
  }
  OnTick(e) {
    if (!(this.TickTime < 0) && !(this.TickTime -= e, this.TickTime > 0)) {
      this.CloseMe();
    }
  }
}
exports.PhantomArenaRoleCutInView = PhantomArenaRoleCutInView;
//# sourceMappingURL=PhantomArenaRoleCutInView.js.map