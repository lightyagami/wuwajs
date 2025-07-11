"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardOutlookUnlockPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardOutlookPreviewItem_1 = require("../../Common/CardItem/Item/CardOutlookPreviewItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
class DeckBuilderCardOutlookUnlockPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.eVi = undefined;
    this.xX1 = undefined;
    this.$pt = undefined;
    this.aiu = () => {
      PhantomArenaController_1.PhantomArenaController.CardOutLookUpRequest(this.Pe.CardId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.eVi = new CardOutlookPreviewItem_1.CardOutlookPreviewItem();
    this.xX1 = new ButtonItem_1.ButtonItem();
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    await Promise.all([this.eVi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.xX1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())]);
    this.xX1.SetFunction(this.aiu);
  }
  Refresh(e) {
    this.Pe = e;
    this.eVi.Refresh(e.CardId);
    this.RefreshOutlookUnlockedState();
  }
  RefreshOutlookUnlockedState() {
    var e;
    var t;
    var i;
    var r;
    var o = ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(this.Pe.CardId);
    this.xX1.SetActive(!o);
    this.GetText(1).SetUIActive(!o);
    if (!o) {
      r = (o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.Pe.CardId)).UpOutLookConsumeItems[0].ItemId;
      o = o.UpOutLookConsumeItems[0].Count;
      i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r);
      e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10092);
      t = ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(this.Pe.CardId);
      e = e && t;
      t = o <= i;
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r).IconSmall;
      r = t ? "PhantomBattle_1012" : "PhantomBattle_1011";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r, i, o);
      this.GetText(1).SetUIActive(e);
      r = e ? "PhantomBattle_1131" : "GenericPrompt_Unlocked_TipsText";
      this.xX1.SetEnableClick(e && t);
      this.xX1.SetLocalTextNew(r);
    }
  }
  PlaySwitchSequence() {
    this.$pt.PlayOrReplaySequenceByName("Switch");
  }
  PlayShowSequence() {
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
}
exports.DeckBuilderCardOutlookUnlockPanel = DeckBuilderCardOutlookUnlockPanel;
//# sourceMappingURL=DeckBuilderCardOutlookUnlockPanel.js.map