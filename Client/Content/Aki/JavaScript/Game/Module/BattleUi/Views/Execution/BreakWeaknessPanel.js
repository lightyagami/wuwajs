"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreakWeaknessPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
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
class BreakWeaknessPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.jma = new Vector2D_1.Vector2D();
    this.Avf = undefined;
    this.idg = undefined;
    this.Xte = undefined;
    this.ldt = [];
    this.Dvf = undefined;
    this.Qtt = undefined;
    this._at = undefined;
    this.uat = undefined;
    this.cat = undefined;
    this.mat = true;
    this.Uvf = true;
    this.xvf = undefined;
    this.uxn = false;
    this.Mit = undefined;
    this.Bvf = 0;
    this.Bit = false;
    this.Htf = false;
    this.uzf = undefined;
    this.LCg = undefined;
    this.Trg = undefined;
    this.K6g = 0;
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
        for (const s of this.xvf.DisableTags) {
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
        this.Uvf = false;
      } else {
        for (const s of this.xvf.HiddenTags) {
          if (this.Xte.HasTag(s)) {
            this.Uvf = false;
            this.Lri();
            return;
          }
        }
        this.Uvf = true;
      }
      this.Lri();
    };
    this.kvf = false;
    this.Lti = false;
    this.GXe = undefined;
    this.qvf = () => {
      this.GXe = undefined;
      if (this.kvf !== this.Lti) {
        this.kvf = this.Lti;
        if (this.kvf) {
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
    this.$Gf = false;
    this.q7e = () => {
      var i = this.$Gf;
      this.WGf();
      if (i !== this.$Gf) {
        this.Lri();
      }
    };
  }
  Init(i) {
    this.kvf = false;
    this.Lti = false;
    this.cat = ModelManager_1.ModelManager.BattleUiModel.ChildViewData;
    this.mat = this.cat.GetChildVisible(childType);
    this.xvf = ConfigManager_1.ConfigManager.SkillButtonConfig.GetBehaviorCommonButtonConfig(RoleBreakWeaknessComponent_1.BREAK_WEAKNESS_BUTTON_CONFIG_ID);
    this.K6g = CommonParamById_1.configCommonParamById.GetFloatConfig("WeaknessInteractionShowDelay");
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
      await this.ttf();
    }
    this.Ore();
  }
  async ttf() {
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
    this.Dvf = this.GetTexture(1);
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
    this.uzf = undefined;
    this.LCg = undefined;
  }
  Kbe() {
    var i;
    if (this.Dvf && (i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid) {
      i = i.Entity.GetComponent(0).GetRoleConfig()?.WeaponType ?? 1;
      i = this.xvf.SkillIcons[i - 1];
      this.Irt(i);
    }
  }
  Irt(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (this.Mit !== t && (this.Bvf !== 0 && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Bvf), this.Bit = true, this.Mit = t, this.Bvf = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, i => {
        this.Bit = false;
        if (this.Dvf && this.Mit === t) {
          if (i) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "破弱图标加载成功", ["", t]);
            }
            this.Dvf.SetTexture(i);
            this.Dvf.SetUIActive(true);
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 17, "破弱图标加载完成，但是资源为空", ["", t]);
            }
            this.Dvf.SetUIActive(false);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱图标加载完成, 但是已过期", ["", t]);
        }
      }, 103), this.Mit = t, this.Bit)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱图标加载中，隐藏图片", ["", t]);
        }
        this.Dvf.SetUIActive(false);
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
    if (this.Avf) {
      this.fat();
    }
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    }
    this.Dvf = undefined;
    this.uzf = undefined;
    this.kre();
    this.Ovf();
    this.brg(true);
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
    if (this.Avf?.Valid) {
      this.WGf();
      if (this.$Gf) {
        if ((i = this.Avf.Entity.GetComponent(129))?.IsPawnInteractive()) {
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
    if (this.Avf?.Id !== i) {
      if (i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(i)) {
        this.m$e();
        this.Avf = i;
        this.idg = this.Avf.Entity.GetComponent(94);
        this._o();
        this.Kbe();
      } else {
        this.fat();
      }
    }
  }
  HideByEntity(i) {
    if (this.Avf?.Id === i) {
      this.fat();
    }
  }
  _o() {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (i?.Valid) {
      this.Xte = i.Entity.GetComponent(217);
      this.Sri(0, false);
      this.Jrt(0, false);
    }
    this.c$e();
    this.WGf();
    this.kot();
    this.Lri();
    this.brg();
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(true);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, false, true);
  }
  fat() {
    var i;
    this.m$e();
    this.xHe();
    if (this.Avf?.Valid) {
      this.uzf = this.Avf;
      i = this.idg?.TargetSocket;
      this.LCg = i ? new UE.FName(i) : hitCaseSocket;
    }
    this.Avf = undefined;
    this.idg = undefined;
    this.Xte = undefined;
    this.$Gf = false;
    this.Lri();
    this.Rrg();
    ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(false);
  }
  c$e() {
    if (this.Avf) {
      EventSystem_1.EventSystem.AddWithTarget(this.Avf, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      for (const i of this.xvf.DisableTags) {
        this.Gvf(i, this.Sri);
      }
      for (const t of this.xvf.HiddenTags) {
        this.Gvf(t, this.Jrt);
      }
    }
  }
  m$e() {
    this.FYe();
    if (this.Avf) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Avf, EventDefine_1.EEventName.RemoveEntity, this.zpe);
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
  Gvf(i, t) {
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
      } else if (this.cXf()) {
        this.Woi();
        if (this.Htf) {
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
    if (this.RootItem && (this.Avf?.Valid || this.uzf?.Valid) && (i = this.Koi()) && (this.Htf = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(i, this.jma), this.Htf)) {
      this.RootItem.SetAnchorOffset(this.jma.ToUeVector2D(true));
    }
  }
  Koi() {
    var i = this.Avf || this.uzf;
    if (i) {
      var t;
      var i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        t = (t = this.idg?.TargetSocket) ? new UE.FName(t) : this.LCg ?? hitCaseSocket;
        return i.D_GetSocketLocation(t);
      }
    }
  }
  Lri() {
    if (this.$Gf && this.mat && this.Uvf && (Info_1.Info.IsInTouch ? this.Htf = true : this.Woi(), this.Htf)) {
      this.ehr(true);
    } else {
      this.ehr(false);
    }
  }
  ehr(i) {
    this.Lti = i;
    if (this.Lti === this.kvf) {
      this.Ovf();
    } else {
      this.Fvf();
    }
  }
  Fvf() {
    this.GXe ||= TimerSystem_1.TimerSystem.Next(this.qvf);
  }
  Ovf() {
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
  WGf() {
    var i;
    var t;
    var s;
    if (this.Avf?.Valid && this.idg && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && (t = t.Entity.GetComponent(1).ActorLocationProxy, s = this.Koi())) {
      if ((i = t.Z - s.Z) < -this.idg.UpDistance || i > this.idg.DownDistance) {
        this.$Gf = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "破弱Z轴高度超出范围，不显示破弱按钮", ["z", i]);
        }
      } else {
        i = t.X - s.X;
        t = t.Y - s.Y;
        if ((s = this.idg.HorizontalDistance) * s < (s = i * i + t * t)) {
          this.$Gf = false;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "破弱XY距离超出范围，不显示破弱按钮", ["distance", Math.sqrt(s)]);
          }
        } else {
          this.$Gf = true;
        }
      }
    } else {
      this.$Gf = false;
    }
  }
  cXf() {
    return this.$Gf && this.mat && this.Uvf;
  }
  Rrg() {
    this.brg();
    this.Trg = TimerSystem_1.TimerSystem.Delay(() => {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, true, true);
      this.Trg = undefined;
    }, this.K6g);
  }
  brg(i = false) {
    if (this.Trg && (TimerSystem_1.TimerSystem.Remove(this.Trg), this.Trg = undefined, i)) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(7, 19, true, true);
    }
  }
}
exports.BreakWeaknessPanel = BreakWeaknessPanel;
//# sourceMappingURL=BreakWeaknessPanel.js.map