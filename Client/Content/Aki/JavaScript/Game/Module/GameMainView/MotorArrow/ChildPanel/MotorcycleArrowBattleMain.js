"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowBattleMain = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const MotorcycleControlMobilePanel_1 = require("../../../BattleUi/Views/Motorcycle/MotorcycleControlMobilePanel");
const MotorcycleArrowBattleProgressItem_1 = require("../ChildItem/MotorcycleArrowBattleProgressItem");
const MotorcycleArrowBossHpItem_1 = require("../ChildItem/MotorcycleArrowBossHpItem");
const MotorcycleArrowHpPlayerItem_1 = require("../ChildItem/MotorcycleArrowHpPlayerItem");
const MotorcycleArrowScore_1 = require("../ChildItem/MotorcycleArrowScore");
const SimpleBossStateItem_1 = require("../ChildItem/SimpleBossStateItem");
class MotorcycleArrowBattleMain extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.HpPlayerItem = undefined;
    this.BattleProgressItem = undefined;
    this.ScoreItem = undefined;
    this.BossHpItem = undefined;
    this.BossHpItem2 = undefined;
    this.SaveItem = undefined;
    this.K5g = undefined;
    this.ButtonControlL = undefined;
    this.ButtonControlR = undefined;
    this.ButtonStop = undefined;
    this.jef = undefined;
    this.X5g = 0;
    this.Z4l = () => {
      this.ButtonStop.RootUIComp.SetUIActive(true);
      this.ScoreItem.ShowAsync();
      this.BattleProgressItem.ShowAsync();
      this.HpPlayerItem.ShowAsync();
      this.jef?.ShowBattleVisibleChildView();
    };
    this.WAg = t => {
      if (t.ActionType === 2) {
        this.BossHpItem?.SetActive(false);
        this.BossHpItem2?.SetActive(false);
      } else {
        if (!this.BossHpItem?.GetActive()) {
          this.BossHpItem?.SetActive(true);
          this.BossHpItem2?.SetActive(true);
          this.BossHpItem?.UpdateHeadStateInfo(t, false);
          this.BossHpItem2?.RefreshBossInfo(t);
        }
        this.BossHpItem?.UpdateHeadStateInfo(t);
        this.BossHpItem2?.UpdateHeadStateInfo(t);
      }
    };
    this.tGg = t => {
      this.BossHpItem2?.SetBossName(t);
    };
    this.iGg = () => {
      UiManager_1.UiManager.OpenView("MotorFightPauseView");
    };
    this.Io = () => {
      this.K5g?.Remove();
      this.SaveItem?.SetUIActive(true);
      this.K5g = TimerSystem_1.TimerSystem.Delay(() => {
        this.K5g = undefined;
        this.SaveItem?.SetUIActive(false);
      }, this.X5g);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem]];
    this.BtnBindInfo = [[8, this.iGg]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.HpPlayerItem = new MotorcycleArrowHpPlayerItem_1.MotorcycleArrowHpPlayerItem();
    await this.HpPlayerItem.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.BattleProgressItem = new MotorcycleArrowBattleProgressItem_1.MotorcycleArrowBattleProgressItem();
    await this.BattleProgressItem.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.ScoreItem = new MotorcycleArrowScore_1.MotorcycleArrowScore();
    await this.ScoreItem.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.BossHpItem = new MotorcycleArrowBossHpItem_1.MotorcycleArrowBossHpItem();
    await this.BossHpItem.CreateByResourceIdAsync("UiItem_MotoBossState", this.GetItem(7));
    this.BossHpItem2 = new SimpleBossStateItem_1.SimpleBossStateItem();
    await this.BossHpItem2.CreateByResourceIdAsync("UiItem_BossState_Prefab", this.GetItem(7));
    if (Info_1.Info.IsInTouch()) {
      this.jef = new MotorcycleControlMobilePanel_1.MotorcycleControlMobilePanel();
      await this.jef.CreateByResourceIdAsync("UiItem_MotorcycleControl", this.GetRootItem());
    }
    this.ButtonControlL = this.GetButton(5);
    this.ButtonControlR = this.GetButton(6);
    this.ButtonStop = this.GetButton(8);
    this.ButtonControlL.RootUIComp.SetUIActive(false);
    this.ButtonControlR.RootUIComp.SetUIActive(false);
    this.ButtonStop.RootUIComp.SetUIActive(false);
    this.SaveItem = this.GetItem(3);
    this.SaveItem.SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
    this.X5g = CommonParamById_1.configCommonParamById.GetIntConfig("MotorArrowLevelSaveShowDuration");
    this.OnAddEventListener();
  }
  OnBeforeDestroy() {
    this.OnRemoveEventListener();
    this.SaveItem?.SetUIActive(false);
    this.K5g?.Remove();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowBossHpChange, this.WAg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowBossCreate, this.tGg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowSave, this.Io);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowBossHpChange, this.WAg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowBossCreate, this.tGg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowSave, this.Io);
  }
  OnTickBattleChildViewPanel(t) {
    this.BattleProgressItem?.OnTick(t);
    this.ScoreItem?.OnTick(t);
    this.HpPlayerItem?.OnTick(t);
    this.jef?.Tick(t);
    if (this.BossHpItem?.GetActive()) {
      this.BossHpItem?.OnTick(t);
      this.BossHpItem2?.OnTick(t);
    }
  }
  OnStart() {}
}
exports.MotorcycleArrowBattleMain = MotorcycleArrowBattleMain;
//# sourceMappingURL=MotorcycleArrowBattleMain.js.map