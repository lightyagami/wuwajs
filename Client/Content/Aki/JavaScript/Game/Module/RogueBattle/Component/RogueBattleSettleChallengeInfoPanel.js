"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleChallengeInfoPanel = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleSettleFetterInfoGrid_1 = require("./RogueBattleSettleFetterInfoGrid");
const RogueBattleSettleInfoPanelWithList_1 = require("./RogueBattleSettleInfoPanelWithList");
const RogueBattleSettleInfoRoleGrid_1 = require("./RogueBattleSettleInfoRoleGrid");
class RogueBattleSettleChallengeInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LU1 = undefined;
    this.wU1 = undefined;
    this.IncId = 0;
    this.ResultView = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    let e = "";
    let t = "";
    if (this.ResultView.gM_) {
      if (i = RogueResEndById_1.configRogueResEndById.GetConfig(this.ResultView.ax1)) {
        e = i.WinDesc;
        t = i.Title;
      }
    } else if (i = ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(this.ResultView.r6n)) {
      e = i.LoseDesc;
      t = i.LoseTitle;
    }
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
    var o = TimeUtil_1.TimeUtil.DateFormat4String(Time_1.Time.ServerTimeStamp / CommonDefine_1.MILLIONSECOND_PER_SECOND);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e, i.toString(), o);
    var i = TimeUtil_1.TimeUtil.GetTimeString(this.ResultView.Y2s);
    this.GetText(1).SetText(i);
    this.LU1 = new RogueBattleSettleInfoPanelWithList_1.RogueBattleSettleInfoPanelWithList();
    this.LU1.CreateItem = () => new RogueBattleSettleInfoRoleGrid_1.RogueBattleSettleInfoRoleGrid();
    this.LU1.Data = this.ResultView.fUs;
    this.wU1 = new RogueBattleSettleInfoPanelWithList_1.RogueBattleSettleInfoPanelWithList();
    this.wU1.CreateItem = () => new RogueBattleSettleFetterInfoGrid_1.RogueBattleSettleFetterInfoGrid();
    this.wU1.Data = this.ResultView.ql1.filter(e => e.F6n !== 0);
    await Promise.all([this.LU1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.wU1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
  }
}
exports.RogueBattleSettleChallengeInfoPanel = RogueBattleSettleChallengeInfoPanel;
//# sourceMappingURL=RogueBattleSettleChallengeInfoPanel.js.map