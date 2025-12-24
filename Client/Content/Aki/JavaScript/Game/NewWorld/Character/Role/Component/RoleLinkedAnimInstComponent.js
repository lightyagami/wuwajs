"use strict";

var RoleLinkedAnimInstComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, n, r) : o(t, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLinkedAnimInstComponent = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterLinkedAnimInstComponent_1 = require("../../Common/Component/CharacterLinkedAnimInstComponent");
let RoleLinkedAnimInstComponent = RoleLinkedAnimInstComponent_1 = class RoleLinkedAnimInstComponent extends CharacterLinkedAnimInstComponent_1.CharacterLinkedAnimInstComponent {
  constructor() {
    super(...arguments);
    this.TagComp = undefined;
    this.MorphComp = undefined;
    this.Hwm = 0;
    this.$wm = 0;
    this.jJf = undefined;
    this.OnPrevTagChanged = (e, t) => {
      if (t) {
        const n = RoleLinkedAnimInstComponent_1.PreloadMap.get(e);
        if (this.CurrentActivate === 0 && this.Hwm !== n) {
          const i = this.GetGameplayABPAssetPath(n);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Role", 6, "LinkedAnim: OnPrevTagChanged", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["Path", i]);
          }
          this.$wm = n;
          ResourceSystem_1.ResourceSystem.LoadAsync(i, ue_1.Class, e => {
            var t;
            if (e) {
              if (this.CurrentActivate === 0 && this.$wm === n && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Role", 6, "LinkedAnim", ["Class", e?.GetName()]), this.jJf = e, this.Hwm = n, t = this.AnimComp?.Actor?.Mesh)) {
                t.LinkAnimGraphByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY, e);
                EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGameplayAnimInstChanged, t.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY));
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Role", 57, "Invalid LinkedAnim", ["path", i]);
            }
          });
        } else if (this.CurrentActivate !== 0 && this.CurrentActivate !== n && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Role", 6, "LinkedAnim: OnPrevTagChanged 与当前激活不同", ["CurrentActivate", this.CurrentActivate], ["name", n]);
        }
      }
    };
    this.OnActivateTagChanged = (e, t) => {
      var n;
      if (t) {
        t = RoleLinkedAnimInstComponent_1.ActivateMap.get(e);
        if (this.CurrentActivate !== t) {
          if (this.Hwm === t) {
            this.CurrentActivate = t;
          } else {
            if (this.Hwm !== 0 && Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Role", 6, "LinkedAnim: OnActivateTagChanged 没有预加载就使用", ["CurrentPreload", this.Hwm], ["name", t]);
            }
            this.CurrentActivate = t;
            this.Hwm = t;
            t = this.GetGameplayABPAssetPath(this.CurrentActivate);
            n = ResourceSystem_1.ResourceSystem.Load(t, ue_1.Class);
            this.jJf = n;
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Role", 6, "LinkedAnim: OnActivateTagChanged 没有预加载", ["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["Path", t]);
            }
            if (e = this.AnimComp?.Actor?.Mesh) {
              e.LinkAnimGraphByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY, n);
              EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGameplayAnimInstChanged, e.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY));
            }
          }
        }
      } else {
        this.CurrentActivate = 0;
      }
    };
    this._7_ = (e, t, n) => {
      var i = this.AnimComp?.Actor?.Mesh;
      if (!!i && (!i.bCacheFirstAnimInstance || !i.bUseAnimInstanceCachePool)) {
        if (this.jJf && this.MorphComp?.Valid && this.MorphComp.GetMorphType() === 0 && i.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY)?.GetClass() !== this.jJf) {
          i.LinkAnimGraphByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY, this.jJf);
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 215, 186];
  }
  OnStart() {
    super.OnStart();
    this.TagComp = this.Entity.GetComponent(215);
    this.MorphComp = this.Entity.GetComponent(306);
    if (!RoleLinkedAnimInstComponent_1.TQm) {
      RoleLinkedAnimInstComponent_1.TQm = true;
      RoleLinkedAnimInstComponent_1.PreloadMap = new Map();
      RoleLinkedAnimInstComponent_1.ActivateMap = new Map();
      var e = DataTableUtil_1.DataTableUtil.GetDataTableAllRow(28);
      if (e) {
        for (const i of e) {
          if (GameplayTagUtils_1.GameplayTagUtils.IsValidTag(i.PreloadTag)) {
            RoleLinkedAnimInstComponent_1.PreloadMap.set(i.PreloadTag.TagId, i.Type);
          }
          if (GameplayTagUtils_1.GameplayTagUtils.IsValidTag(i.ActiveTag)) {
            RoleLinkedAnimInstComponent_1.ActivateMap.set(i.ActiveTag.TagId, i.Type);
          }
        }
      }
    }
    if (this.TagComp) {
      for (var [t] of RoleLinkedAnimInstComponent_1.PreloadMap) {
        this.TagComp.AddTagAddOrRemoveListener(t, this.OnPrevTagChanged);
      }
      for (var [n] of RoleLinkedAnimInstComponent_1.ActivateMap) {
        this.TagComp.AddTagAddOrRemoveListener(n, this.OnActivateTagChanged);
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    if (this.TagComp) {
      for (var [e] of RoleLinkedAnimInstComponent_1.PreloadMap) {
        this.TagComp.RemoveTagAddOrRemoveListener(e, this.OnPrevTagChanged);
      }
      for (var [t] of RoleLinkedAnimInstComponent_1.ActivateMap) {
        this.TagComp.RemoveTagAddOrRemoveListener(t, this.OnActivateTagChanged);
      }
    }
    return super.OnEnd();
  }
  SyncLinkGameplayAnimBlueprint(e) {
    return !!super.SyncLinkGameplayAnimBlueprint(e) && (e = this.AnimComp.Actor.Mesh, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGameplayAnimInstChanged, e.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_GAMEPLAY)), true);
  }
};
RoleLinkedAnimInstComponent.TQm = false;
RoleLinkedAnimInstComponent.PreloadMap = undefined;
RoleLinkedAnimInstComponent.ActivateMap = undefined;
RoleLinkedAnimInstComponent = RoleLinkedAnimInstComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(107)], RoleLinkedAnimInstComponent);
exports.RoleLinkedAnimInstComponent = RoleLinkedAnimInstComponent; //# sourceMappingURL=RoleLinkedAnimInstComponent.js.map