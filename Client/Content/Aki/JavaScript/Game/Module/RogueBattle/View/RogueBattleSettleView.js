"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ActivityPermanentRogueController_1 = require("../../PermanentRogue/ActivityPermanentRogueController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleSettleChallengeInfoPanel_1 = require("../Component/RogueBattleSettleChallengeInfoPanel");
const RogueBattleSettleDataInfoPanel_1 = require("../Component/RogueBattleSettleDataInfoPanel");
class RogueBattleSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ChallengeInfoPanelComponent = undefined;
    this.DataInfoPanelComponent = undefined;
    this.PageIndex = 0;
    this.LevelSequencePlayer = undefined;
    this.Ko1 = () => {
      this.PageIndex--;
      this.RefreshPanel();
      this.LevelSequencePlayer?.PlayLevelSequenceByName("SwitchL");
    };
    this.Xo1 = () => {
      this.PageIndex++;
      this.RefreshPanel();
      this.LevelSequencePlayer?.PlayLevelSequenceByName("SwitchR");
    };
    this.hJt = () => {
      var e;
      if (this.PageIndex === 0) {
        this.Xo1();
      } else if (ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
        e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
        ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(e);
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [4, UE.UIItem], [3, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UISprite]];
    this.BtnBindInfo = [[0, this.Ko1], [1, this.Xo1], [7, this.hJt], [3, this.hJt]];
  }
  async OnBeforeStartAsync() {
    this.ChallengeInfoPanelComponent = new RogueBattleSettleChallengeInfoPanel_1.RogueBattleSettleChallengeInfoPanel();
    this.ChallengeInfoPanelComponent.ResultView = this.OpenParam;
    this.DataInfoPanelComponent = new RogueBattleSettleDataInfoPanel_1.RogueBattleSettleDataInfoPanel();
    this.DataInfoPanelComponent.ResultView = this.OpenParam;
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    await Promise.all([this.ChallengeInfoPanelComponent.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.DataInfoPanelComponent.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())]);
    this.DataInfoPanelComponent.GetRootItem().SetUIActive(false);
    this.ChallengeInfoPanelComponent.GetRootItem().SetUIActive(true);
    this.RefreshDetail();
    this.RefreshPanel();
  }
  RefreshDetail() {
    var t = this.OpenParam;
    if (t) {
      var i = t.co1;
      var s = t.fUs.length;
      var o = t.ql1.filter(e => e.F6n !== 0).length;
      var r = t.gM_ ? "RogueRes_Settle_Title_Success" : "RogueRes_Settle_Title_Fail";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), r);
      let e = 0;
      for (const n of t.fUs) {
        e += n.mIc.F6n;
      }
      this.GetText(8).SetText(i.toString());
      this.GetText(9).SetText(s.toString());
      this.GetText(10).SetText(e.toString());
      this.GetText(11).SetText(o.toString());
      this.GetItem(12).SetActive(t.Yxs);
      r = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(t.r6n);
      if (r) {
        let e = 0;
        for (var [l, a] of r.RankMap) {
          if (t.SMs < a) {
            e = l - 1;
            break;
          }
          e = l;
        }
        switch (e) {
          case 4:
            AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_s");
            break;
          case 3:
            AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_a");
            break;
          case 2:
            AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_b");
            break;
          case 1:
            AudioSystem_1.AudioSystem.SetState("ui_rogue_settle", "settle_c");
        }
        AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_spl_rogue_accounts");
        i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("RogueRes_Settle_Rank_" + e);
        this.TrySetSpriteByPath(i, this.GetSprite(13), false);
      }
    }
  }
  RefreshPanel() {
    this.ChallengeInfoPanelComponent?.GetRootItem().SetUIActive(this.PageIndex === 0);
    this.DataInfoPanelComponent?.GetRootItem().SetUIActive(this.PageIndex === 1);
    this.GetButton(0).RootUIComp.SetUIActive(this.PageIndex > 0);
    this.GetButton(1).RootUIComp.SetUIActive(this.PageIndex < 1);
  }
}
exports.RogueBattleSettleView = RogueBattleSettleView;
//# sourceMappingURL=RogueBattleSettleView.js.map