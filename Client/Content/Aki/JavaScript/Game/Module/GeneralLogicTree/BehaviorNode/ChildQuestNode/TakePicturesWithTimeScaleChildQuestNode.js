"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TakePicturesWithTimeScaleChildQuestNode = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
const POST_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Post_ForTimeStop_White.DA_Fx_Group_Post_ForTimeStop_White";
const SCREEN_EFFECT_PATH = "/Game/Aki/Effect/DataAsset/ScreenDA/SD_Fight/Bigworld/DA_Fx_Screen_ForTimeStop_White.DA_Fx_Screen_ForTimeStop_White";
class TakePicturesWithTimeScaleChildQuestNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments);
    this.TipType = undefined;
    this.PhotographCondition = undefined;
    this.CameraCondition = undefined;
    this.gFd = false;
    this.V5d = false;
    this.azd = false;
    this.$Fd = 0;
    this.dad = 0;
    this.N5d = false;
    this.mBd = ["Bip001Head", "Bip001Spine2", "Bip001LFoot", "Bip001RFoot"];
    this.twd = () => {
      this.SubmitNode();
    };
    this.QFd = (e, t) => {
      if (e === 5) {
        this.j5d();
      }
    };
    this.FQe = e => {
      if (e === "FightPhotographView") {
        this.N5d = true;
        this.WFd();
      }
    };
    this.$Ge = e => {
      if (e === "FightPhotographView") {
        this.N5d = false;
        this.azd = true;
      }
    };
  }
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && (e = e.Condition).Type === IQuest_1.EChildQuest.TakePicturesWithTimeScale && (this.TipType = e.ViewFinderTip, this.PhotographCondition = e.PhotographCondition, e.CameraCondition.Condition.Conditions.length !== 0 && (this.CameraCondition = e.CameraCondition), this.V5d = false, this.$Fd = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, POST_EFFECT_PATH, "TackPictureQuest_effect", undefined, 3, undefined, this.QFd, undefined, true), true);
  }
  AddEventsOnChildQuestStart() {
    super.AddEventsOnChildQuestStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.twd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  RemoveEventsOnChildQuestEnd() {
    super.RemoveEventsOnChildQuestEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyBtFightPhotoTaskFinish, this.twd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnTick(e) {
    if (ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera()) {
      if (this.gFd) {
        this.gFd = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNeedShowFightPhotoFocus, false);
      }
    } else if (this.TipType !== 0) {
      if (this.CheckRoleInCamera() && this.CheckPhotographCondition()) {
        if (!!this.azd || !this.gFd) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNeedShowFightPhotoFocus, true);
          this.CFd(true);
          this.gFd = true;
          this.azd = false;
          if (this.TipType === 2) {
            ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(ModelManager_1.ModelManager.BattleUiModel.TimeDilationSkillRatio);
            this.V5d = true;
            this.WFd();
          }
        }
      } else if ((this.azd || this.gFd) && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNeedShowFightPhotoFocus, false), this.CFd(false), this.gFd = false, this.azd = false, this.TipType === 2)) {
        ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(1);
        AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "none");
        this.V5d = false;
        this.WFd();
      }
    }
  }
  CFd(e) {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(54);
    if (t) {
      if (e) {
        t.ShowHighlightExploreSkill(1029, -1, false, "系统.活动.拍照活动.时停技能高亮");
      } else {
        t.HideHighlightExploreSkill();
      }
    }
  }
  GetTargetRoleId() {
    if (this.PhotographCondition) {
      return this.PhotographCondition.Target.RoleId;
    }
  }
  CheckIsTargetRole() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (!e) {
      return false;
    }
    var e = e.GetComponent(0);
    if (!e) {
      return false;
    }
    let t = e.GetRoleId();
    if (t > RoleDefine_1.ROBOT_DATA_MIN_ID) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t);
      t = e.ParentId;
    }
    return t === this.GetTargetRoleId();
  }
  CheckRoleInCamera() {
    if (this.CheckIsTargetRole()) {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (e) {
        const s = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(e)?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
        if (s) {
          const r = Global_1.Global.CharacterController;
          var t;
          var i = e => {
            var t;
            var e = s.D_GetSocketLocation(new UE.FName(e));
            var i = (0, puerts_1.$ref)(undefined);
            return !!UE.GameplayStatics.D_ProjectWorldToScreen(r, e, i) && (e = (0, puerts_1.$unref)(i), i = (0, puerts_1.$ref)(0), t = (0, puerts_1.$ref)(0), Global_1.Global.CharacterController?.GetViewportSize(i, t), e.X > 0) && e.X < (0, puerts_1.$unref)(i) && e.Y > 0 && e.Y < (0, puerts_1.$unref)(t);
          };
          if (this.PhotographCondition.Target.OnCameraCheckType === 0) {
            e = i("Bip001Head");
            t = i("Bip001Spine2");
            return !!e && !!t && (e = i("Bip001LFoot"), t = i("Bip001RFoot"), e || t);
          }
          for (const o of this.mBd) {
            if (i(o)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  CheckPhotographCondition() {
    return !!this.CheckIsTargetRole() && ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.PhotographCondition?.Target.CommonCondition, undefined);
  }
  CheckCameraCondition() {
    return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.CameraCondition?.Condition, undefined);
  }
  WFd() {
    this.j5d();
    this.XFd();
  }
  j5d() {
    if (EffectSystem_1.EffectSystem.IsValid(this.$Fd)) {
      if (this.V5d && !this.N5d) {
        EffectSystem_1.EffectSystem.ReplayEffect(this.$Fd, "[TackPictureQuest.ReplayEffect]");
        EffectSystem_1.EffectSystem.SetEffectHidden(this.$Fd, false);
      } else {
        EffectSystem_1.EffectSystem.SetEffectHidden(this.$Fd, true);
      }
    }
  }
  XFd() {
    if (this.dad) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.dad);
    }
    if (this.V5d && !this.N5d) {
      this.dad = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(SCREEN_EFFECT_PATH);
    }
  }
  OnEnd(e) {
    if (this.V5d) {
      ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(1);
    }
    this.CFd(false);
    this.V5d = false;
    if (this.$Fd) {
      EffectSystem_1.EffectSystem.StopEffectById(this.$Fd, "[TackPictureQuest]OnEnd", true);
      this.$Fd = 0;
    }
    if (this.dad) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.dad);
      this.dad = 0;
    }
    super.OnEnd(e);
  }
}
exports.TakePicturesWithTimeScaleChildQuestNode = TakePicturesWithTimeScaleChildQuestNode;
//# sourceMappingURL=TakePicturesWithTimeScaleChildQuestNode.js.map