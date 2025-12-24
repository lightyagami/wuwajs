"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreakWeaknessPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleBreakWeaknessComponent_1 = require("../../../../NewWorld/Character/Role/Component/RoleBreakWeaknessComponent");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const HudUnitUtils_1 = require("../../../HudUnit/Utils/HudUnitUtils");
const hitCaseSocket = new UE.FName("HitCase");
const CLOSE_ANIM_TIME = 300;
const childType = 17;
const INTERACTION_SHOW_DELAY = 1000;
class BreakWeaknessPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.jma = new Vector2D_1.Vector2D();
    this.K0f = undefined;
    this.fYf = undefined;
    this.Xte = undefined;
    this.ldt = [];
    this.X0f = undefined;
    this.Qtt = undefined;
    this._at = undefined;
    this.uat = undefined;
    this.cat = undefined;
    this.mat = true;
    this.Y0f = true;
    this.z0f = undefined;
    this.uxn = false;
    this.Mit = undefined;
    this.J0f = 0;
    this.Bit = false;
    this.nZm = false;
    this.J8f = undefined;
    this.IJf = undefined;
    this.s$f = undefined;
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
    this.bMe = (i, t) => {
      if (t === 1) {
        this.Cat();
      }
    };
    this._Cu = () => {
      this.Cat();
    };
    this.gat = () => {
      this.mat = this.cat.GetChildVisible(childType);
      this.Lri();
    };
    this.zpe = () => {
      this.fat();
    };
    this.Sri = (i, t) => {
      if (t) {
        this.yRl(false);
      } else {
        for (const s of this.z0f.DisableTags) {
          if (this.Xte.HasTag(s)) {
            this.yRl(false);
            return;
          }
        }
        this.yRl(true);
      }
    };
    this.Jrt = (i, t) => {
      if (t) {
        this.Y0f = false;
      } else {
        for (const s of this.z0f.HiddenTags) {
          if (this.Xte.HasTag(s)) {
            this.Y0f = false;
            this.Lri();
            return;
          }
        }
        this.Y0f = true;
      }
      this.Lri();
    };
    this.Z0f = false;
    this.Lti = false;
    this.GXe = undefined;
    this.eCf = () => {
      this.GXe = undefined;
      if (this.Z0f !== this.Lti) {
        this.Z0f = this.Lti;
        if (this.Z0f) {
          this.Show();
          if (this._at) {
            TimerSystem_1.TimerSystem.Remove(this._at);
            this._at = undefined;
            this.uat.SetResult();
            this.uat = undefined;
          }
        } else {
          this.Hide();
        }
      }
    };
    this.j3 = undefined;
    this.rxf = false;
    this.q7e = () => {
      var i = this.rxf;
      this.oxf();
      if (i !== this.rxf) {
        this.Lri();
      }
    };
  }
  Init(i) {
    this.Z0f = false;
    this.Lti = false;
    this.cat = ModelManager_1.ModelManager.BattleUiModel.ChildViewData;
    this.mat = this.cat.GetChildVisible(childType);
    this.z0f = ConfigManager_1.ConfigManager.SkillButtonConfig.GetBehaviorCommonButtonConfig(RoleBreakWeaknessComponent_1.BREAK_WEAKNESS_BUTTON_CONFIG_ID);
    this.Initialize(i);
  }
  async Initialize(i) {
    await this.CreateByResourceIdAsync("UiItem_FightSkillDeathBoss", i, true);
    this.Lri();
  }
  OnRegisterComponent() {
    if (Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture]];
      this.BtnBindInfo = [[0, this._Cu]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem]];
    }
  }
  async OnBeforeStartAsync() {
    if (!Info_1.Info.IsInTouch()) {
      await this.fJm();
    }
    this.Ore();
  }
  async fJm() {
    var i = new InputMultiKeyItem_1.InputMultiKeyItem();
    var t = this.GetItem(0).GetOwner();
    await i.CreateByActorAsync(t);
    this.Qtt = i;
    var t = {
      ActionOrAxisName: InputMappingsDefine_1.actionMappings.通用交互
    };
    this.Qtt.RefreshByActionOrAxis(t);
    this.Qtt.SetActive(true);
    return true;
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.X0f = this.GetTexture(1);
    if (this.Xte) {
      this.Sri(0, false);
    }
  }
  OnAfterShow() {
    this.SPe?.StopPlayingSequence();
    this.SPe?.PlayLevelSequenceByName("Start");
    this.uxn = false;
    this.Kbe();
  }
  OnAfterHide() {
    this.J8f = undefined;
    this.IJf = undefined;
  }
  Kbe() {
    var i;
    if (this.X0f && (i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid) {
      i = i.Entity.GetComponent(0).GetRoleConfig()?.WeaponType ?? 1;
      i = this.z0f.SkillIcons[i - 1];
      this.Irt(i);
    }
  }
  Irt(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (this.Mit !== t && (this.J0f !== 0 && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.J0f), this.Bit = true, this.Mit = t, this.J0f = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, i => {
        this.Bit = false;
        if (this.X0f && this.Mit === t) {
          if (i) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "破弱图标加载成功", ["", t]);
            }
            this.X0f.SetTexture(i);
            this.X0f.SetUIActive(true);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "破弱图标加载完成，但是资源为空", ["", t]);
            }
            this.X0f.SetUIActive(false);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱图标加载完成, 但是已过期", ["", t]);
        }
      }, 103), this.Mit = t, this.Bit)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱图标加载中，隐藏图片", ["", t]);
        }
        this.X0f.SetUIActive(false);
      }
    }
  }
  async OnBeforeHideAsync() {
    this.SPe?.StopPlayingSequence();
    if (this.uat) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "重复调用隐藏");
      }
      this.uat.SetResult();
    }
    this.uat = new CustomPromise_1.CustomPromise();
    this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
    if (Info_1.Info.IsInTouch()) {
      if (this.uxn) {
        this.SPe?.PlayLevelSequenceByName("Success");
      } else {
        this.SPe?.PlayLevelSequenceByName("Fail");
      }
    } else if (this.uxn) {
      this.SPe?.PlayLevelSequenceByName("Pre");
    } else {
      this.SPe?.PlayLevelSequenceByName("Close");
    }
    await this.uat.Promise;
  }
  OnBeforeDestroy() {
    if (this.K0f) {
      this.fat();
    }
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    }
    this.X0f = undefined;
    this.J8f = undefined;
    this.kre();
    this.tCf();
    this.a$f(true);
  }
  Ore() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
    }
    this.cat.AddCallback(childType, this.gat);
  }
  kre() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.通用交互, this.bMe);
    }
    this.cat.RemoveCallback(childType, this.gat);
  }
  Cat() {
    var i;
    if (this.K0f?.Valid) {
      this.oxf();
      if (this.rxf) {
        if ((i = this.K0f.Entity.GetComponent(127))?.IsPawnInteractive()) {
          i.InteractPawn();
          this.uxn = true;
        }
      } else {
        this.Lri();
      }
    } else {
      this.fat();
    }
  }
  ShowByEntity(i, t) {
    if (this.K0f?.Id !== i) {
      if (i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i)) {
        this.m$e();
        this.K0f = i;
        this.fYf = this.K0f.Entity.GetComponent(92);
        this._o();
        this.Kbe();
      } else {
        this.fat();
      }
    }
  }
  HideByEntity(i) {
    if (this.K0f?.Id === i) {
      this.fat();
    }
  }
  _o() {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid) {
      this.Xte = i.Entity.GetComponent(215);
      this.Sri(0, false);
      this.Jrt(0, false);
    }
    this.c$e();
    this.oxf();
    this.kot();
    this.Lri();
    this.a$f();
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(true);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, false, true);
  }
  fat() {
    var i;
    this.m$e();
    this.xHe();
    if (this.K0f?.Valid) {
      this.J8f = this.K0f;
      i = this.fYf?.TargetSocket;
      this.IJf = i ? new UE.FName(i) : hitCaseSocket;
    }
    this.K0f = undefined;
    this.fYf = undefined;
    this.Xte = undefined;
    this.rxf = false;
    this.Lri();
    this.h$f();
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(false);
  }
  c$e() {
    if (this.K0f) {
      EventSystem_1.EventSystem.AddWithTarget(this.K0f, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      for (const i of this.z0f.DisableTags) {
        this.iCf(i, this.Sri);
      }
      for (const t of this.z0f.HiddenTags) {
        this.iCf(t, this.Jrt);
      }
    }
  }
  m$e() {
    this.FYe();
    if (this.K0f) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.K0f, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  yRl(i) {
    if (this.RootItem) {
      if (i) {
        this.RootItem.SetAlpha(1);
      } else {
        this.RootItem.SetAlpha(0.5);
      }
    }
  }
  iCf(i, t) {
    var s = this.Xte;
    if (s) {
      s = s.ListenForTagAddOrRemove(i, t);
      this.ldt.push(s);
    }
  }
  FYe() {
    if (this.ldt) {
      for (const i of this.ldt) {
        i.EndTask();
      }
      this.ldt.length = 0;
    }
  }
  Tick(i) {
    if (!Info_1.Info.IsInTouch()) {
      if (this.IsShowOrShowing || this.IsHiding) {
        this.Woi();
        return;
      } else if (this.MVf()) {
        this.Woi();
        if (this.nZm) {
          this.ehr(true);
        }
        return;
      } else {
        return undefined;
      }
    }
  }
  Woi() {
    var i;
    if (this.RootItem && (this.K0f?.Valid || this.J8f?.Valid) && (i = this.Koi()) && (this.nZm = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(i, this.jma), this.nZm)) {
      this.RootItem.SetAnchorOffset(this.jma.ToUeVector2D(true));
    }
  }
  Koi() {
    var i = this.K0f || this.J8f;
    if (i) {
      var t;
      var i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        t = (t = this.fYf?.TargetSocket) ? new UE.FName(t) : this.IJf ?? hitCaseSocket;
        return i.D_GetSocketLocation(t);
      }
    }
  }
  Lri() {
    if (this.rxf && this.mat && this.Y0f && (Info_1.Info.IsInTouch ? this.nZm = true : this.Woi(), this.nZm)) {
      this.ehr(true);
    } else {
      this.ehr(false);
    }
  }
  ehr(i) {
    this.Lti = i;
    if (this.Lti === this.Z0f) {
      this.tCf();
    } else {
      this.rCf();
    }
  }
  rCf() {
    this.GXe ||= TimerSystem_1.TimerSystem.Next(this.eCf);
  }
  tCf() {
    if (this.GXe) {
      TimerSystem_1.TimerSystem.Remove(this.GXe);
      this.GXe = undefined;
    }
  }
  kot() {
    this.j3 ||= TimerSystem_1.TimerSystem.Forever(this.q7e, 200);
  }
  xHe() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  oxf() {
    var i;
    var t;
    var s;
    if (this.K0f?.Valid && this.fYf && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && (t = t.Entity.GetComponent(1).ActorLocationProxy, s = this.Koi())) {
      if ((i = t.Z - s.Z) < -this.fYf.UpDistance || i > this.fYf.DownDistance) {
        this.rxf = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱Z轴高度超出范围，不显示破弱按钮", ["z", i]);
        }
      } else {
        i = t.X - s.X;
        t = t.Y - s.Y;
        if ((s = this.fYf.HorizontalDistance) * s < (s = i * i + t * t)) {
          this.rxf = false;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "破弱XY距离超出范围，不显示破弱按钮", ["distance", Math.sqrt(s)]);
          }
        } else {
          this.rxf = true;
        }
      }
    } else {
      this.rxf = false;
    }
  }
  MVf() {
    return this.rxf && this.mat && this.Y0f;
  }
  h$f() {
    this.a$f();
    this.s$f = TimerSystem_1.TimerSystem.Delay(() => {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, true, true);
      this.s$f = undefined;
    }, INTERACTION_SHOW_DELAY);
  }
  a$f(i = false) {
    if (this.s$f && (TimerSystem_1.TimerSystem.Remove(this.s$f), this.s$f = undefined, i)) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, true, true);
    }
  }
}
exports.BreakWeaknessPanel = BreakWeaknessPanel;
//# sourceMappingURL=BreakWeaknessPanel.js.map