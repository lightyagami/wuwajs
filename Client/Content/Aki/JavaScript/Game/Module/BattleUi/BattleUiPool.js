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
    for (const t of this.ActorList) {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.Clear", t);
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
    var t = UiLayer_1.UiLayer.WorldSpaceUiRootItem;
    if (!t?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "WorldSpaceUiRootItem为空");
      }
      return false;
    }
    this.XXe = t;
    t = UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool);
    if (!t?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "PoolRoot为空");
      }
      return false;
    }
    this.$Xe = t;
    t = UiLayer_1.UiLayer.UiRootItem;
    if (t?.IsValid()) {
      this.YXe = t;
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
    var t = [];
    for (const e of headStateConfigList) {
      t.push(this.e$e(e, this.XXe));
    }
    t.push(this.e$e(bossHeadStateConfig, this.$Xe));
    t.push(this.e$e(damageViewConfig, this.JXe));
    t.push(this.e$e(buffItemConfig, this.YXe));
    t.push(this.e$e(environmentItemConfig, this.YXe));
    await Promise.all(t);
    return true;
  }
  async e$e(e, i) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.ResourceId);
    var o = await this.QXe.LoadPrefabAsync(t, i);
    if (!o?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "预加载Actor失败", ["resourceId", e.ResourceId]);
      }
      return false;
    }
    o.RootComponent.SetUIActive(false);
    var t = new BattleUiPoolElement();
    t.ExistMulti = e.PreloadCount > 0;
    var r = new Array();
    r.push(o);
    for (let t = 0; t < e.PreloadCount; t++) {
      var a = LguiUtil_1.LguiUtil.DuplicateActor(o, i);
      r.push(a);
    }
    t.ActorList = r;
    t.Actor = o;
    this.WXe.set(e.ResourceId, t);
    return true;
  }
  GetActor(t, e, i) {
    var o;
    var r = this.WXe.get(t);
    if (r && !(r.ActorList.length <= 0)) {
      if (r.ExistMulti) {
        if (r.ActorList.length > 1) {
          o = r.ActorList.pop();
          if (i) {
            o.K2_AttachRootComponentTo(e);
          }
          return o;
        } else {
          return LguiUtil_1.LguiUtil.DuplicateActor(r.ActorList[0], e);
        }
      } else if (o = r.ActorList.pop()) {
        if (i) {
          o.K2_AttachRootComponentTo(e);
        }
        return o;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "BattleUiPool重复获取单一预制体", ["resourceId", t]);
        }
        return;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", t]);
    }
  }
  RecycleActor(t, e, i = false) {
    var o = this.WXe.get(t);
    if (o) {
      e.RootComponent.SetUIActive(false);
      if (i) {
        e.K2_AttachRootComponentTo(this.$Xe);
      }
      if (o.ExistMulti) {
        o.ActorList.push(e);
        return true;
      } else if (o.Actor !== e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "BattleUiPool Recycle单一预制体时，传进来的Actor不是缓存的Actor", ["resourceId", t]);
        }
        if (e.IsValid()) {
          UE.LGUIBPLibrary.DestroyActorWithHierarchy(e, true);
        }
        return false;
      } else if (o.ActorList.length !== 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "BattleUiPool重复Recycle单一预制体", ["resourceId", t]);
        }
        return false;
      } else {
        o.ActorList.push(e);
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", t]);
      }
      return false;
    }
  }
  GetSrcActor(t) {
    var e = this.WXe.get(t);
    if (e?.Actor) {
      return e.Actor;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "BattleUiPool没有缓存该预制体", ["resourceId", t]);
    }
  }
  GetHeadStateView(t) {
    return this.GetActor(t, this.XXe, false);
  }
  RecycleHeadStateView(t, e, i = false) {
    return !this.tZ || this.RecycleActor(t, e, i);
  }
  GetDamageView() {
    return this.GetActor(damageViewConfig.ResourceId, this.JXe, false);
  }
  RecycleDamageView(t) {
    if (this.tZ) {
      return this.RecycleActor(damageViewConfig.ResourceId, t);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleDamageView", t);
      return true;
    }
  }
  GetBuffItem(t) {
    return this.GetActor(buffItemConfig.ResourceId, t, true);
  }
  RecycleBuffItem(t) {
    if (this.tZ) {
      return this.RecycleActor(buffItemConfig.ResourceId, t, true);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleBuffItem", t);
      return true;
    }
  }
  GetEnvironmentItem(t) {
    return this.GetActor(environmentItemConfig.ResourceId, t, true);
  }
  RecycleEnvironmentItem(t) {
    if (this.tZ) {
      return this.RecycleActor(environmentItemConfig.ResourceId, t, true);
    } else {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleEnvironmentItem", t);
      return true;
    }
  }
  async LoadActor(t, e) {
    var i;
    var o = undefined;
    let r = this.WXe.get(t);
    if (r) {
      return this.t$e(r, e);
    } else if ((o = await this.QXe.LoadPrefabAsync(t, this.$Xe))?.IsValid()) {
      if (r = this.WXe.get(t)) {
        ActorSystem_1.ActorSystem.Put("BattleUiPool.LoadActor", o);
      } else {
        r = new BattleUiPoolElement();
        this.WXe.set(t, r);
        (i = new Array()).push(o);
        r.ActorList = i;
        r.Actor = o;
        this.WXe.set(t, r);
      }
      return this.t$e(r, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "加载Actor失败", ["", t]);
      }
      return;
    }
  }
  t$e(t, e) {
    var i;
    if (t.ActorList.length > 1) {
      (i = t.ActorList.pop()).K2_AttachRootComponentTo(e);
      return i;
    } else {
      return LguiUtil_1.LguiUtil.DuplicateActor(t.Actor, e);
    }
  }
  RecycleActorByPath(t, e, i = false) {
    if (this.tZ) {
      if (t = this.WXe.get(t)) {
        t.ActorList.push(e);
        e.RootComponent.SetUIActive(false);
        if (i) {
          e.K2_AttachRootComponentTo(this.$Xe);
        }
      } else {
        ActorSystem_1.ActorSystem.Put("BattleUiPool.RecycleActorByPath", e);
      }
    }
    return true;
  }
  async LoadSingleActorByPath(t, e) {
    let i = this.KXe.get(t);
    if (i) {
      i.K2_AttachRootComponentTo(e);
      return i;
    } else if ((i = await this.QXe.LoadPrefabAsync(t, e))?.IsValid()) {
      this.KXe.set(t, i);
      return i;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "加载Actor失败", ["", t]);
      }
      return;
    }
  }
  RecycleSingleActor(t, e = false) {
    if (this.tZ && (t.RootComponent.SetUIActive(false), e)) {
      t.K2_AttachRootComponentTo(this.$Xe);
    }
    return true;
  }
  async PreloadSingleActorByPath(t, e) {
    t = await this.LoadSingleActorByPath(t, e);
    if (t) {
      this.RecycleSingleActor(t);
    }
    return true;
  }
  Clear() {
    this.QXe.Clear();
    for (const t of this.WXe.values()) {
      t.Clear();
    }
    this.WXe.clear();
    for (const e of this.KXe.values()) {
      ActorSystem_1.ActorSystem.Put("BattleUiPool.Clear", e);
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