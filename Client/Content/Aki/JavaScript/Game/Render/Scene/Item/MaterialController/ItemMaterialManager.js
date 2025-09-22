"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemMaterialManager = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig");
const ItemMaterialController_1 = require("./ItemMaterialController");
class ItemMaterialManager {
  static Initialize() {
    this.GlobalController = undefined;
    this.ActorControllers = [];
    this.IndexCountGlobal = -1;
    this.IndexCount = -1;
    this.AllGlobalControllerInfoMap = new Map();
    this.AllActorControllerInfoMap = new Map();
    this.IsInit = true;
  }
  static Tick(t) {
    RenderModuleConfig_1.RenderStats.Init();
    RenderModuleConfig_1.RenderStats.StatItemMaterialManagerTick.Start();
    var e = t * 0.001;
    var r = [];
    if (!this.IsInit) {
      this.Initialize();
    }
    if (this.AllGlobalControllerInfoMap.size > 0) {
      for (const s of this.AllGlobalControllerInfoMap.keys()) {
        var i = this.AllGlobalControllerInfoMap.get(s);
        if (i?.IsValid()) {
          i.Update(e);
        } else {
          i.Destroy();
          this.AllGlobalControllerInfoMap.delete(s);
        }
      }
    }
    if (this.AllActorControllerInfoMap.size > 0) {
      for (const n of this.AllActorControllerInfoMap.keys()) {
        var a = this.AllActorControllerInfoMap.get(n);
        if (a?.IsValid() && a.GetLifeTimeController() !== undefined) {
          a.Update(e);
        } else {
          r.push(n);
        }
      }
    }
    for (let t = 0; t < r.length; t++) {
      var o = r[t];
      if (this.AllActorControllerInfoMap.get(o)) {
        this.AllActorControllerInfoMap.get(o).Destroy();
        this.AllActorControllerInfoMap.delete(o);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 32, "单体交互物材质控制器队列已经没有目标控制器，卸载失败", ["handle", o]);
      }
      if (!this.DataMap?.IsValid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 32, "DataMap被UE清理");
        }
        return;
      }
      if (this.DataMap?.Map?.Get(o)) {
        this.DataMap.Map.Remove(o);
      }
    }
    if (this.AllMaterialSimpleControllers && this.AllMaterialSimpleControllers.size > 0) {
      for (const h of this.AllMaterialSimpleControllers.keys()) {
        this.AllMaterialSimpleControllers.get(h).UpdateParameters();
      }
    }
    RenderModuleConfig_1.RenderStats.StatItemMaterialManagerTick.Stop();
  }
  static AddMaterialData(t, e) {
    if (!t?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 32, "想要添加单体交互物材质控制器，但是传入的Actor是无效的", ["Actor", t]);
      }
      return -1;
    }
    if (!e?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 32, "想要添加单体交互物材质控制器，但是传入的Data是无效的", ["Actor", t]);
      }
      return -1;
    }
    if (!this.DataMap?.IsValid()) {
      this.DataMap = ActorSystem_1.ActorSystem.Get(UE.ItemMaterialDataMap_C.StaticClass(), UE.KismetMathLibrary.MakeTransformDouble(Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.ZeroVector));
      this.DataMap.Map = UE.NewMap(UE.BuiltinInt, UE.ItemMaterialControllerActorData_C);
    }
    this.IndexCount = this.IndexCount + 1;
    var r = this.IndexCount;
    if (this.DataMap.Map.Get(r)?.IsValid()) {
      return -1;
    } else {
      this.DataMap.Map.Add(r, e);
      this.AllActorControllerInfoMap.set(r, new ItemMaterialController_1.ItemMaterialActorController(t, e));
      return r;
    }
  }
  static DisableActorData(t) {
    return !!this.AllActorControllerInfoMap && !!this.AllActorControllerInfoMap.has(t) && !!this.AllActorControllerInfoMap.get(t) && !(this.AllActorControllerInfoMap.get(t).Stop(), 0);
  }
  static DisableAllActorData() {
    if (!this.AllActorControllerInfoMap) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 32, "不满足删除单体交互物材质控制器的条件，返回false", ["handle", -1]);
      }
      return false;
    }
    for (const t of this.AllActorControllerInfoMap.keys()) {
      this.AllActorControllerInfoMap.get(t).Stop();
      this.WaitList.push(t);
    }
    this.AllActorControllerInfoMap;
    if (this.DataMap?.IsValid()) {
      if (this.DataMap?.Map) {
        this.DataMap.Map.Empty();
      }
      this.IndexCount = -1;
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 32, "DataMap被UE清理");
      }
      return false;
    }
  }
  static AddSimpleMaterialController(t, e, r) {
    if (!t?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 32, "想要添加单体交互物材质控制器，但是传入的Actor是无效的", ["Actor", t]);
      }
      return -1;
    }
    let i = 0;
    for (const o of this.AllMaterialSimpleControllers.keys()) {
      const a = this.AllMaterialSimpleControllers.get(o);
      if (a.GetActor() === t) {
        i = o;
        a.ScalarParameterValue = e;
        a.VectorParameterValue = r;
        return i;
      }
    }
    this.IndexCountSimple = this.IndexCountSimple + 1;
    i = this.IndexCountSimple;
    const a = new ItemMaterialController_1.ItemMaterialSimpleController(t);
    a.ScalarParameterValue = e;
    a.VectorParameterValue = r;
    this.AllMaterialSimpleControllers.set(i, a);
    return i;
  }
  static DisableSimpleMaterialController(t) {
    return !!this.AllMaterialSimpleControllers && (this.AllMaterialSimpleControllers.delete(t), true);
  }
}
(exports.ItemMaterialManager = ItemMaterialManager).GlobalController = undefined;
ItemMaterialManager.ActorControllers = [];
ItemMaterialManager.AllGlobalControllerInfoMap = new Map();
ItemMaterialManager.AllActorControllerInfoMap = new Map();
ItemMaterialManager.AllMaterialSimpleControllers = new Map();
ItemMaterialManager.IndexCountGlobal = -1;
ItemMaterialManager.IndexCount = -1;
ItemMaterialManager.IndexCountSimple = -1;
ItemMaterialManager.RefErrorCount = 5;
ItemMaterialManager.DataMap = undefined;
ItemMaterialManager.IsInit = false;
ItemMaterialManager.WaitList = []; //# sourceMappingURL=ItemMaterialManager.js.map