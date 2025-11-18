"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiImageSettingModule = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const UiConfig_1 = require("./Define/UiConfig");
const UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiImageSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  SetSpriteByPathSync(t, i, n, o, e = undefined, s = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(o)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Sprite改为异步加载", ["ViewName", o]);
        }
        this.SetSpriteByPathAsync(t, i, n, e, s);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Sprite接口", ["ViewName", o]);
        }
        let e = this.Ffm(t);
        if ((e = e || ResourceSystem_1.ResourceSystem.Load(t, UE.LGUISpriteData_BaseObject, s)) && e.IsValid()) {
          i.SetSprite(e, n);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", t]);
        }
      }
    }
  }
  Nfm(e, t, i, n, o = undefined) {
    if (t.IsValid()) {
      if (e && e.IsValid()) {
        t.SetSprite(e, i);
        o?.(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", n]);
        }
        o?.(false);
      }
    }
  }
  SetSpriteByPathAsync(e, i, n, o = undefined, t = "js_undefined") {
    var s;
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      if (s = this.Ffm(e)) {
        this.Nfm(s, i, n, e, o);
      } else {
        s = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          this.DeleteResourceHandle(i);
          this.Nfm(e, i, n, t, o);
        }, 102, t);
        this.SetResourceId(i, s);
      }
    }
  }
  async SetSpriteAsync(e, i, n, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      var o = this.Ffm(e);
      if (o) {
        this.Nfm(o, i, n, e);
      } else {
        const s = new CustomPromise_1.CustomPromise();
        o = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          s.SetResult();
          this.DeleteResourceHandle(i);
          this.Nfm(e, i, n, t);
        }, 102, t);
        this.SetResourceId(i, o);
        await s.Promise;
      }
    }
  }
  Vfm(e, t, i = 5) {
    if (t.IsValid()) {
      if (i === 5) {
        t.SetAllTransitionSprite(e);
      } else {
        t.SetStateSprite(i, e);
      }
    }
  }
  async SetSpriteTransitionByPath(e, i, n = 5, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      var o = this.Ffm(e);
      if (o) {
        this.Vfm(o, i, n);
      } else {
        const s = new CustomPromise_1.CustomPromise();
        o = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          s.SetResult();
          this.DeleteResourceHandle(i);
          this.Vfm(e, i, n);
        }, 102, t);
        this.SetResourceId(i, o);
        await s.Promise;
      }
    }
  }
  jfm(e, t, i = 9) {
    if (t.IsValid()) {
      if (i === 9) {
        t.SetAllStateSprite(e);
      } else {
        t.SetStateSprite(i, e);
      }
    }
  }
  async SetExtendToggleSpriteTransitionByPath(e, i, n = 9, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      var o = this.Ffm(e);
      if (o) {
        this.jfm(o, i, n);
      } else {
        const s = new CustomPromise_1.CustomPromise();
        o = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          s.SetResult();
          this.DeleteResourceHandle(i);
          this.jfm(e, i, n);
        }, 102, t);
        this.SetResourceId(i, o);
        await s.Promise;
      }
    }
  }
  SetItemQualityIconSync(e, t, i, n = "BackgroundSprite", o = undefined, s = "js_undefined") {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdSync(e, t.QualityId, i, n, o, s);
  }
  SetItemQualityIconAsync(e, t, i = "BackgroundSprite", n = undefined, o = "js_undefined") {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdAsync(e, t.QualityId, i, n, o);
  }
  lCr(e, t, i) {
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t);
    var e = e.ComponentTags;
    if (e.Num() === 0) {
      return t[i];
    } else {
      i = e.Get(0).toString();
      if (typeof t[e = ConfigManager_1.ConfigManager.ComponentConfig.GetQualityConfigParam(i)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", i]);
        }
        return "";
      } else {
        return t[e];
      }
    }
  }
  SetQualityIconByIdSync(e, t, i, n = "BackgroundSprite", o = undefined, s = "js_undefined") {
    t = this.lCr(e, t, n);
    this.SetSpriteByPathSync(t, e, false, i, o, s);
  }
  SetQualityIconByIdAsync(e, t, i = "BackgroundSprite", n = undefined, o = "js_undefined") {
    t = this.lCr(e, t, i);
    this.SetSpriteByPathAsync(t, e, false, n, o);
  }
  SetTextureByPathSync(e, t, i, n = undefined, o = "js_undefined") {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(i)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", i]);
        }
        this.SetTextureByPathAsync(e, t, n, o);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", i]);
        }
        n = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture, o);
        t.SetTexture(n);
      }
    }
  }
  SetTextureByPathAsync(e, i, n = undefined, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetTexture(e);
            n?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
            }
            n?.(false);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
    }
  }
  async SetTextureAsync(e, i, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetTexture(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
      await n.Promise;
    }
  }
  async SetTextureTransitionByPath(e, i, n = 5, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const o = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        o.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (n === 5) {
            i.SetAllStateTexture(e);
          } else {
            i.SetStateTexture(n, e);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
      await o.Promise;
    }
  }
  async SetExtendToggleTextureTransitionByPath(e, i, n = 9, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const o = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        o.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (n === 9) {
            i.SetAllTransitionStateTexture(e);
          } else {
            i.SetTargetStateTexture(n, e);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
      await o.Promise;
    }
  }
  _Cr(e, t) {
    var i;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    var e = e.ComponentTags;
    if (e.Num() === 0) {
      return t.Icon;
    } else {
      e = e.Get(0).toString();
      if (typeof t[i = ConfigManager_1.ConfigManager.ComponentConfig.GetItemConfigParam(e)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", e]);
        }
        return "";
      } else {
        return t[i];
      }
    }
  }
  SetItemIconSync(e, t, i, n = undefined, o = "js_undefined") {
    t = this._Cr(e, t);
    this.SetTextureByPathSync(t, e, i, n, o);
  }
  SetItemIconAsync(e, t, i = undefined, n = "js_undefined") {
    t = this._Cr(e, t);
    this.SetTextureByPathAsync(t, e, i, n);
  }
  async SetItemIconTextureAsync(e, t, i = "js_undefined") {
    t = this._Cr(e, t);
    await this.SetTextureAsync(t, e, i);
  }
  uCr(e, t, i) {
    var t = t.ComponentTags;
    if (t.Num() === 0) {
      return e;
    } else {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
      i = t.Get(0).toString();
      if (typeof e[t = ConfigManager_1.ConfigManager.ComponentConfig.GetRoleConfigParam(i)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", i]);
        }
        return "";
      } else {
        return e[t];
      }
    }
  }
  SetRoleIconSync(e, t, i, n, o, s = "js_undefined") {
    e = this.uCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, o, s);
  }
  vbl(e, t, i) {
    var t = t.ComponentTags;
    if (t.Num() === 0 || (i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i)) === undefined) {
      return e;
    } else {
      e = t.Get(0).toString();
      if (typeof i[t = ConfigManager_1.ConfigManager.ComponentConfig.GetRoleSkinConfigParam(e)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", e]);
        }
        return "";
      } else {
        return i[t];
      }
    }
  }
  SetRoleSkinIconAsync(e, t, i, n, o = "js_undefined") {
    e = this.vbl(e, t, i);
    this.SetTextureByPathAsync(e, t, n, o);
  }
  SetRoleSkinIconSync(e, t, i, n, o, s = "js_undefined") {
    e = this.vbl(e, t, i);
    this.SetTextureByPathSync(e, t, n, o, s);
  }
  SetRoleIconAsync(e, t, i, n, o = "js_undefined") {
    e = this.uCr(e, t, i);
    this.SetTextureByPathAsync(e, t, n, o);
  }
  cCr(e, t, i) {
    var t = t.ComponentTags;
    if (t.Num() === 0) {
      return e;
    } else {
      e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(i);
      i = t.Get(0).toString();
      if (typeof e[t = ConfigManager_1.ConfigManager.ComponentConfig.GetElementConfigParam(i)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", i]);
        }
        return "";
      } else {
        return e[t];
      }
    }
  }
  SetElementIconSync(e, t, i, n, o = "js_undefined") {
    e = this.cCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, o);
  }
  SetElementIcon(e, t, i, n = "js_undefined") {
    e = this.cCr(e, t, i);
    this.SetTextureByPathAsync(e, t, undefined, n);
  }
  mCr(e, t, i) {
    var n;
    var t = t.ComponentTags;
    if (t.Num() !== 0 && i) {
      i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(i);
      t = t.Get(0).toString();
      if (typeof i[n = ConfigManager_1.ConfigManager.ComponentConfig.GetMonsterConfigParam(t)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LguiUtil", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", t]);
        }
        return "";
      } else {
        return i[n];
      }
    } else {
      return e;
    }
  }
  SetMonsterIconSync(e, t, i, n, o = "js_undefined") {
    e = this.mCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, o);
  }
  SetMonsterIconAsync(e, t, i, n = "js_undefined") {
    e = this.mCr(e, t, i);
    this.SetTextureByPathAsync(e, t, undefined, n);
  }
  dCr(e, t, i) {
    var n;
    var t = t.ComponentTags;
    if (t.Num() !== 0 && i) {
      i = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(i);
      t = t.Get(0).toString();
      if (typeof i[n = ConfigManager_1.ConfigManager.ComponentConfig.GetDungeonEntranceConfigParam(t)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LguiUtil", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", t]);
        }
        return "";
      } else {
        return i[n];
      }
    } else {
      return e;
    }
  }
  SetDungeonEntranceIconSync(e, t, i, n, o = "js_undefined") {
    e = this.dCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, o);
  }
  SetDungeonEntranceIconAsync(e, t, i, n = "js_undefined") {
    e = this.dCr(e, t, i);
    this.SetTextureByPathAsync(e, t, undefined, n);
  }
  SetNiagaraTextureAsync(e, i, n, o, s, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetNiagaraEmitterCustomTexture(n, o, e);
            s?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
            }
            s?.(false);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
    }
  }
  SetNiagaraTextureSync(e, t, i, n, o, s = undefined, a = "js_undefined") {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(o)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", o]);
        }
        this.SetNiagaraTextureAsync(e, t, i, n, s, a);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", o]);
        }
        s = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture, a);
        t.SetNiagaraEmitterCustomTexture(i, n, s);
      }
    }
  }
  Ffm(e) {
    return UE.LGUIManagerActor.GetDynamicSpriteAtlasMgr(GlobalData_1.GlobalData.World)?.GetSpriteData(e);
  }
}
exports.UiImageSettingModule = UiImageSettingModule;
//# sourceMappingURL=UiImageSettingModule.js.map