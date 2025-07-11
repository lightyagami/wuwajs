"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PunishReportSettlementView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LevelPlayReportController_1 = require("../../../LevelPlayReport/LevelPlayReportController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PunishReportSettlementConditionItem_1 = require("./PunishReportSettlementConditionItem");
const PunishReportSettlementSuccessItem_1 = require("./PunishReportSettlementSuccessItem");
class PunishReportSettlementView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cfl = new PunishReportSettlementSuccessItem_1.PunishReportSettlementSuccessItem();
    this.TGl = [];
    this.SPe = undefined;
    this.LGl = 0;
    this.UGl = () => {
      for (const e of this.TGl) {
        e.PlaySequence().finally(this.yct);
      }
    };
    this.yct = () => {
      this.LGl++;
      if (this.LGl >= this.TGl.length) {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UiManager_1.UiManager.CloseView(this.Info.Name);
        }, 2000);
      }
    };
    this.e8l = e => {
      if (e === "Start01") {
        this.UGl();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    var i = e.States;
    await this.Lfl();
    var t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
    var e = e.TreeConfigId;
    await LevelPlayReportController_1.LevelPlayReportController.RequestLevelPlayVarAsync(t, e);
    var r = ModelManager_1.ModelManager.LevelPlayReportModel.GetLevelPlayReportTarget(t, e);
    var s = [];
    var n = this.GetItem(0);
    n?.SetUIActive(false);
    for (let t = 0; t < r.ConditionTxtIds.length; t++) {
      var a = r.ConditionTxtIds[t];
      var o = r.States[t];
      var l = new PunishReportSettlementConditionItem_1.PunishReportSettlementConditionItem();
      let e = this.GetItem(1);
      if (t !== 0) {
        e = LguiUtil_1.LguiUtil.CopyItem(e, n);
      }
      s.push(l.CreateThenShowByActorAsync(e.GetOwner()));
      var h = i.length > t ? i[t] : 0;
      l.Init(a, o, h);
      this.TGl.push(l);
    }
    await Promise.all(s);
  }
  async Lfl() {
    await this.cfl.CreateByResourceIdAsync("UiView_Challenge_Success_Prefab", this.RootItem);
    await this.cfl.HideAsync();
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.e8l);
  }
  OnAfterShow() {
    this.cfl.ShowTip();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.GetItem(0)?.SetUIActive(true);
      this.SPe?.PlayLevelSequenceByName("Start01");
    }, 1000);
  }
}
exports.PunishReportSettlementView = PunishReportSettlementView;
//# sourceMappingURL=PunishReportSettlementView.js.map