"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueRoleInfoGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SurvivorsRogueUiDefine_1 = require("../../../SurvivorsRogueUiDefine");
class SurvivorsRogueRoleInfoGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this._bd = () => {
      UiManager_1.UiManager.OpenView("SurvivorsTabMainView", {
        SkipTabType: 0
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this._bd]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SetSelectOn(false);
  }
  Refresh(e, i) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    if (r &&= ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.TrialRoleId)?.GetRoleConfig()) {
      this.SetRoleIcon(r.RoleHeadIconCircle, this.GetTexture(1), e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, i);
      this.GetText(3).SetUIActive(true);
    }
  }
  SetSelectOn(e) {
    this.GetItem(2).SetUIActive(e);
    if (e) {
      this.LevelSequencePlayer.PlayOrReplaySequenceByName("PreArm");
    } else {
      this.LevelSequencePlayer.StopSequenceByKey("PreArm", false, true);
    }
  }
  SetLevelUp() {
    this.LevelSequencePlayer.StopSequenceByKey("PreArm", false, true);
    this.LevelSequencePlayer.PlayOrReplaySequenceByName("LevelUp");
  }
}
exports.SurvivorsRogueRoleInfoGrid = SurvivorsRogueRoleInfoGrid;
//# sourceMappingURL=SurvivorsRogueRoleInfoGrid.js.map