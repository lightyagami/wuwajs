"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleSettleChallengeInfoPanel = void 0;
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleSettleFetterInfoGrid_1 = require("./RogueBattleSettleFetterInfoGrid"),
  RogueBattleSettleInfoPanelWithList_1 = require("./RogueBattleSettleInfoPanelWithList"),
  RogueBattleSettleInfoRoleGrid_1 = require("./RogueBattleSettleInfoRoleGrid");
class RogueBattleSettleChallengeInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ZD1 = void 0, this.eU1 = void 0, this.IncId = 0, this.ResultView = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    let e = "",
      t = "";
    this.ResultView.gM_ ? (i = RogueResEndById_1.configRogueResEndById.GetConfig(this.ResultView.DP1)) && (e = i.WinDesc, t = i.Title) : (i = ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(this.ResultView.r6n)) && (e = i.LoseDesc, t = i.LoseTitle);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName(),
      o = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t), TimeUtil_1.TimeUtil.DateFormat4String(Time_1.Time.ServerTimeStamp / CommonDefine_1.MILLIONSECOND_PER_SECOND)),
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e, i.toString(), o), TimeUtil_1.TimeUtil.GetTimeString(this.ResultView.Y2s));
    this.GetText(1).SetText(i), this.ZD1 = new RogueBattleSettleInfoPanelWithList_1.RogueBattleSettleInfoPanelWithList, this.ZD1.CreateItem = () => new RogueBattleSettleInfoRoleGrid_1.RogueBattleSettleInfoRoleGrid, this.ZD1.Data = this.ResultView.fUs, this.eU1 = new RogueBattleSettleInfoPanelWithList_1.RogueBattleSettleInfoPanelWithList, this.eU1.CreateItem = () => new RogueBattleSettleFetterInfoGrid_1.RogueBattleSettleFetterInfoGrid, this.eU1.Data = this.ResultView.e11.filter(e => 0 !== e.F6n), await Promise.all([this.ZD1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.eU1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())])
  }
}
exports.RogueBattleSettleChallengeInfoPanel = RogueBattleSettleChallengeInfoPanel;
//# sourceMappingURL=RogueBattleSettleChallengeInfoPanel.js.map