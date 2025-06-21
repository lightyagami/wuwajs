"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRoleOverviewItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class PhantomArenaRoleOverviewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.OnRoleOverviewItemClick = void 0, this.aho = void 0, this.SequencePlayer = void 0, this.aFi = () => {
      this.OnRoleOverviewItemClick?.()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.aFi]
    ]
  }
  async OnBeforeStartAsync() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.aho = new CardElementItem_1.CardElementItem, await this.aho.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())
  }
  Refresh(e) {
    var i;
    (this.Data = e).CardRoleId <= 0 ? (this.GetItem(5).SetUIActive(!0), this.GetItem(1).SetUIActive(!1)) : (this.GetItem(5).SetUIActive(!1), this.GetItem(1).SetUIActive(!0), i = (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e.CardRoleId)).RoleConfigId, i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i), this.SetTextureByPath(e.RolePreviewTexture, this.GetTexture(2)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Name), this.aho?.RefreshElement(i.ElementId))
  }
  PlaySelectAnim() {
    this.SequencePlayer?.PlayLevelSequenceByName("In")
  }
}
exports.PhantomArenaRoleOverviewItem = PhantomArenaRoleOverviewItem;
//# sourceMappingURL=PhantomArenaRoleOverviewItem.js.map