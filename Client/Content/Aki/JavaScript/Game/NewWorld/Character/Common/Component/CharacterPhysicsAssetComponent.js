"use strict";

var CharacterPhysicsAssetComponent_1;
var __decorate = this && this.__decorate || function (t, e, s, i) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, s) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, s, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, s, h) : o(e, s)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, s, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPhysicsAssetComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ragDoll = new UE.FName("RagDoll");
class PhysicsState {
  constructor() {
    this.Active = false;
    this.QuitCache = false;
  }
  InitBaseState(t) {
    this.Active = t;
    this.QuitCache = false;
  }
  ClearAnimState() {
    this.QuitCache = false;
  }
  SetNewState(t) {
    if (this.Active && !t) {
      this.QuitCache = true;
    }
    this.Active = t;
  }
  StateInherit(t) {
    this.Active = t.Active;
    this.QuitCache = t.QuitCache;
  }
}
class PhysicsAssetLoader {
  constructor() {
    this.BoneNames = new Array();
    this.LoadSuccess = false;
    this.ActorComp = undefined;
  }
  SetDataAndLoadAsset(t, e, s) {
    this.LoadSuccess = false;
    if (e.BoneNames.length === 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 57, "该角色未在角色物理资产配置表中配置骨骼名 /Config/j.角色物理资产", ["默认值Id", e.Id]);
      }
      return false;
    }
    const i = e.PhysicsAssetPath;
    if (!i || i === "") {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 57, "该角色未在角色物理资产配置表中骨骼路径配置为空 /Config/j.角色物理资产", ["默认值Id", e.Id]);
      }
      return false;
    }
    this.ActorComp = t;
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.PhysicsAsset, t => {
      if (!t) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 57, "该角色未在角色物理资产配置表中骨骼路径配置加载失败 /Config/j.角色物理资产", ["path", i]);
        }
      }
      this.ActorComp.Actor.Mesh.SetPhysicsAsset(t, true);
      this.LoadSuccess = true;
      s();
    });
    for (const o of e.BoneNames) {
      this.BoneNames.push(o);
    }
    return true;
  }
  ClearData() {
    this.BoneNames.length = 0;
    this.ActorComp = undefined;
    this.LoadSuccess = false;
  }
}
let CharacterPhysicsAssetComponent = CharacterPhysicsAssetComponent_1 = class CharacterPhysicsAssetComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ijr = false;
    this.Tjr = undefined;
    this.Ljr = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.oRe = undefined;
    this.Cer = new Array();
    this.Djr = 0;
    this.Ype = false;
    this.I3r = t => {
      t = t.GetComponent(77);
      t.Tjr.ClearAnimState();
    };
    this.Rjr = (t, e) => {
      if (e) {
        this.Djr++;
      } else {
        this.Djr--;
      }
      if (this.Djr === 0) {
        this.Ujr(false);
      } else {
        this.Ujr(true);
      }
    };
  }
  static get Dependencies() {
    return [3, 217, 188];
  }
  OnInitData() {
    this.Tjr = new PhysicsState();
    this.Ljr = new PhysicsAssetLoader();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    if (this.Hte.CreatureData?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player || !this.Hte.IsAutonomousProxy) {
      this.Ijr = false;
      return !(this.Hte = undefined);
    }
    this.Lie = this.Entity.GetComponent(217);
    this.oRe = this.Entity.GetComponent(188);
    var t = this.Hte.CreatureData.GetRoleConfig().RoleBody;
    var t = ConfigManager_1.ConfigManager.EntityPhysicsAssetConfig.GetPhysicsAssetConfigByRoleBody(t);
    for (const e of CharacterPhysicsAssetComponent_1.Ajr) {
      if (this.Lie.HasTag(e)) {
        this.Djr++;
      }
    }
    this.Tjr.InitBaseState(this.Djr > 0);
    this.Ijr = this.Ljr.SetDataAndLoadAsset(this.Hte, t, () => {
      this.Ujr(this.Tjr.Active, true);
    });
    if (this.Ijr) {
      if (this.Lie?.Valid) {
        for (const s of CharacterPhysicsAssetComponent_1.Ajr) {
          if (this.Lie.HasTag(s)) {
            this.Djr++;
          }
          this.Cer.push(this.Lie.ListenForTagAddOrRemove(s, this.Rjr));
        }
      }
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    }
    return true;
  }
  OnClear() {
    for (const t of this.Cer) {
      t.EndTask();
    }
    this.Cer.length = 0;
    this.Ljr.ClearData();
    if (this.Ijr) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    }
    return true;
  }
  Ujr(e, t = false) {
    if ((this.Tjr.Active !== e || t) && this.Ljr.LoadSuccess) {
      let t = true;
      if (e) {
        if (!(t = this.Hte.SetMeshCollisionEnabled(2, "布娃娃效果"))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 57, "角色物理资产模拟设置CollisionEnable失败", ["Entity", this.Entity.Id]);
          }
          return;
        }
        if (!(t = this.Hte.SetMeshCollisionObjectType(5, "布娃娃效果"))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 57, "角色物理资产模拟设置CollisionObjectType失败", ["Entity", this.Entity.Id]);
          }
          return;
        }
        this.Hte.Actor.Mesh.bEnableShearAnim = false;
        for (const s of this.Ljr.BoneNames) {
          this.Hte.Actor.Mesh.SetAllBodiesBelowSimulatePhysics(FNameUtil_1.FNameUtil.GetDynamicFName(s), true, false);
        }
        if (this.Ype && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 57, "角色开启物理资产模拟", ["Entity", this.Entity.Id]);
        }
      } else {
        if (!(t = (t = t && this.Hte.SetMeshCollisionEnabled(0, "布娃娃效果")) && this.Hte.SetMeshCollisionObjectType(2, "布娃娃效果"))) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 57, "角色物理资产模拟重新设置Collision失败", ["Entity", this.Entity.Id]);
          }
          return;
        }
        this.Hte.Actor.Mesh.SetSimulatePhysics(false);
        this.Hte.Actor.Mesh.bEnableShearAnim = true;
        if (this.Ype && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 57, "角色关闭物理资产模拟", ["Entity", this.Entity.Id]);
        }
        this.oRe.MainAnimInstance.SavePoseSnapshot(ragDoll);
      }
      this.Tjr.SetNewState(e);
    }
  }
  GetRagRollQuitState() {
    var t = this.Tjr.QuitCache;
    this.Tjr.QuitCache = false;
    return t;
  }
  SetDebug(t) {
    this.Ype = t;
    if (this.Ype && (t = `
            ------------------------角色物理资产管理组件开启Debug----------------------
            -物理资产: ${this.Hte.Actor.Mesh.PhysicsAssetOverride?.GetName()}
            -驱动骨骼：${this.Ljr.BoneNames}
            -脚本组件管理状态 是否激活：${this.Tjr.Active}
            -------------------------------------------------------------------------
            `, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 57, t);
    }
  }
};
CharacterPhysicsAssetComponent.Ajr = [-648310348];
CharacterPhysicsAssetComponent = CharacterPhysicsAssetComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(77)], CharacterPhysicsAssetComponent);
exports.CharacterPhysicsAssetComponent = CharacterPhysicsAssetComponent; //# sourceMappingURL=CharacterPhysicsAssetComponent.js.map