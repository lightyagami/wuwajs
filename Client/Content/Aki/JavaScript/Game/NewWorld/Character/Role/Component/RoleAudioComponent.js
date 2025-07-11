"use strict";

var RoleAudioComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var n = arguments.length;
  var _ = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    _ = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        _ = (n < 3 ? s(_) : n > 3 ? s(t, i, _) : s(t, i)) || _;
      }
    }
  }
  if (n > 3 && _) {
    Object.defineProperty(t, i, _);
  }
  return _;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAudioComponent = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const StateRef_1 = require("../../../../../Core/Utils/Audio/StateRef");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameAudioController_1 = require("../../../../Module/Audio/GameAudioController");
const VoxelUtils_1 = require("../../../../Utils/VoxelUtils");
const CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const CharacterAudioComponent_1 = require("../../Common/Component/CharacterAudioComponent");
const CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine");
const hookSkillEventMap = new Map([[100020, "play_role_commonskl_gousuo_target_start"], [100021, "play_role_commonskl_gousuo_target_start"], [100022, "play_amb_interact_suiguang_gousuo_target_start"], [100024, "play_role_commonskl_gousuo_target_start"], [210130, "play_role_commonskl_gousuo_target_start"]]);
const footstepVariantMap = new Map([[0, "land"], [1, "run"], [2, "runstop"], [3, "sprint"], [4, "sprintstop"], [5, "walk"], [6, "walkstop"], [7, "turnback"]]);
const foleyVariantMap = new Map([[0, "bodyfall"], [1, "fly"], [2, "run"], [3, "sprint"], [4, "hard"], [5, "hardfast"], [6, "weak"], [7, "weakfast"]]);
const ROLE_GO_DOWN_FINISH_EVENT = "scene_role_switched_behind";
const ROLE_INTERACT_SHR = "play_amb_role_interact_shr";
const ROLE_MOVE = "role_move";
const TICK_INTERVAL = 250;
const LOCATION_TOLERANCE = 32;
const MATERIAL_ID_SHR = 14;
const SPECIAL_JINXI_OPEN_BOX_ROLE_ID = 1304;
const SPECIAL_JINXI_OPEN_BOX_COUNTRY_ID = 1;
let RoleAudioComponent = RoleAudioComponent_1 = class RoleAudioComponent extends CharacterAudioComponent_1.CharacterAudioComponent {
  constructor() {
    super(...arguments);
    this.Ysl = "none";
    this.Config = undefined;
    this.lTu = "chixia";
    this._Tu = "DirtSurface";
    this.uTu = "walk";
    this.cTu = "weak";
    this.dTu = "default";
    this.Xvl = undefined;
    this.mBe = undefined;
    this.$te = undefined;
    this.A$_ = e => {
      if (e === this.CreatureData?.GetPbDataId()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] 更换了皮肤，刷新Config", ["roleId", e]);
        }
        this.lUr();
      }
    };
    this.Hje = () => {
      if (ModelManager_1.ModelManager.AreaModel.AreaInfo.CountryId === SPECIAL_JINXI_OPEN_BOX_COUNTRY_ID) {
        if (this.Xvl.State !== "jinzhou") {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[Game.Role] 今汐切换至今州地区");
          }
          this.Xvl.State = "jinzhou";
        }
      } else if (this.Xvl.State !== "none") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] 今汐切换至非今州地区");
        }
        this.Xvl.State = "none";
      }
    };
    this.PPr = (e, t) => {
      if (this.ActorComp?.Owner) {
        GameAudioController_1.GameAudioController.SetRolePriority(0, this.ActorComp.Owner);
        GameAudioController_1.GameAudioController.RoleChangeController(this.Entity.Id, true);
      }
    };
    this.xPr = (e, t) => {
      if (this.ActorComp?.Owner) {
        GameAudioController_1.GameAudioController.SetRolePriority(1, this.ActorComp.Owner);
        GameAudioController_1.GameAudioController.RoleChangeController(this.Entity.Id, false);
      }
      this.zsl("none");
    };
    this.sk_ = e => {
      if (this.ActorComp?.Owner) {
        this.dTu = e === 1 ? "cloud" : "default";
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] OnInteractionWaterTypeChange", ["EntityId", this.Entity.Id], ["Owner", this.ActorComp?.Owner?.GetName()], ["WaterTypeState", this.dTu]);
        }
        AudioSystem_1.AudioSystem.SetSwitch("role_interact_water", this.dTu, this.ActorComp.Owner);
      }
    };
    this.Hqr = (e, t, i, o, s) => {
      if (this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId && this.mBe) {
        let e = "none";
        switch (i) {
          case 3:
            if (this.mBe.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp && this.mBe.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Captured) {
              e = "fall";
            }
            break;
          case 5:
            if (this.mBe.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Captured) {
              e = "hook";
            }
            break;
          case 6:
            switch (s) {
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
                break;
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
                e = "fly";
                break;
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE:
                e = "slide";
                break;
              case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
                e = "ski";
                break;
              default:
                e = "fall";
            }
        }
        this.zsl(e);
      }
    };
    this.Dca = (i, o, e, s, t) => {
      if (i !== o && !(s.ChangeLife <= 0) && this.$te && o.Id === Global_1.Global.BaseCharacter?.EntityId) {
        var i = this.ActorComp?.Owner;
        var o = this.Config?.LostHealthEventMap;
        var n = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
        var _ = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
        if (i && o && n) {
          var a;
          var r;
          var h = _ / n * 100;
          var m = (_ + s.ChangeLife) / n * 100;
          let e = 100;
          let t = "";
          for ([a, r] of o) {
            if (!(h > a) && !(m < a)) {
              if (e > a) {
                e = a;
                t = r;
              }
            }
          }
          if (t && (AudioSystem_1.AudioSystem.PostEvent(t, i), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 42, "[Game.Role] PostEvent", ["Event", t], ["Owner", i.GetName()], ["Reason", "HealthChanged"]);
          }
        }
      }
    };
    this.ero = (e, t) => {
      var i = this.ActorComp?.Owner;
      var t = hookSkillEventMap.get(t);
      if (i?.IsValid() && t) {
        AudioSystem_1.AudioSystem.PostEvent(t, i);
      }
    };
    this.M9s = () => {
      var e = this.ActorComp?.Owner;
      if (this.Entity.GetComponent(15)?.IsDead()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] PostEvent 角色死亡离场，不发离场事件", ["RoleId", this.ActorComp?.CreatureData.GetPbDataId()]);
        }
      } else if (e?.IsValid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] PostEvent 角色完全离场语音事件", ["RoleId", this.ActorComp?.CreatureData.GetPbDataId()], ["Event", ROLE_GO_DOWN_FINISH_EVENT], ["Owner", e.GetName()]);
        }
        AudioSystem_1.AudioSystem.PostEvent(ROLE_GO_DOWN_FINISH_EVENT, e);
      }
    };
  }
  OnInit() {
    super.OnInit();
    this.lUr();
    this.mBe = this.Entity.CheckGetComponent(175);
    this.$te = this.Entity.CheckGetComponent(173);
    if (this.Config && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleSkinChange, this.A$_), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.Dca), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.M9s), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharPossessed, this.PPr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUnpossessed, this.xPr), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionWaterTypeChange, this.sk_), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr), this.Config.Id === SPECIAL_JINXI_OPEN_BOX_ROLE_ID)) {
      this.Xvl = new StateRef_1.StateRef("patch_jinxi_openbox_state", "none");
      this.Hje();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje);
    }
    return true;
  }
  OnEnd() {
    super.OnEnd();
    if (this.Config && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleSkinChange, this.A$_), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.Dca), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ero), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.M9s), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharPossessed, this.PPr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUnpossessed, this.xPr), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionWaterTypeChange, this.sk_), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr), this.Config.Id === SPECIAL_JINXI_OPEN_BOX_ROLE_ID)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
      this.Xvl = undefined;
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    this.ChangeRoleName(this.Config?.Name ? this.Config.Name : "chixia");
    this.zsl("none");
    return true;
  }
  OnTick(e) {
    if (this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId && Time_1.Time.Now - RoleAudioComponent_1.IYt > TICK_INTERVAL) {
      RoleAudioComponent_1.IYt = Time_1.Time.Now;
      this.xin();
    }
  }
  OnAkComponentCreated() {
    super.OnAkComponentCreated();
    if (this.ActorComp?.Owner) {
      AudioSystem_1.AudioSystem.SetSwitch("role_name", this.lTu, this.ActorComp.Owner);
      AudioSystem_1.AudioSystem.SetSwitch("footstep_texture", this._Tu, this.ActorComp.Owner);
      AudioSystem_1.AudioSystem.SetSwitch("footstep_variant", this.uTu, this.ActorComp.Owner);
      AudioSystem_1.AudioSystem.SetSwitch("foley_variant", this.cTu, this.ActorComp.Owner);
      AudioSystem_1.AudioSystem.SetSwitch("role_interact_water", this.dTu, this.ActorComp.Owner);
    }
  }
  ChangeRoleName(e) {
    if (this.ActorComp?.Owner) {
      this.lTu = e;
      AudioSystem_1.AudioSystem.SetSwitch("role_name", this.lTu, this.ActorComp.Owner);
    }
  }
  ChangeFootstepTexture(e) {
    if (this.ActorComp?.Owner) {
      this._Tu = e;
      AudioSystem_1.AudioSystem.SetSwitch("footstep_texture", this._Tu, this.ActorComp.Owner);
    }
  }
  ChangeFootstepVariant(e) {
    if (this.ActorComp?.Owner) {
      if (footstepVariantMap.has(e)) {
        this.uTu = footstepVariantMap.get(e);
        AudioSystem_1.AudioSystem.SetSwitch("footstep_variant", this.uTu, this.ActorComp.Owner);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[ChangeFootstepVariant] Map里不含指定枚举类型E_FootstepVariant项,需要更新Map", ["Variant", e]);
      }
    }
  }
  ChangeFoleyVariant(e) {
    if (this.ActorComp?.Owner) {
      if (foleyVariantMap.has(e)) {
        this.cTu = foleyVariantMap.get(e);
        AudioSystem_1.AudioSystem.SetSwitch("foley_variant", this.cTu, this.ActorComp.Owner);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[ChangeFoleyVariant] Map里不含指定枚举类型E_FoleyVariant项,需要更新Map", ["Variant", e]);
      }
    }
  }
  lUr() {
    if (this.CreatureData?.Valid && ModelManager_1.ModelManager.RoleModel) {
      var t = this.CreatureData.GetPbDataId();
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
      if (i && i.RoleType === 1) {
        let e = this.CreatureData.GetSkinId();
        e = e || i.SkinId;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Game.Role] LoadConfig", ["pbDataId", t], ["SkinId", e]);
        }
        this.Config = ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(e);
      }
    }
  }
  xin() {
    var e;
    if (!!this.ActorComp?.Valid && !(e = this.ActorComp.ActorLocationProxy).Equals(RoleAudioComponent_1.LHo, LOCATION_TOLERANCE)) {
      RoleAudioComponent_1.LHo.DeepCopy(e);
      GameAudioController_1.GameAudioController.UpdatePlayerLocation(e);
      e = this.ActorComp.ActorLocation;
      if (VoxelUtils_1.VoxelUtils.GetVoxelInfo(Info_1.Info.World, e).MtlID === MATERIAL_ID_SHR) {
        AudioSystem_1.AudioSystem.PostEvent(ROLE_INTERACT_SHR, new UE.TransformDouble(e));
      }
    }
  }
  zsl(e) {
    if (this.Ysl !== e) {
      this.Ysl = e;
      AudioSystem_1.AudioSystem.SetState(ROLE_MOVE, e);
    }
  }
  PostFootstepAudio(e) {
    this.ChangeFootstepTexture(e);
    var e = this.GetAkComponent();
    var t = this.Config?.FootstepEvent;
    if (e && t) {
      AudioSystem_1.AudioSystem.PostEvent(t, e);
    }
  }
};
RoleAudioComponent.IYt = 0;
RoleAudioComponent.LHo = Vector_1.Vector.Create();
RoleAudioComponent = RoleAudioComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(189)], RoleAudioComponent);
exports.RoleAudioComponent = RoleAudioComponent; //# sourceMappingURL=RoleAudioComponent.js.map