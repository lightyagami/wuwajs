"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashUnlockItemView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GameModeController_1 = require("../../../World/Controller/GameModeController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CalabashController_1 = require("../CalabashController");
class CalabashUnlockItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.GMt = 0;
    this.NMt = undefined;
    this.OMt = undefined;
    this.kMt = new CustomPromise_1.CustomPromise();
    this.FMt = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 10, "跳转到鸣域终端收集页签", ["目标幻象Id", this.OMt.MonsterId]);
      }
      this.CloseViewOrShowNextData();
      CalabashController_1.CalabashController.JumpToCalabashCollectTabView(this.OMt.MonsterId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[5, this.FMt]];
  }
  async OnBeforeStartAsync() {
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.kMt.SetResult(true);
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
    await this.kMt.Promise;
  }
  OnBeforeCreate() {
    this.NMt = this.OpenParam;
  }
  OnStart() {
    this.GetButton(5).RootUIComp.SetRaycastTarget(!GameModeController_1.GameModeController.IsInInstance());
    this.GetText(6).SetUIActive(!GameModeController_1.GameModeController.IsInInstance());
  }
  OnBeforeShow() {
    this.Og();
  }
  Refresh() {
    this.NMt = ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift();
    this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(this.NMt[0]);
    this.OMt = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(e.MonsterId);
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(this.OMt.MonsterInfoId);
    this.GMt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd;
    this.GetText(3).ShowTextNew(e.Name);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.NMt[0]);
    this.SetTextureByPath(e.IconMiddle, this.GetTexture(1), this.Info?.Name);
    this.VMt();
    this.Pqe();
  }
  VMt() {
    var e = this.NMt[2];
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(e).UnlockVisionQuality;
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  Pqe() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.NMt[0]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.GetPhantomSkillInfoByLevel().SimplyDescription);
  }
  CloseViewOrShowNextData() {
    if (ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 10, "刷新下个声骸数据");
      }
      this.Refresh();
    } else {
      this.CloseMe();
    }
  }
  OnTick(e) {
    if (!(this.GMt <= 0)) {
      this.GMt -= e;
      if (this.GMt <= 0) {
        this.CloseViewOrShowNextData();
      }
    }
  }
}
exports.CalabashUnlockItemView = CalabashUnlockItemView;
//# sourceMappingURL=CalabashUnlockItemView.js.map