"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleCutInView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaRoleCutInView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.TickTime = 2e3, this.Data = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText]
    ]
  }
  async LoadRoleSkillTexture() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    await this.SetTextureAsync(e.RoleSkillTexture, this.GetTexture(0))
  }
  RefreshSkillName() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      i = e.ActiveSkillId.indexOf(this.Data.SkillId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SkillNameList[i])
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam, this.RefreshSkillName(), await this.LoadRoleSkillTexture()
  }
  OnBeforeDestroy() {
    this.Data.CloseCallback?.()
  }
  OnTick(e) {
    this.TickTime < 0 || (this.TickTime -= e, 0 < this.TickTime) || this.CloseMe()
  }
}
exports.PhantomArenaRoleCutInView = PhantomArenaRoleCutInView;
//# sourceMappingURL=PhantomArenaRoleCutInView.js.map