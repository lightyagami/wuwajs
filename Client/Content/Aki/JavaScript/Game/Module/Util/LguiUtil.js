"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiUtil = exports.TableTextArgNew = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../GlobalData");
const InputKeyUtils_1 = require("../../InputSettings/InputKeyUtils");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const PC_KEY_ID = "PcKeyId=";
const GAMEPAD_KEY_ID = "GamepadKeyId=";
const ACTION_ID_KEY = "ActionId=";
const SKILL_ID_KEY = "SkillId=";
const ROLE_ID_KEY = "RoleId=";
const EXPLORE_ID_KEY = "ExploreId=";
const PHANTOM_ID_KEY = "PhantomId=";
const ICON_ID_KEY = "IconId=";
const PC_KEY_ID_MATCH = PC_KEY_ID + "[0-9]+";
const GAMEPAD_KEY_ID_MATCH = GAMEPAD_KEY_ID + "[0-9]+";
const ACTION_ID_MATCH = ACTION_ID_KEY + "[0-9]+";
const SKILL_ID_MATCH = SKILL_ID_KEY + "[0-9]+";
const ROLE_ID_MATCH = ROLE_ID_KEY + "[0-9]+";
const EXPLORE_ID_MATCH = EXPLORE_ID_KEY + "[0-9]+";
const PHANTOM_ID_MATCH = PHANTOM_ID_KEY + "[0-9]+";
const ICON_ID_MATCH = ICON_ID_KEY + "[0-9]+";
const pcKeyFormatRegex = new RegExp(`{<${PC_KEY_ID_MATCH}>}`, "g");
const gamepadFormatRegex = new RegExp(`{<${GAMEPAD_KEY_ID_MATCH}>}`, "g");
const actionFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}>}`, "g");
const skillFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}><${SKILL_ID_MATCH}>}`, "g");
const dtSkillFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}><${ROLE_ID_MATCH}><${SKILL_ID_MATCH}>}`, "g");
const exploreFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}><${EXPLORE_ID_MATCH}>}`, "g");
const phantomFormatRegex = new RegExp(`{<${ACTION_ID_MATCH}><${PHANTOM_ID_MATCH}>}`, "g");
const iconFormatRegex = new RegExp(`{<${ICON_ID_MATCH}>}`, "g");
const pcKeyIdFormatRegex = new RegExp("" + PC_KEY_ID_MATCH, "g");
const gamepadIdFormatRegex = new RegExp("" + GAMEPAD_KEY_ID_MATCH, "g");
const actionIdFormatRegex = new RegExp("" + ACTION_ID_MATCH, "g");
const skillIdFormatRegex = new RegExp("" + SKILL_ID_MATCH, "g");
const exploreIdFormatRegex = new RegExp("" + EXPLORE_ID_MATCH, "g");
const phantomIdFormatRegex = new RegExp("" + PHANTOM_ID_MATCH, "g");
const iconIdFormatRegex = new RegExp("" + ICON_ID_MATCH, "g");
class TableTextArgNew {
  constructor(t, ...e) {
    this.TextKey = t;
    this.Params = e;
  }
}
exports.TableTextArgNew = TableTextArgNew;
class LguiUtil {
  static async LoadPrefabByResourceIdAsync(t, e, r = GlobalData_1.GlobalData.World, i = 100, o = "js_undefined") {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return LguiUtil.LoadPrefabByAsync(t, e, r, i, o);
  }
  static async LoadPrefabByAsync(t, r, i = GlobalData_1.GlobalData.World, e = 100, o = "js_undefined") {
    const a = LguiUtil.GetRootActorMemoryTag(r, o);
    const _ = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PrefabAsset, (t, e) => {
      t = UE.LGUIBPLibrary.LoadPrefabWithAsset(i, t, r);
      LguiUtil.SetRootActorMemoryTag(t, a);
      _.SetResult(t);
    }, e, a);
    return _.Promise;
  }
  static CopyItem(t, e) {
    return this.DuplicateActor(t.GetOwner(), e).GetComponentByClass(UE.UIItem.StaticClass());
  }
  static DuplicateActor(t, e) {
    var r;
    var i;
    if (Stats_1.Stat.Enable) {
      (r = Stats_1.Stat.CreateNoFlameGraph("LGUI DuplicateActor " + LguiUtil.GetActorFullPath(t))).Start();
      i = UE.LGUIBPLibrary.DuplicateActor(t, e);
      r.Stop();
      return i;
    } else {
      return UE.LGUIBPLibrary.DuplicateActor(t, e);
    }
  }
  static SetLocalText(t, e, ...r) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(e);
    this.SetLocalTextNew(t, e, ...r);
  }
  static SetLocalTextNew(e, t, ...r) {
    if (e) {
      e.Clear();
      r.forEach(t => {
        if (typeof t == "number") {
          if (Number.isInteger(t)) {
            e.AddIntArgs(t);
          } else {
            e.AddFloatArgs(t);
          }
        } else if (t instanceof TableTextArgNew) {
          e.AddFormatTableInfoNew(t.TextKey);
        } else {
          e.AddStringArgs(t);
        }
      });
      e.ShowTextNew(t);
    }
  }
  static TrySetLocalTextNew(t, e, ...r) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      t?.SetUIActive(false);
    } else {
      t?.SetUIActive(true);
      this.SetLocalTextNew(t, e, ...r);
    }
  }
  static ReplaceWildCard(t) {
    var e;
    if (t?.IsValid()) {
      if (t.GetRichText()) {
        e = t.GetText();
        e = LguiUtil.ConvertToPcKeyIconRichText(e);
        e = LguiUtil.ConvertToGamepadKeyIconRichText(e);
        e = LguiUtil.ConvertToActionIconRichText(e);
        e = LguiUtil.ConvertToDataTableSkillIconRichText(e);
        e = LguiUtil.ConvertToSkillIconRichText(e);
        e = LguiUtil.ConvertToToExploreIconRichText(e);
        e = LguiUtil.ConvertToToPhantomIconRichText(e);
        e = LguiUtil.ConvertToToPlatformIconRichText(e);
        t.SetText(e);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "替换富文本图标失败，因为此文本不是富文本", ["uiText", t.GetText()]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "替换富文本时，UiText已经失效");
    }
  }
  static ConvertToPcKeyIconRichText(t) {
    var e = t.match(pcKeyFormatRegex);
    if (!e) {
      return t;
    }
    let r = t;
    for (const o of e) {
      var i = this.qGo(o, pcKeyIdFormatRegex);
      r = this.GGo(r, o, i);
    }
    return r;
  }
  static ConvertToGamepadKeyIconRichText(t) {
    var e = t.match(gamepadFormatRegex);
    if (!e) {
      return t;
    }
    let r = t;
    for (const o of e) {
      var i = this.qGo(o, gamepadIdFormatRegex);
      r = this.NGo(t, o, i);
    }
    return r;
  }
  static ConvertToActionIconRichText(t) {
    var e = t.match(actionFormatRegex);
    if (!e) {
      return t;
    }
    let r = t;
    for (const a of e) {
      var i = this.qGo(a, actionIdFormatRegex);
      var o = `{<${ACTION_ID_KEY}${i}>}`;
      r = this.OGo(r, o, i);
    }
    return r;
  }
  static ConvertToDataTableSkillIconRichText(t) {
    var e = t.match(dtSkillFormatRegex);
    if (!e) {
      return t;
    }
    var r = Info_1.Info.IsInTouch();
    let i = t;
    for (const a of e) {
      var o = this.qGo(a, actionIdFormatRegex);
      if (!r) {
        i = this.OGo(i, a, o);
      }
    }
    return i;
  }
  static ConvertToSkillIconRichText(t) {
    var e = t.match(skillFormatRegex);
    if (!e) {
      return t;
    }
    var r = Info_1.Info.IsInTouch();
    let i = t;
    for (const _ of e) {
      var o = this.qGo(_, actionIdFormatRegex);
      var a = this.qGo(_, skillIdFormatRegex);
      i = r ? this.kGo(i, _, a) : this.OGo(i, _, o);
    }
    return i;
  }
  static ConvertToToExploreIconRichText(t) {
    var e = t.match(exploreFormatRegex);
    if (!e) {
      return t;
    }
    var r = Info_1.Info.IsInTouch();
    let i = t;
    for (const _ of e) {
      var o = this.qGo(_, actionIdFormatRegex);
      var a = this.qGo(_, exploreIdFormatRegex);
      i = r ? this.FGo(i, _, a) : this.OGo(i, _, o);
    }
    return i;
  }
  static ConvertToToPhantomIconRichText(t) {
    var e = t.match(phantomFormatRegex);
    if (!e) {
      return t;
    }
    var r = Info_1.Info.IsInTouch();
    let i = t;
    for (const _ of e) {
      var o = this.qGo(_, actionIdFormatRegex);
      var a = this.qGo(_, phantomIdFormatRegex);
      i = r ? this.VGo(i, _, a) : this.OGo(i, _, o);
    }
    return i;
  }
  static ConvertToToPlatformIconRichText(t) {
    var e = t.match(iconFormatRegex);
    if (!e) {
      return t;
    }
    let r = t;
    for (const o of e) {
      var i = this.qGo(o, iconIdFormatRegex);
      r = this.HGo(r, o, i);
    }
    return r;
  }
  static GGo(t, e, r) {
    var i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigById(r);
    if (i) {
      i = InputKeyUtils_1.InputKeyUtils.GetPcKeyIconPathByCurrentPlatform(i.KeyName);
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        return t.replace(e, `<texture=${i}>`);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "按键配置了空的图标路径", ["pcKeyId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应Pc按键配置", ["pcKeyId", r]);
    }
  }
  static NGo(t, e, r) {
    var i = ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfigById(r);
    if (i) {
      i = i.KeyIconPath;
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        return t.replace(e, `<texture=${i}>`);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "按键配置了空的图标路径", ["gamepadKeyId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应Gamepad按键配置", ["pcKeyId", r]);
    }
  }
  static kGo(t, e, r) {
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(r);
    if (i) {
      var i = i.Icon;
      var o = `<texture=${i}>`;
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        return t.replace(e, o);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "技能配置了空的图标路径", ["skillId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应技能", ["skillId", r]);
    }
  }
  static OGo(t, e, r) {
    var i = InputSettingsManager_1.InputSettingsManager.GetActionBindingByConfigId(r);
    if (i) {
      i = InputSettingsManager_1.InputSettingsManager.CheckGetActionKeyIconPath(i);
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        return t.replace(e, `<texture=${i}>`);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "Action配置了空的图标路径", ["actionId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应ActionBinding", ["actionId", r]);
    }
  }
  static FGo(t, e, r) {
    var i = ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(r);
    if (i) {
      i = i.BattleViewIcon;
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        return t.replace(e, `<texture=${i}>`);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "探索幻象图标路径为空", ["phantomId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应探索幻象", ["phantomId", r]);
    }
  }
  static VGo(t, e, r) {
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(r);
    if (i) {
      i = i.GetPhantomSkillInfoByLevel();
      if (i) {
        i = i.BattleViewIcon;
        if (!StringUtils_1.StringUtils.IsEmpty(i)) {
          return t.replace(e, `<texture=${i}>`);
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LguiUtil", 10, "战斗幻象图标路径为空", ["phantomId", r]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "找不到对应战斗幻象技能", ["phantomId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应战斗幻象", ["phantomId", r]);
    }
  }
  static HGo(e, r, i) {
    var o = ConfigManager_1.ConfigManager.InputSettingsConfig.GetPlatformIconConfig(i);
    if (o) {
      let t = o.IconPath;
      if (Info_1.Info.IsInTouch()) {
        t = o.MobileIconPath;
      }
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        o = `<texture=${t}>`;
        return e.replace(r, o);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "多端图标路径为空", ["iconId", i]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "找不到对应多端平台图标配置", ["iconId", i]);
    }
  }
  static qGo(t, e) {
    t = t.match(e)[0];
    if (t) {
      e = t.split("=")[1];
      return Number(e);
    }
  }
  static GetActorFullPath(t) {
    var e = (0, puerts_1.$ref)("");
    UE.LGUIBPLibrary.GetFullPathOfActor(GlobalData_1.GlobalData.World, t, e);
    return (0, puerts_1.$unref)(e);
  }
  static ScreenShot(t, e) {
    return UE.BlueprintPathsLibrary.ProjectUserDir() + t;
  }
  static ResetShot() {}
  static ClearAttachChildren(e) {
    for (let t = e.AttachChildren.Num() - 1; t >= 0; t--) {
      UE.LGUIBPLibrary.DeleteActor(e.AttachChildren.Get(t).GetOwner());
    }
  }
  static LoadAndSetText(o, a, _, n, e = "js_undefined") {
    LguiUtil.ClearAttachChildren(o);
    const g = new Array(_.length);
    const s = new Array(_.length);
    let l = 0;
    _.forEach((t, r) => {
      const i = LguiUtil.GetRootActorMemoryTag(o, e);
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PrefabAsset, (t, e) => {
        s[r] = t;
        if ((++l >= _.length || l >= _.length) && (s.forEach((t, e) => {
          var t = UE.LGUIBPLibrary.LoadPrefabWithAsset(GlobalData_1.GlobalData.World, t, o);
          LguiUtil.SetRootActorMemoryTag(t, i);
          var r = t.GetComponentByClass(UE.UIItem.StaticClass());
          if (r) {
            r.SetPivot(Vector2D_1.Vector2D.ZeroVector);
            g[e] = t;
          }
        }), o.SetText(a), n)) {
          n(g);
        }
      }, 100, i);
    });
  }
  static SetActorIsPermanent(t, e, r) {
    if (t) {
      if (t.IsValid()) {
        UE.KuroStaticLibrary.SetActorPermanent(t, e, r);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LguiUtil", 10, "无缝切换传入Actor异常,Actor IsValid");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LguiUtil", 10, "无缝切换传入Actor异常,Actor为空");
    }
  }
  static GetChildActorByHierarchyIndex(t, e = 0) {
    t = t.GetUIItem();
    if (t) {
      return t.GetAttachUIChild(e)?.GetOwner();
    }
  }
  static GetComponentsRegistry(t) {
    return t?.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
  }
  static GetRootActorMemoryTag(t, e = "js_undefined") {
    let r = e;
    var i;
    if (ResourceSystem_1.ResourceSystem.IsMemoryTagOpen() && t) {
      t = UE.LGUIBPLibrary.GetRootActorMemoryTag(t).toString();
      if (!StringUtils_1.StringUtils.IsBlank(t)) {
        i = t.split(".");
        r = i.length > 0 && i[i.length - 1] === e ? t : (this.Tsm.Clear(), this.Tsm.Append(t), this.Tsm.Append("."), this.Tsm.Append(e), this.Tsm.ToString());
      }
    }
    return r;
  }
  static SetRootActorMemoryTag(t, e) {
    if (t && ResourceSystem_1.ResourceSystem.IsMemoryTagOpen() && t.IsA(UE.UIBaseActor.StaticClass())) {
      e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
      t = t;
      UE.LGUIBPLibrary.SetRootActorMemoryTag(t.GetUIItem(), e);
    }
  }
  static ConvertPointerPositionToLguiCenterPosition(t, e) {
    var r;
    var i;
    var o = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    if (o) {
      r = UiLayer_1.UiLayer.UiRootItem.GetWidth();
      i = UiLayer_1.UiLayer.UiRootItem.GetHeight();
      e.Set(t.X, t.Y);
      t = o.ConvertPositionFromViewportToLGUICanvas(e.ToUeVector2D());
      e.FromUeVector2D(t);
      e.X = MathCommon_1.MathCommon.Clamp(e.X, 0, r);
      e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, i);
      e.X -= r / 2;
      e.Y -= i / 2;
    }
  }
  static ConvertPointerPositionToLguiPosition(t, e) {
    var r;
    var i;
    var o = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    if (o) {
      r = UiLayer_1.UiLayer.UiRootItem.GetWidth();
      i = UiLayer_1.UiLayer.UiRootItem.GetHeight();
      e.Set(t.X, t.Y);
      t = o.ConvertPositionFromViewportToLGUICanvas(e.ToUeVector2D());
      e.FromUeVector2D(t);
      e.X = MathCommon_1.MathCommon.Clamp(e.X, 0, r);
      e.Y = MathCommon_1.MathCommon.Clamp(e.Y, 0, i);
    }
  }
  static GetAdaptiveTipsPosition(t, e) {
    var r = t.GetUIWorldPosition();
    var i = e.GetUIWorldPosition();
    var o = e.Width;
    var e = e.Height;
    var a = UE.WidgetLayoutLibrary.GetViewportSize(GlobalData_1.GlobalData.World);
    var _ = UE.WidgetLayoutLibrary.GetViewportScale(GlobalData_1.GlobalData.World);
    var n = a.X / _;
    var a = a.Y / _ / 2;
    var _ = r.X + t.Width / 2;
    var g = r.Z;
    let s = 0;
    let l = 0;
    s = _ + o < n / 2 ? _ + o / 2 : r.X - t.Width / 2 - o / 2;
    l = 10 - a < g - e ? g : -a + e;
    return Vector_1.Vector.Create(s, i.Y, l);
  }
}
(exports.LguiUtil = LguiUtil).Tsm = new StringBuilder_1.StringBuilder();
//# sourceMappingURL=LguiUtil.js.map