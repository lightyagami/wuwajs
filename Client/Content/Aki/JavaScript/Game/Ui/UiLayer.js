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
const EventCSharpBridge_1 = require("../Common/Event/EventCSharpBridge");
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
      var e = this.MCr.get(i);
      if (e.length > 0 && e[0] !== undefined) {
        return;
      }
    }
    var e = [];
    var t = this.GetLayerRootUiItem(i);
    await this.ECr(0, t, e);
    this.MCr.set(i, e);
  }
  static async ECr(i, e, t) {
    var a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", e, undefined, 100, "Ui");
    LguiUtil_1.LguiUtil.SetActorIsPermanent(a, true, false);
    var r = a.RootComponent;
    t.push(r);
    if (Info_1.Info.IsPlayInEditor) {
      a.SetActorLabel(a = "Unit_" + i);
      r.SetDisplayName(a);
    }
    var r = i + 1;
    if (r !== UiLayerType_1.TIP_LAYER_UNIT_COUNT) {
      await this.ECr(r, e, t);
    }
  }
  static GetFloatUnit(i, e) {
    i = this.MCr.get(i);
    if (i) {
      if (e >= i.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 10, "索引大于生成单元节点列表,返回当前最大值节点");
        }
        return i[i.length];
      } else {
        return i[e];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "索引大于生成单元节点列表,返回当前最大值节点");
    }
  }
  static async pGl(i) {
    var e = UiLayer.GetLayerRootUiItem(i);
    var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", e, undefined, 100, "Ui");
    var t = LguiUtil_1.LguiUtil.DuplicateActor(t, e);
    LguiUtil_1.LguiUtil.SetActorIsPermanent(t, true, false);
    var e = t.RootComponent;
    if (Info_1.Info.IsPlayInEditor) {
      t.SetActorLabel(t = "Unit_PureMode");
      e.SetDisplayName(t);
    }
    e.SetUIActive(false);
    this.fGl.set(i, e);
  }
  static GetPureModeFloatUnit(i) {
    var e = this.fGl.get(i);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 17, "该层级没有纯净模式的节点", ["layer", i]);
    }
  }
  static GetLayerRootUiItem(i) {
    var e = this.SCr.get(i);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "找不到对应的UiLayer, 此时UiLayer可能还未初始化", ["层级名称", UiLayerType_1.ELayerType[i]]);
    }
  }
  static GetBattleViewUnit(i) {
    return this.yCr[i];
  }
  static SetLayerActive(i, e) {
    var t = this.GetLayerRootUiItem(i);
    if (t) {
      t.SetUIActive(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiLayer", 10, "有操作设置层级的显隐状态", ["层级类型", i], ["显示状态", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiLayer", 10, "找不到对应的uiLayer：", ["type", i]);
    }
  }
  static SetLayerRenderable(i, e, t) {
    var a = this.GetLayerRootUiItem(i);
    if (a) {
      a = a;
      UE.LGUIBPLibrary.SetUIRenderable(a, e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiLayer", 10, "有操作设置层级的可渲染状态", ["层级类型", i], ["可渲染状态", e], ["reason", t]);
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
      this.gfm();
    }
  }
  static gfm() {
    var i;
    var e = [];
    e.push(this.CCr);
    e.push(this.fCr);
    var t = [];
    for (const o of UiLayerType_1.LayerTypeEnumValues) {
      if (!Info_1.Info.IsBuildShipping || o !== UiLayerType_1.ELayerType.Debug) {
        i = this.GetLayerRootUiItem(o);
        t.push(i);
      }
    }
    for (const s of this.yCr) {
      t.push(s);
    }
    var a = new Map();
    var r = this.MCr.get(UiLayerType_1.ELayerType.BattleFloat);
    a.set(UiLayerType_1.ELayerType.BattleFloat, r);
    var r = this.MCr.get(UiLayerType_1.ELayerType.BattleFloat);
    a.set(UiLayerType_1.ELayerType.Float, r);
    var r = this.fGl.get(UiLayerType_1.ELayerType.BattleFloat);
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.OnTsLayerInit, e, t, a, r);
  }
  static async ICr() {
    var i;
    if (this.CCr) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 1, "界面根节点已存在");
      }
    } else {
      this.CCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_Root_Prefab", undefined, undefined, 100, "Ui");
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
    for (const e of UiLayerType_1.LayerTypeEnumValues) {
      i.push(this.RCr(e));
    }
    await Promise.all(i).then(() => {
      let i = 0;
      for (const e of UiLayerType_1.LayerTypeEnumValues) {
        if (!Info_1.Info.IsBuildShipping || e !== UiLayerType_1.ELayerType.Debug) {
          this.GetLayerRootUiItem(e).SetHierarchyIndex(++i);
        }
      }
    });
  }
  static async RCr(e) {
    if (this.SCr.has(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiLayer", 16, "重复加载UI层级", ["层级类型", UiLayerType_1.ELayerType[e]]);
      }
    } else if (!Info_1.Info.IsBuildShipping || e !== UiLayerType_1.ELayerType.Debug) {
      let i = "UiItem_Layer_Prefab";
      switch (e) {
        case UiLayerType_1.ELayerType.HUD:
          i = "UiItem_LayerHud_Prefab";
          break;
        case UiLayerType_1.ELayerType.Mask:
        case UiLayerType_1.ELayerType.NormalMask:
          i = "UiItem_LayerMask_Prefab";
      }
      var t = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(i, this.gCr, undefined, 100, "Ui");
      LguiUtil_1.LguiUtil.SetActorIsPermanent(t, true, false);
      this.SCr.set(e, t.RootComponent);
      if (e === UiLayerType_1.ELayerType.Pool) {
        t.RootComponent.SetUIActive(false);
      }
    }
  }
  static async DCr() {
    if (!this.yCr) {
      var t;
      var a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.HUD);
      var r = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_BattleViewUnitNode_Prefab", a, undefined, 100, "Ui");
      let e = r;
      this.yCr = [];
      for (let i = 0; i < UiLayerType_1.BATTLE_VIEW_UNIT_COUNT; i++) {
        e = e || LguiUtil_1.LguiUtil.DuplicateActor(r, a);
        LguiUtil_1.LguiUtil.SetActorIsPermanent(e, true, false);
        const o = e.RootComponent;
        if (Info_1.Info.IsPlayInEditor) {
          t = "Unit_" + i;
          e.SetActorLabel(t);
          o.SetDisplayName(t);
        }
        this.yCr.push(o);
        e = undefined;
      }
      var i = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_SafeZoneUnitNode_Prefab", a, GlobalData_1.GlobalData.World, 100, "Ui");
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
      this.fCr = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_WorldSpace_Prefab", undefined, undefined, 100, "Ui");
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
    var e;
    if (!this.IsForceHideUi()) {
      if ((e = UiLayer.gCr) && UE.KismetSystemLibrary.IsValid(e)) {
        e.SetUIActive(i);
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
    var e;
    if (!this.IsForceHideUi()) {
      if ((e = UiLayer.pCr) && UE.KismetSystemLibrary.IsValid(e)) {
        e.SetUIActive(i);
      }
    }
  }
  static SetShowMaskLayer(i, e) {
    var t;
    var a = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Mask);
    if (a) {
      if (e) {
        UiLayer.ACr.add(i);
      } else {
        UiLayer.ACr.delete(i);
      }
      t = UiLayer.ACr.size;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 16, "Mask遮罩", ["tag", i], ["show", e], ["size", t]);
      }
      a?.SetRaycastTarget(t > 0);
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
  static SetShowNormalMaskLayer(i, e = "") {
    var t;
    if ((StringUtils_1.StringUtils.IsEmpty(this.PCr) || this.PCr === e && !i) && (t = UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.NormalMask)) && (t?.SetRaycastTarget(i), i && StringUtils_1.StringUtils.IsEmpty(this.PCr) && e ? this.PCr = e : i || e !== this.PCr || (this.PCr = ""), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("UiCore", 16, "设置Normal层点击遮罩", ["是否显示", i], ["上次来源", this.PCr], ["当前来源", e]);
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
UiLayer.UCr = false;
UiLayer.ACr = new Set();
UiLayer.MCr = new Map();
UiLayer.fGl = new Map();
UiLayer.ZL1 = i => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("UiCore", 17, "UIRootItem OnViewPortSizeChange");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UIViewPortSizeChanged);
}; //# sourceMappingURL=UiLayer.js.map