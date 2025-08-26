"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiPool = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiPrefabLoadModule_1 = require("../../Ui/UiPrefabLoadModule");
const LguiUtil_1 = require("../Util/LguiUtil");
const headStateConfigList = [{
  ResourceId: "UiItem_LittleMonsterState_Prefab",
  PreloadCount: 6
}, {
  ResourceId: "UiItem_MingsutiState_Prefab",
  PreloadCount: 1
}, {
  ResourceId: "UiItem_GuardianState_Prefab",
  PreloadCount: 1
}, {
  ResourceId: "UiItem_EliteMonsterState_Prefab",
  PreloadCount: 4
}, {
  ResourceId: "UiItem_DestructionState_Prefab",
  PreloadCount: 1
}];
const bossHeadStateConfig = {
  ResourceId: "UiItem_BossState_Prefab",
  PreloadCount: 0
};
const damageViewConfig = {
  ResourceId: "UiItem_DamageView_Prefab",
  PreloadCount: 21
};
const simpleDamageViewConfig = {
  ResourceId: "UiItem_DamageView_Sim_Prefab",
  PreloadCount: 40
};
const buffItemConfig = {
  ResourceId: "UiItem_BuffItem_Prefab",
  PreloadCount: 5
};
const environmentItemConfig = {
  ResourceId: "UiItem_BuffEnvironmentItem_Prefab",
  PreloadCount: 5
};
class BattleUiPoolElement {
  constructor() {
    this.ActorList = undefined;
    this.ExistMulti = true;
    this.Actor = undefined;
  }
  Clear() {
    for (const e of this.ActorList) {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.Clear", e);
    }
    this.ActorList.length = 0;
    this.Actor = undefined;
  }
}
class BattleUiPool {
  constructor() {
    this.WXe = new Map();
    this.KXe = new Map();
    this.QXe = new UiPrefabLoadModule_1.UiPrefabLoadModule();
    this.tZ = false;
    this.XXe = undefined;
    this.$Xe = undefined;
    this.YXe = undefined;
    this.JXe = undefined;
  }
  async Init() {
    if (!this.tZ) {
      if (!this.zXe()) {
        return false;
      }
      await this.ZXe();
      this.tZ = true;
    }
    return true;
  }
  zXe() {
    var e = UiLayer_1.UiLayer.WorldSpaceUiRootItem;
    if (!e?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "WorldSpaceUiRootItem为空");
      }
      return false;
    }
    this.XXe = e;
    e = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    if (!e?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "PoolRoot为空");
      }
      return false;
    }
    this.$Xe = e;
    e = UiLayer_1.UiLayer.UiRootItem;
    if (e?.IsValid()) {
      this.YXe = e;
      this.JXe = UiLayer_1.UiLayer.GetBattleViewUnit(0);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "UiRootItem为空");
      }
      return false;
    }
  }
  async ZXe() {
    var e = [];
    for (const t of headStateConfigList) {
      e.push(this.e$e(t, this.XXe));
    }
    e.push(this.e$e(bossHeadStateConfig, this.$Xe));
    e.push(this.e$e(damageViewConfig, this.JXe));
    e.push(this.e$e(simpleDamageViewConfig, this.JXe));
    e.push(this.e$e(buffItemConfig, this.YXe));
    e.push(this.e$e(environmentItemConfig, this.YXe));
    await Promise.all(e);
    return true;
  }
  async e$e(t, i) {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t.ResourceId);
    var o = await this.QXe.LoadPrefabAsync(e, i);
    if (!o?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "预加载Actor失败", ["resourceId", t.ResourceId]);
      }
      return false;
    }
    o.RootComponent.SetUIActive(false);
    var e = new BattleUiPoolElement();
    e.ExistMulti = t.PreloadCount > 0;
    var r = new Array();
    r.push(o);
    for (let e = 0; e < t.PreloadCount; e++) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(o, i);
      r.push(a);
    }
    e.ActorList = r;
    e.Actor = o;
    this.WXe.set(t.ResourceId, e);
    return true;
  }
  GetActor(e, t, i) {
    var o;
    var r = this.WXe.get(e);
    if (r && !(r.ActorList.length <= 0)) {
      if (r.ExistMulti) {
        if (r.ActorList.length > 1) {
          o = r.ActorList.pop();
          if (i) {
            o.K2_AttachRootComponentTo(t);
          }
          return o;
        } else {
          return LguiUtil_1.LguiUtil.DuplicateActor(r.ActorList[0], t);
        }
      } else if (o = r.ActorList.pop()) {
        if (i) {
          o.K2_AttachRootComponentTo(t);
        }
        return o;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "BattleUiPool重复获取单一预制体", ["resourceId", e]);
        }
        return;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", e]);
    }
  }
  RecycleActor(e, t, i = false) {
    var o = this.WXe.get(e);
    if (o) {
      t.RootComponent.SetUIActive(false);
      if (i) {
        t.K2_AttachRootComponentTo(this.$Xe);
      }
      if (o.ExistMulti) {
        o.ActorList.push(t);
        return true;
      } else if (o.Actor !== t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "BattleUiPool Recycle单一预制体时，传进来的Actor不是缓存的Actor", ["resourceId", e]);
        }
        if (t.IsValid()) {
          UE.LGUIBPLibrary.DestroyActorWithHierarchy(t, true);
        }
        return false;
      } else if (o.ActorList.length !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "BattleUiPool重复Recycle单一预制体", ["resourceId", e]);
        }
        return false;
      } else {
        o.ActorList.push(t);
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", e]);
      }
      return false;
    }
  }
  GetSrcActor(e) {
    var t = this.WXe.get(e);
    if (t?.Actor) {
      return t.Actor;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", e]);
    }
  }
  GetHeadStateView(e) {
    return this.GetActor(e, this.XXe, false);
  }
  RecycleHeadStateView(e, t, i = false) {
    return !this.tZ || this.RecycleActor(e, t, i);
  }
  GetDamageView() {
    return this.GetActor(damageViewConfig.ResourceId, this.JXe, false);
  }
  RecycleDamageView(e) {
    if (this.tZ) {
      return this.RecycleActor(damageViewConfig.ResourceId, e);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleDamageView", e);
      return true;
    }
  }
  GetSimpleDamageView() {
    return this.GetActor(simpleDamageViewConfig.ResourceId, this.JXe, false);
  }
  RecycleSimpleDamageView(e) {
    if (this.tZ) {
      return this.RecycleActor(simpleDamageViewConfig.ResourceId, e);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleSimpleDamageView", e);
      return true;
    }
  }
  GetBuffItem(e) {
    return this.GetActor(buffItemConfig.ResourceId, e, true);
  }
  RecycleBuffItem(e) {
    if (this.tZ) {
      return this.RecycleActor(buffItemConfig.ResourceId, e, true);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleBuffItem", e);
      return true;
    }
  }
  GetEnvironmentItem(e) {
    return this.GetActor(environmentItemConfig.ResourceId, e, true);
  }
  RecycleEnvironmentItem(e) {
    if (this.tZ) {
      return this.RecycleActor(environmentItemConfig.ResourceId, e, true);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleEnvironmentItem", e);
      return true;
    }
  }
  async LoadActor(e, t) {
    var i;
    var o = undefined;
    let r = this.WXe.get(e);
    if (r) {
      return this.t$e(r, t);
    } else if ((o = await this.QXe.LoadPrefabAsync(e, this.$Xe))?.IsValid()) {
      if (r = this.WXe.get(e)) {
        ActorSystem_1.ActorSystem.Put("BattleUiPool.LoadActor", o);
      } else {
        r = new BattleUiPoolElement();
        this.WXe.set(e, r);
        (i = new Array()).push(o);
        r.ActorList = i;
        r.Actor = o;
        this.WXe.set(e, r);
      }
      return this.t$e(r, t);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "加载Actor失败", ["", e]);
      }
      return;
    }
  }
  t$e(e, t) {
    var i;
    if (e.ActorList.length > 1) {
      (i = e.ActorList.pop()).K2_AttachRootComponentTo(t);
      return i;
    } else {
      return LguiUtil_1.LguiUtil.DuplicateActor(e.Actor, t);
    }
  }
  RecycleActorByPath(e, t, i = false) {
    if (this.tZ) {
      if (e = this.WXe.get(e)) {
        e.ActorList.push(t);
        t.RootComponent.SetUIActive(false);
        if (i) {
          t.K2_AttachRootComponentTo(this.$Xe);
        }
      } else {
        ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleActorByPath", t);
      }
    }
    return true;
  }
  async LoadSingleActorByPath(e, t) {
    let i = this.KXe.get(e);
    if (i) {
      i.K2_AttachRootComponentTo(t);
      return i;
    } else if ((i = await this.QXe.LoadPrefabAsync(e, t))?.IsValid()) {
      this.KXe.set(e, i);
      return i;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "加载Actor失败", ["", e]);
      }
      return;
    }
  }
  RecycleSingleActor(e, t = false) {
    if (this.tZ && (e.RootComponent.SetUIActive(false), t)) {
      e.K2_AttachRootComponentTo(this.$Xe);
    }
    return true;
  }
  async PreloadSingleActorByPath(e, t) {
    e = await this.LoadSingleActorByPath(e, t);
    if (e) {
      this.RecycleSingleActor(e);
    }
    return true;
  }
  Clear() {
    this.QXe.Clear();
    for (const e of this.WXe.values()) {
      e.Clear();
    }
    this.WXe.clear();
    for (const t of this.KXe.values()) {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.Clear", t);
    }
    this.KXe.clear();
    this.tZ = false;
    this.XXe = undefined;
    this.$Xe = undefined;
    this.YXe = undefined;
  }
}
exports.BattleUiPool = BattleUiPool;
//# sourceMappingURL=BattleUiPool.js.map