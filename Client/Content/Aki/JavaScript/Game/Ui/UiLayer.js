"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiLayer = exports.EInitState = undefined;
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const Vector2D_1 = require("../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const LguiUtil_1 = require("../../Game/Module/Util/LguiUtil");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const UiLayerType_1 = require("./Define/UiLayerType");
var EInitState;
(function (i) {
  i[i.None = 0] = "None";
  i[i.Initializing = 1] = "Initializing";
  i[i.Inited = 2] = "Inited";
})(EInitState = exports.EInitState ||= {});
class UiLayer {
  static get UiRoot() {
    return this.CCr;
  }
  static get UiRootItem() {
    return this.gCr;
  }
  static get WorldSpaceUiRoot() {
    return this.fCr;
  }
  static get WorldSpaceUiRootItem() {
    return this.pCr;
  }
  static async vCr(i) {
    if (this.MCr.has(i)) {
      var t = this.MCr.get(i);
      if (t.length > 0 && t[0] !== undefined) {
        return;
      }
    }
    var t = [];
    var e = this.GetLayerRootUiItem(i);
    await this.ECr(0, e, t);
    this.MCr.set(i, t);
  }
  static async ECr(i, t, e) {
    var a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", t);
    LguiUtil_1.LguiUtil.SetActorIsPermanent(a, true, false);
    var r = a.RootComponent;
    e.push(r);
    if (Info_1.Info.IsPlayInEditor) {
      a.SetActorLabel(a = "Unit_" + i);
      r.SetDisplayName(a);
    }
    var r = i + 1;
    if (r !== UiLayerType_1.TIP_LAYER_UNIT_COUNT) {
      await this.ECr(r, t, e);
    }
  }
  static GetFloatUnit(i, t) {
    i = this.MCr.get(i);
    if (i) {
      if (t >= i.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 10, "索引大于生成单元节点列表,返回当前最大值节点");
        }
        return i[i.length];
      } else {
        return i[t];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "索引大于生成单元节点列表,返回当前最大值节点");
    }
  }
  static async pGl(i) {
    var t = UiLayer.GetLayerRootUiItem(i);
    var e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", t);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e, t);
    LguiUtil_1.LguiUtil.SetActorIsPermanent(e, true, false);
    var t = e.RootComponent;
    if (Info_1.Info.IsPlayInEditor) {
      e.SetActorLabel(e = "Unit_PureMode");
      t.SetDisplayName(e);
    }
    t.SetUIActive(false);
    this.fGl.set(i, t);
  }
  static GetPureModeFloatUnit(i) {
    var t = this.fGl.get(i);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 17, "该层级没有纯净模式的节点", ["layer", i]);
    }
  }
  static GetLayerRootUiItem(i) {
    var t = this.SCr.get(i);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "找不到对应的UiLayer, 此时UiLayer可能还未初始化", ["层级名称", UiLayerType_1.ELayerType[i]]);
    }
  }
  static GetBattleViewUnit(i) {
    return this.yCr[i];
  }
  static SetLayerActive(i, t) {
    var e = this.GetLayerRootUiItem(i);
    if (e) {
      e.SetUIActive(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiLayer", 10, "有操作设置层级的显隐状态", ["层级类型", i], ["显示状态", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiLayer", 10, "找不到对应的uiLayer：", ["type", i]);
    }
  }
  static async Initialize() {
    if (!UiLayer.ZCe) {
      UiLayer.ZCe = true;
      await Promise.all([this.ICr(), this.TCr()]);
      await this.LCr();
      await Promise.all([this.DCr(), this.vCr(UiLayerType_1.ELayerType.BattleFloat), this.vCr(UiLayerType_1.ELayerType.Float), this.pGl(UiLayerType_1.ELayerType.BattleFloat)]);
    }
  }
  static async ICr() {
    var i;
    if (this.CCr) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 1, "界面根节点已存在");
      }
    } else {
      this.CCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_Root_Prefab", undefined);
      if (this.CCr && (this.gCr = this.CCr.GetComponentByClass(UE.UIItem.StaticClass()), this.gCr)) {
        if (i = this.gCr.GetCanvasScaler()) {
          i.OnViewportSizeChanged.Bind(this.ZL1);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 17, "界面根节点获取不到canvasScaler, 无法监听ViewportSizeChanged");
        }
        this.CCr.OnDestroyed.Add(() => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 1, "UiRoot被销毁");
          }
          this.SCr.clear();
          var i = this.gCr?.GetCanvasScaler();
          if (i) {
            i.OnViewportSizeChanged.Unbind();
          }
          this.CCr = undefined;
          this.gCr = undefined;
        });
        LguiUtil_1.LguiUtil.SetActorIsPermanent(this.UiRoot, true, false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 1, "界面根节点创建失败", ["UI_ROOT_PATH", "UiItem_Root_Prefab"]);
      }
    }
  }
  static async LCr() {
    var i = [];
    for (const t of UiLayerType_1.LayerTypeEnumValues) {
      i.push(this.RCr(t));
    }
    await Promise.all(i).then(() => {
      let i = 0;
      for (const t of UiLayerType_1.LayerTypeEnumValues) {
        if (!Info_1.Info.IsBuildShipping || t !== UiLayerType_1.ELayerType.Debug) {
          this.GetLayerRootUiItem(t).SetHierarchyIndex(++i);
        }
      }
    });
  }
  static async RCr(t) {
    if (this.SCr.has(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiLayer", 16, "重复加载UI层级", ["层级类型", UiLayerType_1.ELayerType[t]]);
      }
    } else if (!Info_1.Info.IsBuildShipping || t !== UiLayerType_1.ELayerType.Debug) {
      let i = "UiItem_Layer_Prefab";
      switch (t) {
        case UiLayerType_1.ELayerType.HUD:
          i = "UiItem_LayerHud_Prefab";
          break;
        case UiLayerType_1.ELayerType.Mask:
        case UiLayerType_1.ELayerType.NormalMask:
          i = "UiItem_LayerMask_Prefab";
      }
      var e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(i, this.gCr);
      LguiUtil_1.LguiUtil.SetActorIsPermanent(e, true, false);
      this.SCr.set(t, e.RootComponent);
      if (t === UiLayerType_1.ELayerType.Pool) {
        e.RootComponent.SetUIActive(false);
      }
    }
  }
  static async DCr() {
    if (!this.yCr) {
      var e;
      var a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD);
      var r = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", a);
      let t = r;
      this.yCr = [];
      for (let i = 0; i < UiLayerType_1.BATTLE_VIEW_UNIT_COUNT; i++) {
        t = t || LguiUtil_1.LguiUtil.DuplicateActor(r, a);
        LguiUtil_1.LguiUtil.SetActorIsPermanent(t, true, false);
        const o = t.RootComponent;
        if (Info_1.Info.IsPlayInEditor) {
          e = "Unit_" + i;
          t.SetActorLabel(e);
          o.SetDisplayName(e);
        }
        this.yCr.push(o);
        t = undefined;
      }
      var i = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_SafeZoneUnitNode_Prefab", a);
      LguiUtil_1.LguiUtil.SetActorIsPermanent(i, true, false);
      const o = i.RootComponent;
      this.yCr.push(o);
    }
  }
  static async TCr() {
    if (this.fCr) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 1, "空间界面根节点已存在");
      }
    } else {
      this.fCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_WorldSpace_Prefab", undefined);
      if (this.fCr && (this.pCr = this.fCr.GetComponentByClass(UE.UIItem.StaticClass()), this.fCr)) {
        this.fCr.OnDestroyed.Add(() => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 1, "WorldSpaceUiRoot被销毁");
          }
          this.fCr = undefined;
          this.pCr = undefined;
        });
        LguiUtil_1.LguiUtil.SetActorIsPermanent(this.WorldSpaceUiRoot, true, false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 1, "空间界面根节点创建失败", ["WORLD_SPACE_UI_ROOT", "UiItem_WorldSpace_Prefab"]);
      }
    }
  }
  static SetUiRootActive(i) {
    var t;
    if (!this.IsForceHideUi()) {
      if ((t = UiLayer.gCr) && UE.KismetSystemLibrary.IsValid(t)) {
        t.SetUIActive(i);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnUiScreenRootVisibleChange, i);
      }
    }
  }
  static IsUiActive() {
    var i = UiLayer.gCr;
    return !!i && !!UE.KismetSystemLibrary.IsValid(i) && i.IsUIActiveInHierarchy();
  }
  static ForceHideUi() {
    if (ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen) {
      this.SetUiRootActive(false);
      this.SetWorldUiActive(false);
      this.UCr = true;
    }
  }
  static ForceShowUi() {
    if (this.IsForceHideUi()) {
      this.UCr = false;
      this.SetUiRootActive(true);
      this.SetWorldUiActive(true);
    }
  }
  static IsForceHideUi() {
    return this.UCr;
  }
  static SetForceHideUiState(i) {
    this.UCr = !i;
  }
  static SetWorldUiActive(i) {
    var t;
    if (!this.IsForceHideUi()) {
      if ((t = UiLayer.pCr) && UE.KismetSystemLibrary.IsValid(t)) {
        t.SetUIActive(i);
      }
    }
  }
  static SetShowMaskLayer(i, t) {
    var e;
    var a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    if (a) {
      if (t) {
        UiLayer.ACr.add(i);
      } else {
        UiLayer.ACr.delete(i);
      }
      e = UiLayer.ACr.size;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Mask遮罩", ["tag", i], ["show", t], ["size", e]);
      }
      a?.SetRaycastTarget(e > 0);
    }
  }
  static GmClearMask() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 10, "Gm执行Mask遮罩清除");
    }
    UiLayer.ACr.clear();
    UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask)?.SetRaycastTarget(false);
  }
  static IsInMask() {
    var i = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    return !!i && i.IsRaycastTarget();
  }
  static SetShowNormalMaskLayer(i, t = "") {
    var e;
    if ((StringUtils_1.StringUtils.IsEmpty(this.PCr) || this.PCr === t && !i) && (e = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.NormalMask)) && (e?.SetRaycastTarget(i), i && StringUtils_1.StringUtils.IsEmpty(this.PCr) && t ? this.PCr = t : i || t !== this.PCr || (this.PCr = ""), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("UiCore", 16, "设置Normal层点击遮罩", ["是否显示", i], ["上次来源", this.PCr], ["当前来源", t]);
    }
  }
  static GetViewportSize() {
    if (ObjectUtils_1.ObjectUtils.IsValid(UiLayer.UiRootItem)) {
      return Vector2D_1.Vector2D.Create(UiLayer.UiRootItem.GetWidth(), UiLayer.UiRootItem.GetHeight());
    } else {
      return Vector2D_1.Vector2D.Create();
    }
  }
}
(exports.UiLayer = UiLayer).ZCe = false;
UiLayer.PCr = "";
UiLayer.CCr = undefined;
UiLayer.gCr = undefined;
UiLayer.fCr = undefined;
UiLayer.pCr = undefined;
UiLayer.yCr = undefined;
UiLayer.SCr = new Map();
UiLayer.ACr = new Set();
UiLayer.MCr = new Map();
UiLayer.fGl = new Map();
UiLayer.ZL1 = i => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("UiCore", 17, "UIRootItem OnViewPortSizeChange");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UIViewPortSizeChanged);
}; //# sourceMappingURL=UiLayer.js.map