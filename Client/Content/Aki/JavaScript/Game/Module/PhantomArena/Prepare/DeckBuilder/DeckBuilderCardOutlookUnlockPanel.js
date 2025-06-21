"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardOutlookUnlockPanel = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardOutlookPreviewItem_1 = require("../../Common/CardItem/Item/CardOutlookPreviewItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController");
class DeckBuilderCardOutlookUnlockPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Pe = void 0, this.eVi = void 0, this.GK1 = void 0, this.$pt = void 0, this.ctu = () => {
      PhantomArenaController_1.PhantomArenaController.CardOutLookUpRequest(this.Pe.CardId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.eVi = new CardOutlookPreviewItem_1.CardOutlookPreviewItem, this.GK1 = new ButtonItem_1.ButtonItem, this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem()), await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.GK1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())]), this.GK1.SetFunction(this.ctu)
  }
  Refresh(e) {
    this.Pe = e, this.eVi.Refresh(e.CardId), this.RefreshOutlookUnlockedState()
  }
  RefreshOutlookUnlockedState() {
    var e, t, i, r, o = ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Pe.CardId);
    this.GK1.SetActive(!o), this.GetText(1).SetUIActive(!o), o || (r = (o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Pe.CardId)).UpOutLookConsumeItems[0].ItemId, o = o.UpOutLookConsumeItems[0].Count, i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r), e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10092), t = ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.Pe.CardId), e = e && t, t = o <= i, i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r).IconSmall, r = t ? "PhantomBattle_1012" : "PhantomBattle_1011", LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, i, o), this.GetText(1).SetUIActive(e), r = e ? "Text_RoleLevelUp_Text" : "GenericPrompt_Unlocked_TipsText", this.GK1.SetEnableClick(e && t), this.GK1.SetLocalTextNew(r))
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch")
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start")
  }
}
exports.DeckBuilderCardOutlookUnlockPanel = DeckBuilderCardOutlookUnlockPanel;
//# sourceMappingURL=DeckBuilderCardOutlookUnlockPanel.js.map