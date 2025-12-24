"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevPhantomVisionSuitDisplayItem_1 = require("./RoleDevPhantomVisionSuitDisplayItem");
class RoleDevPhantomVisionSuitItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.pnd = undefined;
    this.Pe = undefined;
    this.DLu = undefined;
    this.p5t = () => {
      if (this.Pe) {
        if (this.Pe.DungeonId > 0) {
          this.zsd(this.Pe.DungeonId);
          ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 19);
        } else if (this.Pe.FetterGroupId > 0) {
          ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 18);
          this.Jsd(this.Pe.FetterGroupId, this.Pe.RoleId);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.k1d();
    await this.Dvd();
  }
  k1d() {
    this.pnd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => new RoleDevPhantomVisionSuitDisplayItem_1.RoleDevPhantomVisionSuitDisplayItem());
  }
  async Dvd() {
    this.DLu = new ButtonItem_1.ButtonItem();
    await this.DLu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  Refresh(t) {
    this.Pe = t;
    this.DLu.SetFunction(this.p5t);
    this.DLu.SetLocalTextNew(this.Pe.ButtonName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    if (t.ItemType === 1) {
      this.GetSprite(4).SetUIActive(false);
      this.GetTexture(5).SetUIActive(true);
      this.SetTextureByPath(t.TypeIcon, this.GetTexture(5));
    } else if (t.ItemType === 0) {
      this.GetSprite(4).SetUIActive(true);
      this.GetTexture(5).SetUIActive(false);
    }
    this.vad(t);
  }
  vad(t) {
    var e = [];
    if (t.MonsterDataList) {
      e.push(...t.MonsterDataList.map(t => ({
        MonsterData: t
      })));
    }
    if (t.RewardDataList) {
      e.push(...t.RewardDataList.map(t => ({
        RewardData: t
      })));
    }
    if (this.pnd) {
      this.pnd.RefreshByData(e);
    }
  }
  zsd(t) {
    var e;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
    } else if ((e = ModelManager_1.ModelManager.AdventureGuideModel?.GetSilentAreaDetectData(t)) && ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(e.Conf.MarkId)) {
      ModelManager_1.ModelManager.AdventureGuideModel?.SetFromManualDetect(true);
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, e.Conf.LevelPlayList, t);
    }
  }
  Jsd(t, e) {
    var i = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(e);
    UiManager_1.UiManager.OpenView("PhantomBattleFettersView", [t, e, i]);
  }
}
exports.RoleDevPhantomVisionSuitItem = RoleDevPhantomVisionSuitItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitItem.js.map