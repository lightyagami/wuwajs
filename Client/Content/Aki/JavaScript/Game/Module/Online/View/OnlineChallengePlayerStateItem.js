"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineChallengePlayerStateItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class OnlineChallengePlayerStateItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.j8 = -1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Refresh(e, t, r) {
    this.j8 = e;
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(this.j8);
    if (e) {
      this.GetText(1).SetText(e.Name);
      if (e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e.HeadId, false)) {
        this.SetTextureByPath(e.GetRoleHeadIconCircle(), this.GetTexture(0));
      }
      e = ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(this.j8);
      this.SetTeamPlayerSprite(this.j8, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiPlayerTeam", 5, "获取队友联机时，失败", ["PlayerId", this.j8]);
    }
  }
  SetTeamPlayerSprite(e, t) {
    if (this.j8 === e) {
      switch (t) {
        case 0:
          this.GetItem(2)?.SetUIActive(true);
          this.GetItem(3)?.SetUIActive(false);
          break;
        case 2:
          this.GetItem(2)?.SetUIActive(false);
          this.GetItem(3)?.SetUIActive(true);
          break;
        case 1:
          this.GetItem(2)?.SetUIActive(false);
          this.GetItem(3)?.SetUIActive(false);
      }
    }
  }
}
exports.OnlineChallengePlayerStateItem = OnlineChallengePlayerStateItem;
//# sourceMappingURL=OnlineChallengePlayerStateItem.js.map