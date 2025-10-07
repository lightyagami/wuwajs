"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleTimeDilationButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const LogReportController_1 = require("../../../LogReport/LogReportController");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
const FormationExtraButton_1 = require("./FormationExtraButton");
const POST_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Post_ForTimeStop_White.DA_Fx_Group_Post_ForTimeStop_White";
const SCREEN_EFFECT_PATH = "/Game/Aki/Effect/DataAsset/ScreenDA/SD_Fight/Bigworld/DA_Fx_Screen_ForTimeStop_White.DA_Fx_Screen_ForTimeStop_White";
class BattleTimeDilationButton extends FormationExtraButton_1.FormationExtraButton {
  constructor() {
    super(...arguments);
    this.x8c = undefined;
    this.D8c = undefined;
    this.nxd = undefined;
    this.sxd = undefined;
    this.axd = undefined;
    this.UiLevelSequence = undefined;
    this.$Fd = 0;
    this.dad = 0;
    this.mit = 0;
    this.dit = 0;
    this.hxd = false;
    this.N5d = false;
    this.lxd = (e, t) => {
      if (this.GetActive() && t === 0) {
        this._xd();
      }
    };
    this.lqt = () => {
      this.cNu();
    };
    this.UPi = () => {
      if (this.o1h()) {
        switch (ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState) {
          case 0:
            this.hxd = false;
            this.nxd?.SetUIActive(false);
            this.PlayShowAnim();
            break;
          case 1:
            this.hxd = false;
            this.nxd?.SetUIActive(false);
            this.PlayLoopAnim();
            this.I9d();
            break;
          case 2:
            this.hxd = true;
            this.nxd?.SetUIActive(true);
            this.dit = ModelManager_1.ModelManager.BattleUiModel.TimeDilationCoolDownStartTime;
            this.mit = ModelManager_1.ModelManager.BattleUiModel.TimeDilationSkillCdTime;
            this.PlayCloseAnim();
        }
        this.WFd();
      }
    };
    this.QFd = (e, t) => {
      if (e === 5) {
        this.KFd(t);
      }
    };
    this.FQe = e => {
      if (e === "FightPhotographView") {
        this.N5d = true;
        this.UPi();
      }
    };
    this.$Ge = e => {
      if (e === "FightPhotographView") {
        this.N5d = false;
        this.UPi();
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIText]);
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([5, UE.UIItem]);
      this.ComponentRegisterInfos.push([6, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(5);
      this.x8c = new CombineKeyItem_1.CombineKeyItem();
      await this.x8c.CreateByActorAsync(e.GetOwner());
      this.x8c.SetUiActive(false);
      e = this.GetItem(6);
      this.D8c = new CombineKeyItem_1.CombineKeyItem();
      await this.D8c.CreateByActorAsync(e.GetOwner());
      this.D8c.SetUiActive(false);
    }
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  OnStart() {
    super.OnStart();
    if (!Info_1.Info.IsInTouch()) {
      this.x8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      this.D8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      this.cNu();
    }
    this.nxd = this.GetItem(2);
    this.sxd = this.GetSprite(3);
    this.axd = this.GetText(4);
    this.$Fd = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, POST_EFFECT_PATH, "BattleTimeDilationButton_effect", undefined, 3, undefined, this.QFd, undefined, true);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Link大招, this.lxd);
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiTimeDilationStateChanged, this.UPi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    this.UPi();
  }
  OnHideBattleChildView() {
    super.OnHideBattleChildView();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiTimeDilationStateChanged, this.UPi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    this.hxd = false;
  }
  Tick(e) {
    var t;
    var i;
    if (!!this.hxd && !(this.mit <= 0)) {
      i = (t = this.mit - Time_1.Time.WorldTime * TimeUtil_1.TimeUtil.Millisecond + this.dit) / this.mit;
      this.sxd?.SetFillAmount(i);
      this.axd?.SetText(t.toFixed(1));
    }
  }
  _xd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 57, "[BattleTimeDilationButton]");
    }
    if (this.o1h()) {
      switch (ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState) {
        case 0:
          ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationState(1);
          break;
        case 1:
          ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationState(2);
          break;
        case 2:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhotoFightTimeSlowNotReady");
      }
    }
  }
  Kxd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 57, "[BattleTimeDilationButton]ClearAction");
    }
    if (this.o1h() && (this.$Fd && (EffectSystem_1.EffectSystem.StopEffectById(this.$Fd, "[BattleTimeDilationButton]ClearAction", true), this.$Fd = 0), this.dad && (ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.dad), this.dad = 0), ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState === 1)) {
      ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationState(2);
    }
  }
  I9d() {
    var e = new LogReportDefine_1.FightPhotoTimeDilationLogEvent();
    var t = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData().GetCurrentLevelData();
    e.inst_id = t.InstanceId;
    e.inst_diff = t.IsDifficulty ? 1 : 0;
    e.trace_id = ModelManager_1.ModelManager.CreatureModel.GetSceneTraceId().toString();
    LogReportController_1.LogReportController.LogReport(e);
  }
  o1h() {
    return !!ModelManager_1.ModelManager.BattleUiModel;
  }
  PlayShowAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Start", false);
  }
  PlayLoopAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Loop", false);
  }
  PlayCloseAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Close", false);
  }
  cNu() {
    this.x8c?.SetUiActive(Info_1.Info.IsInKeyBoard());
    this.D8c?.SetUiActive(Info_1.Info.IsInGamepad());
  }
  OnBeforeDestroy() {
    this.Kxd();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Link大招, this.lxd);
  }
  WFd() {
    this.KFd(this.$Fd);
    this.XFd();
  }
  KFd(e) {
    if (EffectSystem_1.EffectSystem.IsValid(e) && this.o1h()) {
      if (this.N5d) {
        EffectSystem_1.EffectSystem.SetEffectHidden(e, true);
      } else {
        switch (ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState) {
          case 1:
            EffectSystem_1.EffectSystem.ReplayEffect(e, "[BattleTimeDilationButton.ReplayEffect]");
            EffectSystem_1.EffectSystem.SetEffectHidden(e, false);
            break;
          case 0:
          case 2:
            EffectSystem_1.EffectSystem.SetEffectHidden(e, true);
        }
      }
    }
  }
  XFd() {
    if (this.dad) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.dad);
    }
    if (this.o1h() && !this.N5d && ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState === 1) {
      this.dad = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(SCREEN_EFFECT_PATH);
    }
  }
}
exports.BattleTimeDilationButton = BattleTimeDilationButton;
//# sourceMappingURL=BattleTimeDilationButton.js.map