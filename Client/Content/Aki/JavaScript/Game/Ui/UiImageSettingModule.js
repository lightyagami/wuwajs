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
  SetSpriteByPathSync(e, t, i, o, n = undefined) {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(o)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Sprite改为异步加载", ["ViewName", o]);
        }
        this.SetSpriteByPathAsync(e, t, i, n);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Sprite接口", ["ViewName", o]);
        }
        n = ResourceSystem_1.ResourceSystem.Load(e, UE.LGUISpriteData_BaseObject);
        t.SetSprite(n, i);
      }
    }
  }
  SetSpriteByPathAsync(e, i, o, n = undefined) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetSprite(e, o);
            n?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", t]);
            }
            n?.(false);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
    }
  }
  async SetSpriteAsync(e, i, o) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetSprite(e, o);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiImageSetting", 10, "设置Sprite失败，图片加载失败", ["图片路径", t]);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
      await n.Promise;
    }
  }
  async SetSpriteTransitionByPath(e, i, o = 5) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (o === 5) {
            i.SetAllTransitionSprite(e);
          } else {
            i.SetStateSprite(o, e);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
      await n.Promise;
    }
  }
  async SetExtendToggleSpriteTransitionByPath(e, i, o = 9) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (o === 9) {
            i.SetAllStateSprite(e);
          } else {
            i.SetStateSprite(o, e);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
      await n.Promise;
    }
  }
  SetItemQualityIconSync(e, t, i, o = "BackgroundSprite", n = undefined) {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdSync(e, t.QualityId, i, o, n);
  }
  SetItemQualityIconAsync(e, t, i = "BackgroundSprite", o = undefined) {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdAsync(e, t.QualityId, i, o);
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
  SetQualityIconByIdSync(e, t, i, o = "BackgroundSprite", n = undefined) {
    t = this.lCr(e, t, o);
    this.SetSpriteByPathSync(t, e, false, i, n);
  }
  SetQualityIconByIdAsync(e, t, i = "BackgroundSprite", o = undefined) {
    t = this.lCr(e, t, i);
    this.SetSpriteByPathAsync(t, e, false, o);
  }
  SetTextureByPathSync(e, t, i, o = undefined) {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(i)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", i]);
        }
        this.SetTextureByPathAsync(e, t, o);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", i]);
        }
        o = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture);
        t.SetTexture(o);
      }
    }
  }
  SetTextureByPathAsync(e, i, o = undefined) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetTexture(e);
            o?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
            }
            o?.(false);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
    }
  }
  async SetTextureAsync(e, i) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const o = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        o.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetTexture(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
      await o.Promise;
    }
  }
  async SetTextureTransitionByPath(e, i, o = 5) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (o === 5) {
            i.SetAllStateTexture(e);
          } else {
            i.SetStateTexture(o, e);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
      await n.Promise;
    }
  }
  async SetExtendToggleTextureTransitionByPath(e, i, o = 9) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        n.SetResult();
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (o === 9) {
            i.SetAllTransitionStateTexture(e);
          } else {
            i.SetTargetStateTexture(o, e);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
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
  SetItemIconSync(e, t, i, o = undefined) {
    t = this._Cr(e, t);
    this.SetTextureByPathSync(t, e, i, o);
  }
  SetItemIconAsync(e, t, i = undefined) {
    t = this._Cr(e, t);
    this.SetTextureByPathAsync(t, e, i);
  }
  async SetItemIconTextureAsync(e, t) {
    t = this._Cr(e, t);
    await this.SetTextureAsync(t, e);
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
  SetRoleIconSync(e, t, i, o, n) {
    e = this.uCr(e, t, i);
    this.SetTextureByPathSync(e, t, o, n);
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
  SetRoleSkinIconAsync(e, t, i, o) {
    e = this.vbl(e, t, i);
    this.SetTextureByPathAsync(e, t, o);
  }
  SetRoleSkinIconSync(e, t, i, o, n) {
    e = this.vbl(e, t, i);
    this.SetTextureByPathSync(e, t, o, n);
  }
  SetRoleIconAsync(e, t, i, o) {
    e = this.uCr(e, t, i);
    this.SetTextureByPathAsync(e, t, o);
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
  SetElementIconSync(e, t, i, o) {
    e = this.cCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetElementIcon(e, t, i) {
    e = this.cCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  mCr(e, t, i) {
    var o;
    var t = t.ComponentTags;
    if (t.Num() !== 0 && i) {
      i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(i);
      t = t.Get(0).toString();
      if (typeof i[o = ConfigManager_1.ConfigManager.ComponentConfig.GetMonsterConfigParam(t)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LguiUtil", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", t]);
        }
        return "";
      } else {
        return i[o];
      }
    } else {
      return e;
    }
  }
  SetMonsterIconSync(e, t, i, o) {
    e = this.mCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetMonsterIconAsync(e, t, i) {
    e = this.mCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  dCr(e, t, i) {
    var o;
    var t = t.ComponentTags;
    if (t.Num() !== 0 && i) {
      i = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(i);
      t = t.Get(0).toString();
      if (typeof i[o = ConfigManager_1.ConfigManager.ComponentConfig.GetDungeonEntranceConfigParam(t)] != "string") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LguiUtil", 10, "配置的表格字段查询到的资源路径不是字符串类型", ["配置的表格字段", t]);
        }
        return "";
      } else {
        return i[o];
      }
    } else {
      return e;
    }
  }
  SetDungeonEntranceIconSync(e, t, i, o) {
    e = this.dCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetDungeonEntranceIconAsync(e, t, i) {
    e = this.dCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  SetNiagaraTextureAsync(e, i, o, n, a) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      e = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, t) => {
        this.DeleteResourceHandle(i);
        if (i.IsValid()) {
          if (e && e.IsValid()) {
            i.SetNiagaraEmitterCustomTexture(o, n, e);
            a?.(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiImageSetting", 10, "设置Texture失败，图片加载失败", ["图片路径", t]);
            }
            a?.(false);
          }
        }
      }, 102);
      this.SetResourceId(i, e);
    }
  }
  SetNiagaraTextureSync(e, t, i, o, n, a = undefined) {
    if (GlobalData_1.GlobalData.World && t && t.IsValid()) {
      if (UiConfig_1.UiConfig.TryGetViewInfo(n)?.LoadAsync) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiImageSetting", 10, "该界面不允许同步加载,Texture改为异步加载", ["ViewName", n]);
        }
        this.SetNiagaraTextureAsync(e, t, i, o, a);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiImageSetting", 10, "同步设置Texture接口", ["ViewName", n]);
        }
        a = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture);
        t.SetNiagaraEmitterCustomTexture(i, o, a);
      }
    }
  }
}
exports.UiImageSettingModule = UiImageSettingModule;
//# sourceMappingURL=UiImageSettingModule.js.map