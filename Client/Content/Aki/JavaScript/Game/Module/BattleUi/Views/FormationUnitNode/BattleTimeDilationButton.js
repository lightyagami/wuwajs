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
    this.s2d = undefined;
    this.a2d = undefined;
    this.h2d = undefined;
    this.mcm = undefined;
    this.UiLevelSequence = undefined;
    this.q6d = 0;
    this.Lod = 0;
    this.mit = 0;
    this.dit = 0;
    this.l2d = false;
    this.$Qd = false;
    this._2d = (t, e) => {
      if (this.GetActive() && e === 0) {
        this.u2d();
      }
    };
    this.jYe = () => {
      this.u2d();
    };
    this.lqt = () => {
      this.cNu();
    };
    this.UPi = () => {
      if (this.o1h()) {
        switch (ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState) {
          case 0:
            this.l2d = false;
            this.s2d?.SetUIActive(false);
            this.PlayShowAnim();
            break;
          case 1:
            this.l2d = false;
            this.s2d?.SetUIActive(false);
            this.PlayLoopAnim();
            this.fZd();
            break;
          case 2:
            this.l2d = true;
            this.s2d?.SetUIActive(true);
            this.dit = ModelManager_1.ModelManager.BattleUiModel.TimeDilationCoolDownStartTime;
            this.mit = ModelManager_1.ModelManager.BattleUiModel.TimeDilationSkillCdTime;
            this.PlayCloseAnim();
        }
        this.G6d();
      }
    };
    this.F6d = (t, e) => {
      if (t === 5) {
        this.N6d(e);
      }
    };
    this.FQe = t => {
      if (t === "FightPhotographView") {
        this.$Qd = true;
        this.UPi();
      }
    };
    this.$Ge = t => {
      if (t === "FightPhotographView") {
        this.$Qd = false;
        this.UPi();
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIText]);
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([5, UE.UIItem]);
      this.ComponentRegisterInfos.push([6, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.GetItem(5);
      this.x8c = new CombineKeyItem_1.CombineKeyItem();
      await this.x8c.CreateByActorAsync(t.GetOwner());
      this.x8c.SetUiActive(false);
      t = this.GetItem(6);
      this.D8c = new CombineKeyItem_1.CombineKeyItem();
      await this.D8c.CreateByActorAsync(t.GetOwner());
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
    this.s2d = this.GetItem(2);
    this.a2d = this.GetSprite(3);
    this.h2d = this.GetText(4);
    this.mcm = this.GetExtendToggle(1);
    this.mcm?.OnPointDownCallBack.Bind(this.jYe);
    this.q6d = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, POST_EFFECT_PATH, "BattleTimeDilationButton_effect", undefined, 3, undefined, this.F6d, undefined, true);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Link大招, this._2d);
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
    this.l2d = false;
  }
  Tick(t) {
    var e;
    var i;
    if (!!this.l2d && !(this.mit <= 0)) {
      i = (e = this.mit - Time_1.Time.WorldTime * TimeUtil_1.TimeUtil.Millisecond + this.dit) / this.mit;
      this.a2d?.SetFillAmount(i);
      this.h2d?.SetText(e.toFixed(1));
    }
  }
  u2d() {
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
  X2d() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 57, "[BattleTimeDilationButton]ClearAction");
    }
    if (this.o1h() && (this.q6d && (EffectSystem_1.EffectSystem.StopEffectById(this.q6d, "[BattleTimeDilationButton]ClearAction", true), this.q6d = 0), this.Lod && (ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.Lod), this.Lod = 0), ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState === 1)) {
      ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationState(2);
    }
  }
  fZd() {
    var t = new LogReportDefine_1.FightPhotoTimeDilationLogEvent();
    var e = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData().GetCurrentLevelData();
    t.inst_id = e.InstanceId;
    t.inst_diff = e.IsDifficulty ? 1 : 0;
    t.trace_id = ModelManager_1.ModelManager.CreatureModel.GetSceneTraceId().toString();
    LogReportController_1.LogReportController.LogReport(t);
  }
  o1h() {
    return !!ModelManager_1.ModelManager.BattleUiModel;
  }
  PlayShowAnim() {
    if (!this.UiLevelSequence.HasSequenceNameInPlaying("Start")) {
      if (this.UiLevelSequence.IsInSequence()) {
        this.UiLevelSequence.StopPrevSequence(false, true);
      }
      this.UiLevelSequence.PlaySequence("Start", false);
    }
  }
  PlayLoopAnim() {
    if (!this.UiLevelSequence.HasSequenceNameInPlaying("Loop")) {
      if (this.UiLevelSequence.IsInSequence()) {
        this.UiLevelSequence.StopPrevSequence(false, true);
      }
      this.UiLevelSequence.PlaySequence("Loop", false);
    }
  }
  PlayCloseAnim() {
    if (!this.UiLevelSequence.HasSequenceNameInPlaying("Close")) {
      if (this.UiLevelSequence.IsInSequence()) {
        this.UiLevelSequence.StopPrevSequence(false, true);
      }
      this.UiLevelSequence.PlaySequence("Close", false);
    }
  }
  cNu() {
    this.x8c?.SetUiActive(Info_1.Info.IsInKeyBoard());
    this.D8c?.SetUiActive(Info_1.Info.IsInGamepad());
  }
  OnBeforeDestroy() {
    this.X2d();
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Link大招, this._2d);
  }
  G6d() {
    this.N6d(this.q6d);
    this.V6d();
  }
  N6d(t) {
    if (EffectSystem_1.EffectSystem.IsValid(t) && this.o1h()) {
      if (this.$Qd) {
        EffectSystem_1.EffectSystem.SetEffectHidden(t, true);
      } else {
        switch (ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState) {
          case 1:
            EffectSystem_1.EffectSystem.ReplayEffect(t, "[BattleTimeDilationButton.ReplayEffect]");
            EffectSystem_1.EffectSystem.SetEffectHidden(t, false);
            break;
          case 0:
          case 2:
            EffectSystem_1.EffectSystem.SetEffectHidden(t, true);
        }
      }
    }
  }
  V6d() {
    if (this.Lod) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.Lod);
    }
    if (this.o1h() && !this.$Qd && ModelManager_1.ModelManager.BattleUiModel.CurrentTimeDilationSkillState === 1) {
      this.Lod = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(SCREEN_EFFECT_PATH);
    }
  }
}
exports.BattleTimeDilationButton = BattleTimeDilationButton;
//# sourceMappingURL=BattleTimeDilationButton.js.map