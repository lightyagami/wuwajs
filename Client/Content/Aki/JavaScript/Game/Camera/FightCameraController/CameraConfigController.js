"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraConfigController = exports.CameraConfig = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const RbTree_1 = require("../../../Core/Container/RbTree");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const CameraController_1 = require("../CameraController");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
const DEFAULT_MAX_FADE_TIME = 10;
const noAimGameplayTag = -1036349300;
class CameraConfig {
  constructor(t) {
    this.Type = 0;
    this.Tag = undefined;
    this.PcValid = false;
    this.MobileValid = false;
    this.Priority = 0;
    this.EnableModifyCamera = false;
    this.EnableAdjustCamera = false;
    this.EnableAutoCamera = false;
    this.EnableFocusCamera = false;
    this.EnableSidestepCamera = false;
    this.EnableClimbCamera = false;
    this.FadeInTime = -0;
    this.FadeOutTime = -0;
    this.IsOpenMainLoop = false;
    this.IsResetDefaultConfig = false;
    this.IsResetCameraLock = false;
    this.IsUniqueFade = false;
    this.CameraArmLocationSocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.CameraArmLocationSocketOverrideType = 0;
    this.Type = t.Type;
    this.Tag = t.Tag.TagName === "None" ? undefined : t.Tag;
    this.PcValid = t.PC生效;
    this.MobileValid = t.手机生效;
    this.Priority = t.优先级;
    this.EnableModifyCamera = t.启用Modify镜头;
    this.EnableAdjustCamera = t.启用技能修正镜头;
    this.EnableAutoCamera = t.启用自动镜头;
    this.EnableFocusCamera = t.启用锁定镜头;
    this.EnableSidestepCamera = t.启用移动自动镜头;
    this.EnableClimbCamera = t.启用攀爬镜头;
    this.FadeInTime = t.淡入时间;
    this.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.淡入曲线);
    this.FadeOutTime = t.淡出时间;
    this.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.淡出曲线);
    this.LockOnParts = FightCameraLogicComponent_1.FightCameraLogicComponent.TArrayToArray(t.锁定点名称);
    this.DefaultConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.基础);
    this.DefaultCurveConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.基础曲线配置);
    this.AdjustConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.技能修正);
    this.CurveAdjustConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.技能修正曲线配置);
    this.AutoConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.自动镜头);
    this.CurveAutoConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.自动镜头曲线配置);
    this.FocusConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.锁定镜头);
    this.CurveFocusConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.锁定镜头曲线配置);
    this.InputConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.镜头输入);
    this.CurveInputConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.镜头输入曲线配置);
    this.ModifyConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.Modify镜头);
    this.CurveModifyConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.Modify镜头曲线配置);
    this.GuideConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.引导镜头);
    this.CurveGuideConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.引导镜头曲线配置);
    this.ExploreConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.跑图镜头);
    this.CurveExploreConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.跑图镜头曲线配置);
    this.DialogueConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.对话镜头);
    this.CurveDialogueConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.对话镜头曲线配置);
    this.ClimbConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.攀爬镜头);
    this.CurveClimbConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.攀爬镜头曲线配置);
    this.SidestepConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.移动自动镜头);
    this.CurveSidestepConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.移动自动镜头曲线配置);
    this.VehicleConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToMap(t.载具镜头);
    this.VehicleCurveConfig = FightCameraLogicComponent_1.FightCameraLogicComponent.TMapToCurveMap(t.载具镜头曲线配置);
    this.IsOpenMainLoop = t.是否开启主镜头缓入缓出;
    this.IsResetDefaultConfig = t.是否重置默认配置;
    this.IsResetCameraLock = t.是否重置镜头锁定;
    this.IsUniqueFade = t.是否独立过渡时间;
    this.CameraArmLocationSocketName = t.主控角色骨骼;
    this.CameraArmLocationSocketOverrideType = t.主控角色骨骼覆盖方式;
  }
}
exports.CameraConfig = CameraConfig;
class DtCameraConfig {
  constructor(t) {
    this.DataTable = t;
    this.ReferenceCount = 0;
    this.SubValidKeys = new Set();
    this.FocusValidKeys = new Set();
    this.AccompanyValidKeys = new Set();
    this.xv1 = true;
  }
  SetToConfigs(i, s, h, e) {
    var o = CameraController_1.CameraController.GetCameraConfigList(this.DataTable);
    var a = o.Num();
    for (let t = 0; t < a; t++) {
      var r;
      var n = new CameraConfig(o.Get(t));
      if (n[e]) {
        if (n.Tag && n.Tag.TagName !== "None") {
          r = n.Tag.TagId;
          if (n.Type === 2) {
            if (i.has(r)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Camera", 57, "[子镜头]独有镜头配置不允许重复的Tag", ["DT", this.DataTable.GetOuter().GetName()], ["Tag", n.Tag.TagName], ["Type", n.Type]);
              }
            } else {
              i.set(r, n);
              this.SubValidKeys.add(r);
            }
          } else if (n.Type === 3) {
            if (s.has(r)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Camera", 57, "[锁定目标镜头]独有镜头配置不允许重复的Tag", ["DT", this.DataTable.GetOuter().GetName()], ["Tag", n.Tag.TagName], ["Type", n.Type]);
              }
            } else {
              s.set(r, n);
              this.FocusValidKeys.add(r);
            }
          } else if (n.Type === 4) {
            if (h.has(r)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Camera", 57, "[伴随目标镜头]独有镜头配置不允许重复的Tag", ["DT", this.DataTable.GetOuter().GetName()], ["Tag", n.Tag.TagName], ["Type", n.Type]);
              }
            } else {
              h.set(r, n);
              this.AccompanyValidKeys.add(r);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "独有镜头配置不允许Tag为None", ["DT", this.DataTable.GetOuter().GetName()]);
        }
      }
    }
  }
  RemoveFromConfigs(t, i, s) {
    for (const h of this.SubValidKeys) {
      t.delete(h);
    }
    for (const e of this.FocusValidKeys) {
      i.delete(e);
    }
    for (const o of this.AccompanyValidKeys) {
      s.delete(o);
    }
    this.SubValidKeys.clear();
    this.FocusValidKeys.clear();
    this.AccompanyValidKeys.clear();
  }
}
class CameraConfigController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t);
    this.Rle = undefined;
    this.Ule = undefined;
    this.Ale = undefined;
    this.Ple = new Map();
    this.xle = new Map();
    this.Ltc = new Map();
    this.wle = new Set();
    this.Ble = new Set();
    this.wtc = new Set();
    this.ble = (t, i) => t.Priority - i.Priority;
    this.qle = new RbTree_1.RbTree(this.ble);
    this.Gle = new Map();
    this.AdjustCameraTagMap = new Map();
    this.AdjustCameraEntityHandleSet = new Set();
    this.Nle = false;
    this.Ole = undefined;
    this.cDn = undefined;
    this.OXa = (t, i) => {
      if (i) {
        if (!this.wle.has(t)) {
          if ((i = this.Ple.get(t)) && (this.qle.Insert(i), this.wle.add(t), this.Fle(i), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Camera", 57, "SelfTagChanged Insert", ["tag", i.Tag.TagName]);
          }
        }
      } else if ((i = this.Ple.get(t)) && this.wle.has(t) && !this.Camera.ContainsTag(t) && (this.qle.Remove(i), this.wle.delete(t), this.Vle(i), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Camera", 57, "SelfTagChanged Remove", ["tag", i.Tag.TagName]);
      }
    };
    this.Rtc = (t, i) => {
      if (i) {
        if (!this.wtc.has(t)) {
          if ((i = this.Ltc.get(t)) && (this.qle.Insert(i), this.wtc.add(t), this.Fle(i), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Camera", 57, "AccompanyTagChanged Insert", ["tag", i.Tag.TagName]);
          }
        }
      } else if ((i = this.Ltc.get(t)) && this.wtc.has(t) && !this.Camera.AccompanyContainsTag(t) && (this.qle.Remove(i), this.wtc.delete(t), this.Vle(i), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Camera", 57, "AccompanyTagChanged Remove", ["tag", i.Tag.TagName]);
      }
    };
    this.Hle = undefined;
    this.jle = "";
    this.Wle = (t, i) => {
      if (i) {
        if (this.Ble.has(t)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Camera", 57, "Got config before Tag", ["Tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)]);
          }
        } else if ((i = this.xle.get(t)) && i.LockOnParts.length === 0) {
          this.qle.Insert(i);
          this.Ble.add(t);
          this.Fle(i);
        }
      } else if (this.Ble.has(t) && (i = this.xle.get(t))) {
        this.qle.Remove(i);
        this.Vle(i);
        this.Ble.delete(t);
      }
    };
    this.OnChangeRole = (t, i) => {
      if (!(this.AdjustCameraTagMap.size <= 0)) {
        for (var [s, h] of this.AdjustCameraTagMap) {
          this.EnableHookConfig(s, h);
        }
      }
    };
    this.JJs = t => {
      this.SelfCharacterEntity = t;
    };
    this.Wzm = t => {
      this.FloatCharacterEntity = t;
    };
    this.Qzm = () => {
      this.FloatCharacterEntity = undefined;
    };
    this.Kle = false;
    this.Qle = false;
    this.Xle = DEFAULT_MAX_FADE_TIME;
    this.$le = undefined;
    this.Yle = false;
    this.Jle = DEFAULT_MAX_FADE_TIME;
    this.zle = undefined;
    this.AutoCamera = true;
    this.AdjustCamera = true;
    this.ModifyCamera = true;
    this.FocusCamera = true;
    this.SidestepCamera = true;
    this.ClimbCamera = true;
    this.Zle = true;
    this.e1e = undefined;
    this.DebugSubCameraModifications = undefined;
    if (Info_1.Info.IsMobilePlatform()) {
      this.e1e = "MobileValid";
    } else {
      this.e1e = "PcValid";
    }
    this.LoadConfig();
  }
  GetDefaultConfig() {
    return this.Ule;
  }
  get SelfCharacterEntity() {
    return this.Ole;
  }
  set SelfCharacterEntity(t) {
    if (this.Ole !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "CharacterChange", ["old", this.Ole?.Id], ["new", t?.Id]);
      }
      if (this.Ole?.Valid) {
        var i = this.Ole.Entity.GetComponent(217);
        if (i?.Valid) {
          for (var [, s] of this.Ple) {
            i.RemoveTagAddOrRemoveListener(s.Tag.TagId, this.OXa);
          }
        }
      }
      if (t?.Valid) {
        var h = t.Entity.GetComponent(217);
        if (h?.Valid) {
          for (var [, e] of this.Ple) {
            h.AddTagAddOrRemoveListener(e.Tag.TagId, this.OXa);
          }
        }
      }
      this.Ole = t;
      this.CDn();
    }
  }
  get FloatCharacterEntity() {
    return this.cDn;
  }
  set FloatCharacterEntity(t) {
    if (this.cDn !== t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "FloatCharacterChange", ["old", this.cDn?.Id], ["new", t?.Id]);
      }
      if (this.cDn?.Valid) {
        var i = this.cDn.Entity.GetComponent(217);
        if (i?.Valid) {
          for (var [, s] of this.Ltc) {
            i.RemoveTagAddOrRemoveListener(s.Tag.TagId, this.Rtc);
          }
        }
      }
      if (t?.Valid) {
        var h = t.Entity.GetComponent(217);
        if (h?.Valid) {
          for (var [, e] of this.Ltc) {
            h.AddTagAddOrRemoveListener(e.Tag.TagId, this.Rtc);
          }
        }
      }
      this.cDn = t;
      this.Atc();
    }
  }
  UpdateFocusTargetAndSocket(t, i) {
    let s = false;
    if (this.Hle === t) {
      if (this.jle !== i) {
        s = true;
      }
    } else {
      if (this.Hle?.Valid) {
        var h = this.Hle.GetComponent(217);
        if (h?.Valid) {
          for (var [, e] of this.xle) {
            h.RemoveTagAddOrRemoveListener(e.Tag.TagId, this.Wle);
          }
        }
      }
      if (t?.Valid) {
        var o = t.GetComponent(217);
        if (o?.Valid) {
          for (var [, a] of this.xle) {
            o.AddTagAddOrRemoveListener(a.Tag.TagId, this.Wle);
          }
        }
      }
      s = true;
    }
    this.Hle = t;
    this.jle = i;
    if (s) {
      this.i1e();
    }
  }
  Name() {
    return "ConfigController";
  }
  OnStart() {
    super.OnStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraCharacterChanged, this.JJs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerPossessed, this.Wzm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed, this.Qzm);
  }
  UpdateInternal(t) {
    this.UpdateConfig();
  }
  EnableHookConfig(t, i = undefined) {
    var s;
    var h = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      if (e?.Valid && (s = e.Entity.GetComponent(217))) {
        if (i !== undefined && !s.HasTag(i)) {
          s.AddTag(i);
        }
        if (s.HasTag(h)) {
          s.RemoveTag(h);
        }
        s.AddTag(h);
        CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController.AdjustCameraEntityHandleSet.add(e);
      }
    }
    this.AdjustCameraTagMap.set(t, i);
  }
  DisableHookConfig(i = undefined) {
    if (i !== undefined) {
      Object.values(IAction_1.EAdjustPlayerCamera).forEach(t => {
        this.o1e(t, i);
      });
    }
    for (const t of this.AdjustCameraEntityHandleSet) {
      const s = t?.Entity?.GetComponent(217);
      if (s) {
        Object.values(IAction_1.EAdjustPlayerCamera).forEach(t => {
          s.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
        });
        s.RemoveTag(noAimGameplayTag);
      }
    }
    this.AdjustCameraEntityHandleSet.clear();
    this.AdjustCameraTagMap.clear();
  }
  DisableHookConfigByType(t) {
    for (const s of this.AdjustCameraEntityHandleSet) {
      var i = s?.Entity?.GetComponent(217);
      if (i) {
        i.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
        i.RemoveTag(noAimGameplayTag);
      }
    }
    this.AdjustCameraTagMap.delete(t);
  }
  GetCameraConfigByTag(t) {
    return this.Ple.get(t);
  }
  LoadConfig() {
    this.Rle = CameraController_1.CameraController.GetCameraConfigList();
    this.Ple.clear();
    this.xle.clear();
    this.Ltc.clear();
    this.wle.clear();
    this.wtc.clear();
    for (var [, t] of this.Gle) {
      t.SubValidKeys.clear();
      t.FocusValidKeys.clear();
      t.AccompanyValidKeys.clear();
    }
    var i;
    var s = this.Rle.Num();
    for (let t = 0; t < s; t++) {
      var h = new CameraConfig(this.Rle.Get(t));
      if (h[this.e1e]) {
        if (h.Type === 0) {
          this.Ule = h;
        } else if (h.Type === 1) {
          this.Ale = h;
        } else if (h.Type === 2) {
          if (h.Tag && h.Tag.TagName !== "None") {
            this.Ple.set(h.Tag.TagId, h);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "初始化镜头配置[DT_CameraConfigs]失败，子镜头没有正确配置Tag");
          }
        } else if (h.Type === 3) {
          if (h.Tag.TagName === "None") {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "初始化镜头配置[DT_CameraConfigs]失败，锁定目标镜头没有正确配置Tag");
            }
          } else {
            this.xle.set(h.Tag.TagId, h);
          }
        } else if (h.Type === 4) {
          if (h.Tag.TagName === "None") {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 57, "初始化镜头配置[DT_CameraConfigs]失败，伴随目标镜头没有正确配置Tag");
            }
          } else {
            this.Ltc.set(h.Tag.TagId, h);
          }
        }
      }
    }
    if (!this.Ule || !this.Ale) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "初始化镜头配置[DT_CameraConfigs]失败，基础镜头/战斗镜头未配置");
      }
    }
    for ([, i] of this.Gle) {
      i.SetToConfigs(this.Ple, this.xle, this.Ltc, this.e1e);
    }
    this.Nle = false;
    this.qle.Clear();
    this.qle.Insert(this.Ule);
    this.Zle = true;
    this.Fle(this.Ule);
    this.UpdateConfig();
  }
  LoadCharacterConfig(i) {
    if (i) {
      let t = this.Gle.get(i);
      if (!t) {
        (t = new DtCameraConfig(i)).SetToConfigs(this.Ple, this.xle, this.Ltc, this.e1e);
        this.Gle.set(i, t);
        if (this.Ole?.Valid) {
          var s = this.Ole.Entity.GetComponent(217);
          if (s?.Valid) {
            for (const n of t.SubValidKeys) {
              s.AddTagAddOrRemoveListener(n, this.OXa);
            }
          }
        }
        if (this.Hle?.Valid) {
          var h = this.Hle.GetComponent(217);
          if (h?.Valid) {
            for (const g of t.FocusValidKeys) {
              h.AddTagAddOrRemoveListener(g, this.Wle);
            }
          }
        }
        if (this.FloatCharacterEntity?.Valid) {
          var e = this.cDn.Entity.GetComponent(217);
          if (e?.Valid) {
            for (const C of t.AccompanyValidKeys) {
              e.AddTagAddOrRemoveListener(C, this.Rtc);
            }
          }
        }
        if (this.SelfCharacterEntity) {
          for (const f of t.SubValidKeys) {
            var o;
            if (this.Camera.ContainsTag(f)) {
              o = this.Ple.get(f);
              this.qle.Insert(o);
              this.wle.add(f);
              this.Fle(o);
            }
          }
        }
        if (this.Hle) {
          for (const _ of t.FocusValidKeys) {
            var a;
            if (this.Camera.TargetContainsTag(_)) {
              a = this.xle.get(_);
              this.qle.Insert(a);
              this.Ble.add(_);
              this.Fle(a);
            }
          }
        }
        if (this.FloatCharacterEntity) {
          for (const m of t.AccompanyValidKeys) {
            var r;
            if (this.Camera.AccompanyContainsTag(m)) {
              r = this.Ltc.get(m);
              this.qle.Insert(r);
              this.wtc.add(m);
              this.Fle(r);
            }
          }
        }
      }
      ++t.ReferenceCount;
    }
  }
  UnloadCharacterConfig(t) {
    if (t) {
      var i;
      var s;
      var h;
      var e = this.Gle.get(t);
      if (e) {
        --e.ReferenceCount;
        if (e.ReferenceCount === 0) {
          if (this.Ole?.Valid) {
            var o = this.Ole.Entity.GetComponent(217);
            if (o?.Valid) {
              for (const n of e.SubValidKeys) {
                o.RemoveTagAddOrRemoveListener(n, this.OXa);
              }
            }
          }
          if (this.Hle?.Valid) {
            var a = this.Hle.GetComponent(217);
            if (a?.Valid) {
              for (const g of e.FocusValidKeys) {
                a.RemoveTagAddOrRemoveListener(g, this.Wle);
              }
            }
          }
          if (this.cDn?.Valid) {
            var r = this.cDn.Entity.GetComponent(217);
            if (r?.Valid) {
              for (const C of e.AccompanyValidKeys) {
                r.RemoveTagAddOrRemoveListener(C, this.Rtc);
              }
            }
          }
          if (this.SelfCharacterEntity) {
            for (const f of e.SubValidKeys) {
              if (this.wle.delete(f)) {
                i = this.Ple.get(f);
                this.qle.Remove(i);
                this.Vle(i);
              }
            }
          }
          if (this.Hle) {
            for (const _ of e.FocusValidKeys) {
              if (this.Ble.delete(_)) {
                s = this.xle.get(_);
                this.qle.Remove(s);
                this.Vle(s);
              }
            }
          }
          if (this.FloatCharacterEntity) {
            for (const m of e.AccompanyValidKeys) {
              if (this.wtc.delete(m)) {
                h = this.Ltc.get(m);
                this.qle.Remove(h);
                this.Vle(h);
              }
            }
          }
          e.RemoveFromConfigs(this.Ple, this.xle, this.Ltc);
          this.Gle.delete(t);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "没有加载Camera配置表格", ["DT", t.GetOuter().GetName()]);
      }
    }
  }
  UpdateConfig() {
    if (this.Camera.Character) {
      let t = false;
      if (this.r1e()) {
        t = true;
      }
      this.SelfCharacterEntity = this.Camera.CharacterEntityHandle;
      var i = this.Camera?.TargetEntity ? this.Camera?.TargetSocketName?.toString() ?? "" : "";
      this.UpdateFocusTargetAndSocket(this.Camera.TargetEntity?.Entity, i);
      if (t ||= this.Zle) {
        this.s1e();
      }
      this.Zle = false;
    }
  }
  r1e() {
    var t;
    var i;
    var s = this.Camera.ContainsTag(1996802261);
    return s !== this.Nle && (t = this.Nle ? this.Ale : this.Ule, i = s ? this.Ale : this.Ule, this.qle.Remove(t), this.qle.Insert(i), this.Vle(t), this.Fle(i), this.Nle = s, true);
  }
  i1e() {
    for (const h of this.Ble) {
      var t = this.xle.get(h);
      if (!this.Camera.TargetContainsTag(h) || !t.LockOnParts.includes(this.jle)) {
        this.qle.Remove(t);
        this.Ble.delete(h);
        this.Vle(t);
      }
    }
    for (var [i, s] of this.xle) {
      if (!!this.Camera.TargetContainsTag(i) && (s.LockOnParts.length === 0 || !!s.LockOnParts.includes(this.jle)) && !this.Ble.has(i)) {
        this.qle.Insert(s);
        this.Ble.add(i);
        this.Fle(s);
      }
    }
  }
  CDn() {
    for (const h of this.wle) {
      var t = this.Ple.get(h);
      if (!this.Camera.ContainsTag(h)) {
        this.qle.Remove(t);
        this.wle.delete(h);
        this.Vle(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Camera", 57, "UpdateSelfConfig Remove", ["tag", t.Tag.TagName]);
        }
      }
    }
    for (var [i, s] of this.Ple) {
      if (!this.wle.has(i)) {
        if (this.Camera.ContainsTag(i) && (this.qle.Insert(s), this.wle.add(i), this.Fle(s), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 57, "UpdateSelfConfig Insert", ["tag", s.Tag.TagName]);
        }
      }
    }
  }
  Atc() {
    for (const h of this.wtc) {
      var t = this.Ltc.get(h);
      if (!this.Camera.AccompanyContainsTag(h)) {
        this.qle.Remove(t);
        this.wtc.delete(h);
        this.Vle(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Camera", 57, "UpdateAccompanyConfig Remove", ["tag", t.Tag.TagName]);
        }
      }
    }
    for (var [i, s] of this.Ltc) {
      if (!this.wtc.has(i)) {
        if (this.Camera.AccompanyContainsTag(i) && (this.qle.Insert(s), this.wtc.add(i), this.Fle(s), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 57, "UpdateAccompanyConfig Insert", ["tag", s.Tag.TagName]);
        }
      }
    }
  }
  Fle(t) {
    var i = Math.min(t.FadeInTime, DEFAULT_MAX_FADE_TIME);
    if (!(i > this.Xle) && (!this.Kle && (!this.Camera.Fading || !this.Camera.IsUniqueFade) || !!t.IsUniqueFade)) {
      this.Qle = true;
      this.Zle = true;
      this.Kle = t.IsUniqueFade;
      this.Xle = i;
      this.$le = t.FadeInCurve;
    }
  }
  Vle(t) {
    var i = Math.min(t.FadeOutTime, DEFAULT_MAX_FADE_TIME);
    if (!(i > this.Jle) && (!this.Kle && (!this.Camera.Fading || !this.Camera.IsUniqueFade) || !!t.IsUniqueFade)) {
      this.Yle = true;
      this.Zle = true;
      this.Kle = t.IsUniqueFade;
      this.Jle = i;
      this.zle = t.FadeOutCurve;
    }
  }
  a1e() {
    if (this.Qle && this.Yle) {
      return this.Xle <= this.Jle;
    } else {
      return this.Qle;
    }
  }
  s1e() {
    var t;
    this.h1e();
    this.l1e();
    this.qle.ForEach(t => {
      this._1e(t);
      return true;
    });
    this.Camera.ApplyConfig();
    if (this.Camera.Initialized) {
      t = this.a1e();
      this.Camera.StartFade(t ? this.Xle : this.Jle, t ? this.$le : this.zle, true, true, true, true, this.Kle);
    }
    this.Kle = false;
    this.Qle = false;
    this.Yle = false;
    this.Xle = DEFAULT_MAX_FADE_TIME;
    this.Jle = DEFAULT_MAX_FADE_TIME;
  }
  o1e(t, i) {
    t = this.GetCameraConfigByTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
    if (t) {
      t.FadeOutTime = i;
    }
  }
  GetCameraConfigTagsContent() {
    let i = "";
    this.qle.ForEach(t => {
      i += "|" + (t.Tag?.TagName ?? "None");
      return true;
    });
    return i;
  }
  h1e() {
    if (!this.AutoCamera) {
      this.Camera.CameraAutoController.Unlock(this);
    }
    if (!this.ModifyCamera) {
      this.Camera.CameraModifyController.Unlock(this);
    }
    if (!this.AdjustCamera) {
      this.Camera.CameraAdjustController.Unlock(this);
    }
    if (!this.FocusCamera) {
      this.Camera.CameraFocusController.Unlock(this);
    }
    if (!this.SidestepCamera) {
      this.Camera.CameraSidestepController.Unlock(this);
    }
    if (!this.ClimbCamera) {
      this.Camera.CameraClimbController.Unlock(this);
    }
    this.AutoCamera = true;
    this.ModifyCamera = true;
    this.AdjustCamera = true;
    this.FocusCamera = true;
    this.SidestepCamera = true;
    this.ClimbCamera = true;
    this.Camera.CameraCollision.IsOpenBlend = true;
  }
  _1e(t) {
    if (t.IsResetDefaultConfig) {
      this.Camera.ResetDefaultConfig();
      this.Camera.CameraFocusController.ResetDefaultConfig();
      this.Camera.CameraInputController.ResetDefaultConfig();
      this.Camera.CameraModifyController.ResetDefaultConfig();
      this.Camera.CameraAdjustController.ResetDefaultConfig();
      this.Camera.CameraSidestepController.ResetDefaultConfig();
      this.Camera.CameraAutoController.ResetDefaultConfig();
      this.Camera.CameraGuideController.ResetDefaultConfig();
      this.Camera.CameraRunningController.ResetDefaultConfig();
      this.Camera.CameraDialogueController.ResetDefaultConfig();
      this.Camera.CameraClimbController.ResetDefaultConfig();
    }
    this.Camera.SetConfigs(t.DefaultConfig, t.DefaultCurveConfig, t.VehicleConfig, t.VehicleCurveConfig, t.Tag?.TagName ?? "None", t.CameraArmLocationSocketName, t.CameraArmLocationSocketOverrideType, false);
    this.Camera.CameraFocusController.SetConfigs(t.FocusConfig, t.CurveFocusConfig);
    this.Camera.CameraInputController.SetConfigs(t.InputConfig, t.CurveInputConfig);
    this.Camera.CameraModifyController.SetConfigs(t.ModifyConfig, t.CurveModifyConfig);
    this.Camera.CameraAdjustController.SetConfigs(t.AdjustConfig, t.CurveAdjustConfig);
    this.Camera.CameraSidestepController.SetConfigs(t.SidestepConfig, t.CurveSidestepConfig);
    this.Camera.CameraAutoController.SetConfigs(t.AutoConfig, t.CurveAutoConfig);
    this.Camera.CameraGuideController.SetConfigs(t.GuideConfig, t.CurveGuideConfig);
    this.Camera.CameraRunningController.SetConfigs(t.ExploreConfig, t.CurveExploreConfig);
    this.Camera.CameraDialogueController.SetConfigs(t.DialogueConfig, t.CurveDialogueConfig);
    this.Camera.CameraClimbController.SetConfigs(t.ClimbConfig, t.CurveClimbConfig);
    if (t.IsResetCameraLock) {
      this.h1e();
    }
    if (!t.EnableAutoCamera) {
      this.Camera.CameraAutoController.Lock(this);
      this.AutoCamera = false;
    }
    if (!t.EnableModifyCamera) {
      this.Camera.CameraModifyController.Lock(this);
      this.ModifyCamera = false;
    }
    if (!t.EnableAdjustCamera) {
      this.Camera.CameraAdjustController.Lock(this);
      this.AdjustCamera = false;
    }
    if (!t.EnableFocusCamera) {
      this.Camera.CameraFocusController.Lock(this);
      this.FocusCamera = false;
    }
    if (!t.EnableSidestepCamera) {
      this.Camera.CameraSidestepController.Lock(this);
      this.SidestepCamera = false;
    }
    if (!t.EnableClimbCamera) {
      this.Camera.CameraClimbController.Lock(this);
      this.ClimbCamera = false;
    }
    this.Camera.CameraCollision.IsOpenBlend = t.IsOpenMainLoop;
  }
  l1e() {
    this.Camera.ResetDefaultConfig();
    this.Camera.CameraFocusController.ResetDefaultConfig();
    this.Camera.CameraInputController.ResetDefaultConfig();
    this.Camera.CameraModifyController.ResetDefaultConfig();
    this.Camera.CameraAdjustController.ResetDefaultConfig();
    this.Camera.CameraSidestepController.ResetDefaultConfig();
    this.Camera.CameraAutoController.ResetDefaultConfig();
    this.Camera.CameraGuideController.ResetDefaultConfig();
    this.Camera.CameraRunningController.ResetDefaultConfig();
    this.Camera.CameraDialogueController.ResetDefaultConfig();
    this.Camera.CameraClimbController.ResetDefaultConfig();
  }
  CheckIfInAdjustCamera() {
    return !(this.AdjustCameraTagMap.size <= 0) && this.AdjustCameraTagMap.has(IAction_1.EAdjustPlayerCamera.Fixed);
  }
  OnEnd() {
    super.OnEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraCharacterChanged, this.JJs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerPossessed, this.Wzm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerUnPossessed, this.Qzm);
  }
}
exports.CameraConfigController = CameraConfigController;
//# sourceMappingURL=CameraConfigController.js.map