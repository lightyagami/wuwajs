"use strict";

var CharacterSkinDamageComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var a = arguments.length;
  var h = a < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (n = e[r]) {
        h = (a < 3 ? n(h) : a > 3 ? n(t, i, h) : n(t, i)) || h;
      }
    }
  }
  if (a > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSkinDamageComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CampUtils_1 = require("../Blueprint/Utils/CampUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const SKIN_DAMAGE_TIME = 20;
const SKIN_DAMAGE_LEVEL1_COUNT = 7;
const SKIN_DAMAGE_LEVEL2_COUNT = 14;
const newDamageIntensityName = new UE.FName("DamageIntensity");
const newDamageOnName = new UE.FName("NewDamageOn");
const newDamageOffName = new UE.FName("NewDamageOff");
const skinDamageTagMap = new Map([[0, -723474560], [1, -1450058230], [2, 430401293]]);
let CharacterSkinDamageComponent = CharacterSkinDamageComponent_1 = class CharacterSkinDamageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.Yjr = undefined;
    this.tec = 0;
    this.wNr = 0;
    this.zjr = 0;
    this.Zjr = 0;
    this.n8 = "";
    this.eWr = undefined;
    this.CuePath = "";
    this.IsCueIgnoreEnableSetting = false;
    this.Zpe = e => {
      this.BCe();
      if (e) {
        this.wNr = Time_1.Time.WorldTimeSeconds;
        this.zjr = 0;
      } else {
        this.wNr = 0;
        this.zjr = Time_1.Time.WorldTimeSeconds;
        this.tWr();
      }
      this.Zjr = 0;
    };
    this.gne = e => {
      if (this.wNr !== 0) {
        e = e.Attacker.GetComponent(3);
        if (e) {
          if (CampUtils_1.CampUtils.GetCampRelationship(e.Actor.Camp, this.Hte.Actor.Camp) !== 2) {
            return;
          }
        }
        this.Zjr++;
        this.gRu();
      }
    };
    this.UQe = () => {
      if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        this.ApplySkinDamageByType(2, false, "加载2级战损贴图（复活）");
      }
    };
    this.bpr = () => {
      this.ApplySkinDamageByType(0, false, "战损恢复（传送）");
    };
    this.q2t = e => {
      if (e === this.Entity.Id && this.zjr !== 0 && Time_1.Time.WorldTimeSeconds - this.zjr > SKIN_DAMAGE_TIME) {
        this.ApplySkinDamageByType(0, false, "战损恢复（下场）");
      }
    };
    this.Mi_ = () => {
      if (this.CuePath && this.IsCueIgnoreEnableSetting) {
        this.ApplySkinDamage(this.CuePath, true, "战损开关改变, 存在无视开关的Cue战损");
      } else if (CharacterSkinDamageComponent_1.EnableSkinDamage) {
        if (this.CuePath) {
          this.ApplySkinDamage(this.CuePath, false, "战损开关设置为开启, Cue战损重新生效");
        } else {
          this.gRu();
        }
      } else {
        this.ApplySkinDamageByType(0, true, "战损开关设置为关闭");
      }
    };
  }
  OnStart() {
    this.EIe = this.Entity.CheckGetComponent(0);
    this.Hte = this.Entity.CheckGetComponent(3);
    this.Lie = this.Entity.CheckGetComponent(215);
    this.SkinDamageType = 0;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.q2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResetSkinDamageMode, this.Mi_);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.UQe);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.bpr);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.q2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResetSkinDamageMode, this.Mi_);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, this.gne);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.UQe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.bpr);
    this.BCe();
    return true;
  }
  oWr() {
    this.Yjr = this.Hte.Actor.GetComponentByClass(UE.KuroChangeSkeletalMaterialsComponent.StaticClass());
    if (!this.Yjr?.IsValid()) {
      this.Yjr = this.Hte.Actor.AddComponentByClass(UE.KuroChangeSkeletalMaterialsComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, CharacterNameDefines_1.CharacterNameDefines.CHANGE_SKELETAL_MATERIALS_COMP_NAME);
    }
  }
  gRu() {
    var e = Time_1.Time.WorldTimeSeconds - this.wNr;
    if (e > SKIN_DAMAGE_TIME) {
      if (this.Zjr > SKIN_DAMAGE_LEVEL2_COUNT) {
        this.ApplySkinDamageByType(2, false, "加载2级战损贴图（受击）", ["battleStartDuration", e], ["BeHitCount", this.Zjr]);
      } else if (this.Zjr > SKIN_DAMAGE_LEVEL1_COUNT) {
        this.ApplySkinDamageByType(1, false, "加载1级战损贴图（受击）", ["battleStartDuration", e], ["BeHitCount", this.Zjr]);
      }
    }
  }
  BCe() {
    if (this.eWr) {
      TimerSystem_1.TimerSystem.Remove(this.eWr);
      this.eWr = undefined;
    }
  }
  tWr() {
    this.eWr = TimerSystem_1.TimerSystem.Delay(() => {
      this.eWr = undefined;
      if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !== this.Entity.Id) {
        this.ApplySkinDamageByType(0, false, "战损恢复（定时器）");
      }
    }, SKIN_DAMAGE_TIME);
  }
  rWr(e) {
    e = this.EIe.GetRoleConfig()?.SkinDamage[e];
    let t = undefined;
    return (t = e ? this.Hte.GetReplaceEffect(e) : t) || e;
  }
  ApplySkinDamageByType(e, t, i, ...s) {
    if ((this.SkinDamageType !== e || !!t) && (!!CharacterSkinDamageComponent_1.EnableSkinDamage || !!t) && !(this.SkinDamageType = e, this.CuePath && !t)) {
      if (e = this.rWr(e)) {
        this.ApplySkinDamage(e, t, i, ...s);
      }
    }
  }
  ApplySkinDamage(e, t, i, ...s) {
    if ((CharacterSkinDamageComponent_1.EnableSkinDamage || t) && this.n8 !== e) {
      this.n8 = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, i, ...s);
      }
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.KuroChangeMaterialsTextures, (e, t) => {
        if (e && this.Entity?.Valid && this.Hte.Actor?.IsValid() && t === this.n8) {
          if (!this.Yjr?.IsValid()) {
            this.oWr();
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 28, "战损贴图生效", ["EntityId", this.Entity.Id], ["path", t]);
          }
          if (e.ParameterName.op_Equality(newDamageOnName)) {
            this.Hte.Actor.CharRenderingComponent?.SetMaterialPropertyFloatV2(newDamageIntensityName, 1, 1, 2, 17);
          } else if (e.ParameterName.op_Equality(newDamageOffName)) {
            this.Hte.Actor.CharRenderingComponent?.SetMaterialPropertyFloatV2(newDamageIntensityName, 0, 1, 2, 17);
          } else {
            this.Yjr?.ChangeMaterialsWithDataAsset(e);
          }
        }
      });
    }
  }
  ResetCueSkinDamage() {
    var e;
    if (this.CuePath) {
      this.CuePath = "";
      e = this.IsCueIgnoreEnableSetting;
      this.IsCueIgnoreEnableSetting = false;
      if (CharacterSkinDamageComponent_1.EnableSkinDamage) {
        this.ApplySkinDamageByType(this.SkinDamageType, e, "GameplayCueSkinDamage销毁");
      } else {
        this.ApplySkinDamageByType(0, e, "GameplayCueSkinDamage销毁");
      }
    }
  }
  set SkinDamageType(e) {
    this.Lie.RemoveTag(skinDamageTagMap.get(this.tec));
    this.tec = e;
    this.Lie.AddTag(skinDamageTagMap.get(this.tec));
  }
  get SkinDamageType() {
    return this.tec;
  }
};
CharacterSkinDamageComponent.EnableSkinDamage = true;
CharacterSkinDamageComponent = CharacterSkinDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(221)], CharacterSkinDamageComponent);
exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent; //# sourceMappingURL=CharacterSkinDamageComponent.js.map