"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelActorComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelActorComponent = class UiModelActorComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.Actor = undefined;
    this.MainMeshComponent = undefined;
    this.ChildMeshComponentList = undefined;
    this.DecorationMeshComponentList = undefined;
    this.CharRenderingComponent = undefined;
    this.ywr = undefined;
    this.D_r = undefined;
    this.Iwr = undefined;
    this.Twr = e => {
      var t;
      if (this.MainMeshComponent) {
        this.Lwr(this.MainMeshComponent, e);
        if (!e) {
          t = this.MainMeshComponent.GetAnimInstance();
          UE.KuroAnimLibrary.EndAnimNotifyStates(t);
        }
      }
      if (this.ChildMeshComponentList && this.ChildMeshComponentList.length > 0) {
        for (const i of this.ChildMeshComponentList) {
          this.Lwr(i, e);
        }
      }
      if (this.DecorationMeshComponentList && this.DecorationMeshComponentList.length > 0) {
        for (const s of this.DecorationMeshComponentList) {
          this.Lwr(s, e);
        }
      }
    };
    this.Dwr = e => {
      this.CharRenderingComponent?.SetDitherEffect(e, 0);
    };
  }
  OnInit() {
    this.ywr = this.Owner.CheckGetComponent(0);
    this.D_r = this.Owner.GetComponent(4);
    switch (this.ywr.ModelActorType) {
      case 1:
      case 0:
        this.CharRenderingComponent = this.Rwr(5);
        break;
      case 2:
        this.CharRenderingComponent = this.Rwr(7);
    }
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelVisibleChange, this.Twr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetDitherEffect, this.Dwr);
  }
  Uwr(e) {
    e = this.Actor.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, e ?? MathUtils_1.MathUtils.DefaultTransform, false);
    e.KuroMaterialControllerUpdateGroupMode = 1;
    e.SetTickableWhenPaused(true);
    this.Lwr(e, this.ywr.GetVisible());
    if (Info_1.Info.IsPlayInEditor) {
      UE.LGUIBPLibrary.AddInstanceComponent(this.Actor, e);
    }
    return e;
  }
  Rwr(e) {
    var t = this.Actor.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    t.Init(e);
    t.SetTickableWhenPaused(true);
    return t;
  }
  Awr() {
    switch (this.ywr.ModelType) {
      case 1:
        this.CharRenderingComponent.AddComponent("WeaponCase0", this.MainMeshComponent);
        break;
      case 0:
      case 2:
        this.CharRenderingComponent.AddComponent("CharacterMesh0", this.MainMeshComponent);
        break;
      case 3:
        this.CharRenderingComponent.AddComponent("HuluCase", this.MainMeshComponent);
        break;
      case 4:
        this.CharRenderingComponent.AddComponent("CharacterMesh0", this.MainMeshComponent);
        break;
      case 5:
        this.CharRenderingComponent.AddComponentByCase(7, this.MainMeshComponent);
        break;
      case 6:
        this.CharRenderingComponent.AddComponent("CharacterMesh0", this.MainMeshComponent);
    }
  }
  ChangeMesh(e, t, i, s, o = 0) {
    switch (this.ywr.ModelType) {
      case 0:
        this.Pwr(e, t, i, s, o);
        break;
      case 2:
        this.xwr(e, t, i, o);
        break;
      case 1:
      case 3:
      case 4:
      case 5:
        this.xwr(e, t, undefined, o);
        break;
      case 6:
        this.xwr(e, undefined, undefined, o);
    }
  }
  xwr(e, t, i, s = 0) {
    this.CharRenderingComponent?.ResetAllRenderingState();
    this.wwr();
    this.D_r?.DestroyAllEffect();
    var o = this.MainMeshComponent;
    var h = o?.GetAnimInstance();
    if (h) {
      UE.KuroAnimLibrary.EndAnimNotifyStates(h);
    }
    var h = this.Uwr();
    this.QN1(h, e, s);
    h?.SetAnimClass(t);
    this.MainMeshComponent = h;
    if (o) {
      this.Bwr(o);
    }
    if (i && i.length > 0) {
      for (const n of i) {
        this.bwr(n);
      }
    }
    this.Awr();
  }
  QN1(e, t, i = 0) {
    e.SetSkeletalMesh(t);
    e.SetForcedLOD(i);
  }
  Pwr(i, e, s, o, h = 0) {
    if (this.ywr?.ModelActorType !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "actor类型必须为TsUiSceneRoleActor");
      }
    } else {
      this.CharRenderingComponent.ResetAllRenderingState();
      this.wwr();
      this.lPm();
      this.D_r?.DestroyAllEffect();
      var n = this.MainMeshComponent;
      let t = undefined;
      if (n && n.GetAnimationMode() === 0 && (t = this.GetAnimInstanceFromSkeletalMesh(n))) {
        UE.KuroAnimLibrary.EndAnimNotifyStates(t);
      }
      var r = this.Uwr();
      this.QN1(r, i, h);
      r?.SetAnimClass(e);
      var i = this.GetAnimInstanceFromSkeletalMesh(r);
      if (t) {
        let e = false;
        h = t.StateInternal;
        if ((e = h && (h >= 13 && h <= 15 || h === 7) ? true : e) && i) {
          i.SyncAnimInstance(t);
        }
      }
      this.MainMeshComponent = r;
      if (n) {
        this.Bwr(n);
      }
      if (s && s.length > 0) {
        for (const a of s) {
          this.bwr(a);
        }
      }
      if (o && o.length > 0) {
        for (const _ of o) {
          this._Pm(_);
        }
      }
      this.Awr();
    }
  }
  bwr(e) {
    this.ChildMeshComponentList ||= [];
    var t = this.Uwr();
    this.QN1(t, e);
    t.SetMasterPoseComponent(this.MainMeshComponent);
    this.ChildMeshComponentList.push(t);
    var e = this.ChildMeshComponentList.length - 1;
    this.CharRenderingComponent.AddComponent("OtherCase" + e, t);
    return t;
  }
  _Pm(e) {
    this.DecorationMeshComponentList ||= [];
    var t = this.Uwr(e.Transform);
    this.QN1(t, e.SkeletalMesh);
    t.K2_AttachToComponent(this.MainMeshComponent, FNameUtil_1.FNameUtil.GetDynamicFName(e.SocketName), 0, 0, 0, false);
    this.CharRenderingComponent.AddComponentByCase(7, t);
    this.DecorationMeshComponentList.push(t);
  }
  wwr() {
    if (this.ChildMeshComponentList) {
      for (const e of this.ChildMeshComponentList) {
        this.Bwr(e);
      }
      this.ChildMeshComponentList.length = 0;
    }
  }
  lPm() {
    if (this.DecorationMeshComponentList) {
      for (const e of this.DecorationMeshComponentList) {
        this.Bwr(e);
      }
      this.DecorationMeshComponentList.length = 0;
    }
  }
  Bwr(e) {
    e.K2_DestroyComponent(this.Actor);
    if (Info_1.Info.IsPlayInEditor) {
      UE.LGUIBPLibrary.RemoveInstanceComponent(this.Actor, e);
    }
  }
  SetTransformByTag(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(e), 1);
    if (t) {
      this.Actor.D_K2_SetActorTransform(t.D_GetTransform(), false, undefined, false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiSceneRoleActor", 43, "查找不到标签对象", ["标签Tag", e]);
    }
  }
  SetAllMeshComponentRelativeTransform(e, t = false, i, s = false) {
    this.MainMeshComponent?.K2_SetRelativeTransform(e, t, i, s);
    if (this.ChildMeshComponentList && this.ChildMeshComponentList.length !== 0) {
      for (const o of this.ChildMeshComponentList) {
        o.K2_SetRelativeTransform(e, t, i, s);
      }
    }
  }
  GetAnimInstanceFromSkeletalMesh(e) {
    var t = e.GetAnimInstance();
    if (t) {
      t = t.GetLinkedAnimGraphInstanceByTag(CharacterNameDefines_1.CharacterNameDefines.ABP_BASE);
      if (t) {
        if (this.Iwr || (this.Iwr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(RoleDefine_1.UI_ABP_PATH, UE.Class), this.Iwr)) {
          if (t.IsA(this.Iwr)) {
            return t;
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("UiComponent", 43, "Ui场景以下网格体动画蓝图 LinkedAnimGraph节点父类配置错误，应该为ABP_Performance_{角色}", ["Mesh:", e.SkeletalMesh.GetName()]);
            }
            return;
          }
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiComponent", 43, "Ui场景 基本路径网格体动画蓝图错误", ["现错误Path:", "/Game/Aki/Character/Role/Common/ABP_PerformanceRole.ABP_PerformanceRole_C"]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiComponent", 43, "Ui场景以下网格体动画状态机ABP_Performance_{角色}_PC需要重新生成", ["Mesh:", e.SkeletalMesh.GetName()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiComponent", 43, "Ui场景以下网格体AnimInstance获取失败", ["Mesh:", e.SkeletalMesh?.GetName()]);
    }
  }
  Lwr(e, t) {
    e.SetHiddenInGame(!t);
    e.SetComponentTickEnabled(t);
  }
  GetActor() {
    return this.Actor;
  }
  GetDangoAnimInstanceFromSkeletalMesh(e) {
    var t = e.GetAnimInstance();
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiComponent", 58, "Ui团子获取网格体AnimInstance失败", ["Mesh:", e.SkeletalMesh?.GetName()]);
    }
  }
};
UiModelActorComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(1)], UiModelActorComponent);
exports.UiModelActorComponent = UiModelActorComponent; //# sourceMappingURL=UiModelActorComponent.js.map