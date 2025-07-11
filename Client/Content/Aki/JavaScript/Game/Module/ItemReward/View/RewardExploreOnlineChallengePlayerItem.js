"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreOnlineChallengePlayerItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
class RewardExploreOnlineChallengePlayerItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite]];
  }
  OnStart() {
    this.GetTexture(0)?.SetUIActive(false);
  }
  Refresh(i) {
    let r = 0;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(i)) {
      if (e.IsControl()) {
        r = e.GetConfigId;
      }
    }
    if (r) {
      var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r)?.RoleHeadIconBig;
      if (a) {
        const n = this.GetTexture(0);
        if (n) {
          this.SetRoleIcon(a, n, r, undefined, () => {
            n.SetUIActive(true);
          });
          let e = undefined;
          e = i === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ? EditFormationDefine_1.SELF_ONLINE_INDEX : EditFormationDefine_1.OTHER_ONLINE_INDEX;
          a = this.GetSprite(1);
          i = StringUtils_1.StringUtils.Format(e, ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(i)?.PlayerNumber.toString() ?? "1");
          i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
          if (i) {
            a.SetUIActive(true);
            this.SetSpriteByPath(i, a, false);
          } else {
            a.SetUIActive(false);
          }
        } else {
          this.SetUiActive(false);
        }
      } else {
        this.SetUiActive(false);
      }
    } else {
      this.SetUiActive(false);
    }
  }
}
exports.RewardExploreOnlineChallengePlayerItem = RewardExploreOnlineChallengePlayerItem;
//# sourceMappingURL=RewardExploreOnlineChallengePlayerItem.js.map