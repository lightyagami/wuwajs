"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRoleOverviewItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class PhantomArenaRoleOverviewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnRoleOverviewItemClick = undefined;
    this.aho = undefined;
    this.SequencePlayer = undefined;
    this.aFi = () => {
      this.OnRoleOverviewItemClick?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.aFi]];
  }
  async OnBeforeStartAsync() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.aho = new CardElementItem_1.CardElementItem();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  Refresh(e) {
    var i;
    if ((this.Data = e).CardRoleId <= 0) {
      this.GetItem(5).SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
    } else {
      this.GetItem(5).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      i = (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e.CardRoleId)).RoleConfigId;
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
      this.SetTextureByPath(e.RolePreviewTexture, this.GetTexture(2));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Name);
      this.aho?.RefreshElement(i.ElementId);
    }
  }
  PlaySelectAnim() {
    this.SequencePlayer?.PlayLevelSequenceByName("In");
  }
}
exports.PhantomArenaRoleOverviewItem = PhantomArenaRoleOverviewItem;
//# sourceMappingURL=PhantomArenaRoleOverviewItem.js.map