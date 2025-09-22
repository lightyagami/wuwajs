"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitDungeonItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevPhantomVisionSuitDungeonDisplayItem_1 = require("./RoleDevPhantomVisionSuitDungeonDisplayItem");
class RoleDevPhantomVisionSuitDungeonItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.nhd = undefined;
    this.Pe = undefined;
    this.DLu = undefined;
    this.p5t = () => {
      if (this.Pe && this.Pe.DungeonId > 0) {
        this.Nad(this.Pe.DungeonId);
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 19);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.P1d();
    await this.uCd();
  }
  P1d() {
    this.nhd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => new RoleDevPhantomVisionSuitDungeonDisplayItem_1.RoleDevPhantomVisionSuitDungeonDisplayItem());
  }
  async uCd() {
    this.DLu = new ButtonItem_1.ButtonItem();
    await this.DLu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  Refresh(e) {
    this.Pe = e;
    this.DLu.SetFunction(this.p5t);
    this.DLu.SetLocalTextNew(this.Pe.ButtonName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    this.shd(e);
  }
  shd(e) {
    if (this.nhd && e.RewardDataList) {
      this.nhd.RefreshByData(e.RewardDataList);
    }
  }
  Nad(e) {
    var t;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
    } else if ((t = ModelManager_1.ModelManager.AdventureGuideModel?.GetSilentAreaDetectData(e)) && ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(t.Conf.MarkId)) {
      ModelManager_1.ModelManager.AdventureGuideModel?.SetFromManualDetect(true);
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, t.Conf.LevelPlayList, e);
    }
  }
}
exports.RoleDevPhantomVisionSuitDungeonItem = RoleDevPhantomVisionSuitDungeonItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitDungeonItem.js.map