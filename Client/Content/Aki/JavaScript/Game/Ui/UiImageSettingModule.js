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
  SetSpriteByPathSync(t, i, n, s, e = undefined, o = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(s)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Sprite改为异步加载", ["ViewName", s]);
        }
        this.SetSpriteByPathAsync(t, i, n, e, o);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Sprite接口", ["ViewName", s]);
        }
        let e = this.Qym(t);
        if ((e = e || ResourceSystem_1.ResourceSystem.Load(t, UE.LGUISpriteData_BaseObject, o)) && e.IsValid()) {
          i.SetSprite(e, n);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", t]);
        }
      }
    }
  }
  Kym(e, t, i, n, s = undefined) {
    if (t.IsValid()) {
      if (e && e.IsValid()) {
        t.SetSprite(e, i);
        s?.(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", n]);
        }
        s?.(false);
      }
    }
  }
  SetSpriteByPathAsync(e, i, n, s = undefined, t = "js_undefined") {
    var o;
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      if (o = this.Qym(e)) {
        this.Kym(o, i, n, e, s);
      } else {
        o = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          this.DeleteResourceHandle(i);
          this.Kym(e, i, n, t, s);
        }, 102, t);
        this.SetResourceId(i, o);
      }
    }
  }
  async SetSpriteAsync(e, i, n, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      var s = this.Qym(e);
      if (s) {
        this.Kym(s, i, n, e);
      } else {
        const o = new CustomPromise_1.CustomPromise();
        s = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          o.SetResult();
          this.DeleteResourceHandle(i);
          this.Kym(e, i, n, t);
        }, 102, t);
        this.SetResourceId(i, s);
        await o.Promise;
      }
    }
  }
  Xym(e, t, i = 5) {
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
      var s = this.Qym(e);
      if (s) {
        this.Xym(s, i, n);
      } else {
        const o = new CustomPromise_1.CustomPromise();
        s = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          o.SetResult();
          this.DeleteResourceHandle(i);
          this.Xym(e, i, n);
        }, 102, t);
        this.SetResourceId(i, s);
        await o.Promise;
      }
    }
  }
  Yym(e, t, i = 9) {
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
      var s = this.Qym(e);
      if (s) {
        this.Yym(s, i, n);
      } else {
        const o = new CustomPromise_1.CustomPromise();
        s = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
          o.SetResult();
          this.DeleteResourceHandle(i);
          this.Yym(e, i, n);
        }, 102, t);
        this.SetResourceId(i, s);
        await o.Promise;
      }
    }
  }
  SetItemQualityIconSync(e, t, i, n = "BackgroundSprite", s = undefined, o = "js_undefined") {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdSync(e, t.QualityId, i, n, s, o);
  }
  SetItemQualityIconAsync(e, t, i = "BackgroundSprite", n = undefined, s = "js_undefined") {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdAsync(e, t.QualityId, i, n, s);
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
  SetQualityIconByIdSync(e, t, i, n = "BackgroundSprite", s = undefined, o = "js_undefined") {
    t = this.lCr(e, t, n);
    this.SetSpriteByPathSync(t, e, false, i, s, o);
  }
  SetQualityIconByIdAsync(e, t, i = "BackgroundSprite", n = undefined, s = "js_undefined") {
    t = this.lCr(e, t, i);
    this.SetSpriteByPathAsync(t, e, false, n, s);
  }
  SetTextureByPathSync(e, t, i, n = undefined, s = "js_undefined") {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(i)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", i]);
        }
        this.SetTextureByPathAsync(e, t, n, s);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", i]);
        }
        n = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture, s);
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
      const s = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        s.SetResult();
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
      await s.Promise;
    }
  }
  async SetExtendToggleTextureTransitionByPath(e, i, n = 9, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const s = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        s.SetResult();
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
      await s.Promise;
    }
  }
  async SetExtendToggleTextureTransitionGroupByPath(e, i, n, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const s = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (t, e) => {
        s.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (n.includes(9)) {
            i.SetAllTransitionStateTexture(t);
          } else {
            n.forEach(e => {
              i.SetTargetStateTexture(e, t);
            });
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
      await s.Promise;
    }
  }
  async SetTextureCustomMaterialAsync(e, t, i = "js_undefined") {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      this.CancelResource(t);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInterface, e => {
        n.SetResult();
        this.DeleteResourceHandle(t);
        if (t.IsValid() && e && e.IsValid()) {
          t.SetCustomUIMaterial(e);
        }
      }, 100, i);
      this.SetResourceId(t, e);
      await n.Promise;
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
  SetItemIconSync(e, t, i, n = undefined, s = "js_undefined") {
    t = this._Cr(e, t);
    this.SetTextureByPathSync(t, e, i, n, s);
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
  SetRoleIconSync(e, t, i, n, s, o = "js_undefined") {
    e = this.uCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, s, o);
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
  SetRoleSkinIconAsync(e, t, i, n, s = "js_undefined") {
    e = this.vbl(e, t, i);
    this.SetTextureByPathAsync(e, t, n, s);
  }
  SetRoleSkinIconSync(e, t, i, n, s, o = "js_undefined") {
    e = this.vbl(e, t, i);
    this.SetTextureByPathSync(e, t, n, s, o);
  }
  SetRoleIconAsync(e, t, i, n, s = "js_undefined") {
    e = this.uCr(e, t, i);
    this.SetTextureByPathAsync(e, t, n, s);
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
  SetElementIconSync(e, t, i, n, s = "js_undefined") {
    e = this.cCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, s);
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
  SetMonsterIconSync(e, t, i, n, s = "js_undefined") {
    e = this.mCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, s);
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
  SetDungeonEntranceIconSync(e, t, i, n, s = "js_undefined") {
    e = this.dCr(e, t, i);
    this.SetTextureByPathSync(e, t, n, undefined, s);
  }
  SetDungeonEntranceIconAsync(e, t, i, n = "js_undefined") {
    e = this.dCr(e, t, i);
    this.SetTextureByPathAsync(e, t, undefined, n);
  }
  SetNiagaraTextureAsync(e, i, n, s, o, t = "js_undefined") {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetNiagaraEmitterCustomTexture(n, s, e);
            o?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
            }
            o?.(false);
          }
        }
      }, 102, t);
      this.SetResourceId(i, e);
    }
  }
  SetNiagaraTextureSync(e, t, i, n, s, o = undefined, a = "js_undefined") {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(s)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", s]);
        }
        this.SetNiagaraTextureAsync(e, t, i, n, o, a);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", s]);
        }
        o = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture, a);
        t.SetNiagaraEmitterCustomTexture(i, n, o);
      }
    }
  }
  Qym(e) {
    return UE.LGUIManagerActor.GetDynamicSpriteAtlasMgr(GlobalData_1.GlobalData.World)?.GetSpriteData(e);
  }
}
exports.UiImageSettingModule = UiImageSettingModule;
//# sourceMappingURL=UiImageSettingModule.js.map