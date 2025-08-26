"use strict";

var CharacterSkinDamageComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var a = arguments.length;
  var h = a < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (n = t[r]) {
        h = (a < 3 ? n(h) : a > 3 ? n(e, i, h) : n(e, i)) || h;
      }
    }
  }
  if (a > 3 && h) {
    Object.defineProperty(e, i, h);
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
    this.Zpe = t => {
      this.BCe();
      if (t) {
        this.wNr = Time_1.Time.WorldTimeSeconds;
        this.zjr = 0;
      } else {
        this.wNr = 0;
        this.zjr = Time_1.Time.WorldTimeSeconds;
        this.tWr();
      }
      this.Zjr = 0;
    };
    this.gne = t => {
      if (this.wNr !== 0) {
        t = t.Attacker.GetComponent(3);
        if (t) {
          if (CampUtils_1.CampUtils.GetCampRelationship(t.Actor.Camp, this.Hte.Actor.Camp) !== 2) {
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
    this.q2t = t => {
      if (t === this.Entity.Id && this.zjr !== 0 && Time_1.Time.WorldTimeSeconds - this.zjr > SKIN_DAMAGE_TIME) {
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
    this.Lie = this.Entity.CheckGetComponent(206);
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
    var t = Time_1.Time.WorldTimeSeconds - this.wNr;
    if (t > SKIN_DAMAGE_TIME) {
      if (this.Zjr > SKIN_DAMAGE_LEVEL2_COUNT) {
        this.ApplySkinDamageByType(2, false, "加载2级战损贴图（受击）", ["battleStartDuration", t], ["BeHitCount", this.Zjr]);
      } else if (this.Zjr > SKIN_DAMAGE_LEVEL1_COUNT) {
        this.ApplySkinDamageByType(1, false, "加载1级战损贴图（受击）", ["battleStartDuration", t], ["BeHitCount", this.Zjr]);
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
  rWr(t) {
    t = this.EIe.GetRoleConfig()?.SkinDamage[t];
    let e = undefined;
    return (e = t ? this.Hte.GetReplaceEffect(t) : e) || t;
  }
  ApplySkinDamageByType(t, e, i, ...s) {
    if ((this.SkinDamageType !== t || !!e) && (!!CharacterSkinDamageComponent_1.EnableSkinDamage || !!e) && !(this.SkinDamageType = t, this.CuePath && !e)) {
      if (t = this.rWr(t)) {
        this.ApplySkinDamage(t, e, i, ...s);
      }
    }
  }
  ApplySkinDamage(t, e, i, ...s) {
    if ((CharacterSkinDamageComponent_1.EnableSkinDamage || e) && this.n8 !== t) {
      this.n8 = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, i, ...s);
      }
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroChangeMaterialsTextures, (t, e) => {
        if (this.Entity?.Valid && this.Hte.Actor?.IsValid() && e === this.n8) {
          if (!this.Yjr?.IsValid()) {
            this.oWr();
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 28, "战损贴图生效", ["EntityId", this.Entity.Id], ["path", e]);
          }
          this.Yjr?.ChangeMaterialsWithDataAsset(t);
        }
      });
    }
  }
  ResetCueSkinDamage() {
    if (this.CuePath) {
      this.CuePath = "";
      this.IsCueIgnoreEnableSetting = false;
      if (CharacterSkinDamageComponent_1.EnableSkinDamage) {
        this.ApplySkinDamageByType(this.SkinDamageType, true, "GameplayCueSkinDamage销毁");
      } else {
        this.ApplySkinDamageByType(0, true, "GameplayCueSkinDamage销毁");
      }
    }
  }
  set SkinDamageType(t) {
    this.Lie.RemoveTag(skinDamageTagMap.get(this.tec));
    this.tec = t;
    this.Lie.AddTag(skinDamageTagMap.get(this.tec));
  }
  get SkinDamageType() {
    return this.tec;
  }
};
CharacterSkinDamageComponent.EnableSkinDamage = true;
CharacterSkinDamageComponent = CharacterSkinDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(211)], CharacterSkinDamageComponent);
exports.CharacterSkinDamageComponent = CharacterSkinDamageComponent; //# sourceMappingURL=CharacterSkinDamageComponent.js.map