"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleLinkItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleLinkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.OnClickCallBack = undefined;
    this.rV_ = () => {
      this.OnClickCallBack?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rV_]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  LLu() {
    for (const e of ModelManager_1.ModelManager.RogueBattleModel.GetAllOwnedRoleBondData()) {
      if (ModelManager_1.ModelManager.RogueBattleModel.IsBondLinkCanActivate(e.v9n)) {
        return true;
      }
    }
    return false;
  }
  RefreshLinkInfo(e) {
    var t;
    var i;
    var e = ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(e);
    if (e) {
      if ((e = e.On1) === 0) {
        i = (t = this.LLu()) ? "RogueRes_LinkActHint_Desc" : "RogueBattle_TeamEdit_LinkLock";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i);
        i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TeamRoleSkillNone");
        this.SetTextureShowUntilLoaded(i, this.GetTexture(2));
        this.GetItem(3).SetUIActive(t);
        this.GetItem(4).SetUIActive(t);
        if (t) {
          if (this.SPe.GetCurrentSequence() === "Loop") {
            this.SPe.ReplaySequenceByKey("Loop");
          } else {
            this.SPe.StopPlayingSequence(false, true);
            this.SPe.PlayLevelSequenceByName("Loop");
          }
        } else {
          this.SPe?.StopSequenceByKey("Loop", false, true);
        }
      } else {
        i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e);
        this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(2));
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueBattle_TeamEdit_LinkUnlock", ConfigManager_1.ConfigManager.TextConfig.GetMultiText(i.Name));
        this.GetItem(3).SetUIActive(true);
        this.GetItem(4).SetUIActive(true);
        this.SPe?.StopSequenceByKey("Loop", false, true);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueTeamEditViewLinkBtnRefresh, e !== 0);
    }
  }
}
exports.RogueBattleLinkItem = RogueBattleLinkItem;
//# sourceMappingURL=RogueBattleLinkItem.js.map