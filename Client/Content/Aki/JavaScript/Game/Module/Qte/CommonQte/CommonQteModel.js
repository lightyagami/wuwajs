"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteModel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const CommonQteCompassRotateItem_1 = require("../Item/CommonQteCompassRotateItem");
const CommonQteContinuousClickItem_1 = require("../Item/CommonQteContinuousClickItem");
const CommonQteCustomOptionPanel_1 = require("../Item/CommonQteCustomOptionPanel");
const CommonQteDragItem_1 = require("../Item/CommonQteDragItem");
const CommonQteFocusSingleButton_1 = require("../Item/CommonQteFocusSingleButton");
const CommonQteFullScreenPullItem_1 = require("../Item/CommonQteFullScreenPullItem");
const CommonQteLongPressItem_1 = require("../Item/CommonQteLongPressItem");
const CommonQteRightScreenDragItem_1 = require("../Item/CommonQteRightScreenDragItem");
const CommonQteSelectOptionPanel_1 = require("../Item/CommonQteSelectOptionPanel");
const CommonQteSingleClickItem_1 = require("../Item/CommonQteSingleClickItem");
const CommontQteFullScreenLongPress_1 = require("../Item/CommontQteFullScreenLongPress");
const CommonQteContinuousClickContext_1 = require("./CommonQteContinuousClickContext");
const CommonQteDragContext_1 = require("./CommonQteDragContext");
const CommonQteGroupContext_1 = require("./CommonQteGroupContext");
const CommonQteLongPressContext_1 = require("./CommonQteLongPressContext");
const CommonQteSelectOptionContext_1 = require("./CommonQteSelectOptionContext");
const CommonQteSingleClickContext_1 = require("./CommonQteSingleClickContext");
const DT_COMMON_QTE_PATH = "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte";
const DT_COMMON_QTE_GROUP_PATH = "/Game/Aki/Data/Qte/DT_CommonQteGroup.DT_CommonQteGroup";
class CommonQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.hJ = -1;
    this.ZEl = 0;
    this.tlc = undefined;
    this.gad = undefined;
    this.tIl = undefined;
    this.Cad = undefined;
    this.jXu = undefined;
    this.IsRefreshMode = false;
  }
  OnLeaveLevel() {
    this.ClearPreloadCache();
    this.tIl?.clear();
    this.tlc = undefined;
    return !(this.gad = undefined);
  }
  CreateQteContext(t, o = undefined, n = undefined, r = 0, i = undefined) {
    var m = this.GetCommonQteConfig(t);
    if (m) {
      let e = undefined;
      switch (m.BaseConfig.QteType) {
        case 0:
          e = new CommonQteSingleClickContext_1.CommonQteSingleClickContext();
          break;
        case 1:
          e = new CommonQteContinuousClickContext_1.CommonQteContinuousClickContext();
          break;
        case 3:
          e = new CommonQteLongPressContext_1.CommonQteLongPressContext();
          break;
        case 2:
          e = new CommonQteDragContext_1.CommonQteDragContext();
          break;
        case 4:
          e = new CommonQteSelectOptionContext_1.CommonQteSelectOptionContext();
          break;
        default:
          return;
      }
      e.QteId = t;
      e.Source = r;
      e.HandleId = this.ZEl++;
      e.SetConfig(m);
      e.SuccessCallback = o;
      e.FailCallback = n;
      e.ExtraParams = i;
      return e;
    }
  }
  CreateQteGroupContext(t, e = undefined, o = undefined, n = 0, r = undefined) {
    var i = this.GetCommonQteGroupConfig(t);
    if (i) {
      var m = new CommonQteGroupContext_1.CommonQteGroupContext();
      m.QteGroupId = t;
      m.Source = n;
      m.HandleId = this.ZEl++;
      m.SetGroupConfig(i);
      m.SuccessCallback = e;
      m.FailCallback = o;
      m.ExtraParams = r;
      for (let e = 0; e < i.CommonQteIdSet.Num(); e++) {
        var s = i.CommonQteIdSet.Get(e);
        var C = this.CreateQteContext(s, undefined, m.OnContextFail, n, r);
        if (C) {
          C.QteGroupId = t;
          C.GroupHandleId = m.HandleId;
          C.GroupContext = m;
          C.SetGroupConfig(i);
          m.AddContext(s, C, s === i.MainQteId);
        }
      }
      return m;
    }
  }
  SetCurrentCommonQte(e) {
    this.hJ = e.HandleId;
    this.tIl ||= new Map();
    this.tIl.set(e.HandleId, e);
  }
  GetCommonQteConfig(e) {
    var t = this.jXu?.get(e);
    if (t) {
      return t;
    }
    if (!this.tlc) {
      t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(DT_COMMON_QTE_PATH, UE.DataTable);
      if (!t?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "通用QTE配置加载失败", ["Path", DT_COMMON_QTE_PATH]);
        }
        return;
      }
      this.tlc = t;
    }
    t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.tlc, e.toString());
    if (t) {
      this.jXu ||= new Map();
      this.jXu.set(e, t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonQte", 67, "找不到通用QTE配置", ["QteId", e]);
    }
    return t;
  }
  GetCommonQteGroupConfig(e) {
    if (!this.gad) {
      var t = ResourceSystem_1.ResourceSystem.Load(DT_COMMON_QTE_GROUP_PATH, UE.DataTable);
      if (!t?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "通用QTE配置加载失败", ["Path", DT_COMMON_QTE_GROUP_PATH]);
        }
        return;
      }
      this.gad = t;
    }
    t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.gad, e.toString());
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "找不到通用QTE组配置", ["QteGroupId", e]);
      }
    }
    return t;
  }
  GetCommonQteViewName(e) {
    e = this.GetCommonQteConfig(e);
    if (e) {
      if (e.BaseConfig.QteType === 0) {
        if (e.BaseConfig.SingleClickConfig.ViewType === 0) {
          return "CommonQteView";
        }
      } else if (e.BaseConfig.QteType === 1) {
        if (e.BaseConfig.ContinuousClickConfig.ViewType === 0) {
          return "CommonQteContinuousClickView";
        }
      } else if (e.BaseConfig.QteType === 3) {
        if (e.BaseConfig.LongPressConfig.ViewType === 0) {
          return "CommonQteLongPressView";
        }
      } else if (e.BaseConfig.QteType === 2) {
        if (e.BaseConfig.DragConfig.ViewType === 1) {
          return "AnchorGameplayView";
        }
      }
    }
  }
  GetCommonQteItemName(e) {
    e = this.GetCommonQteConfig(e);
    if (e) {
      if (e.BaseConfig.QteType === 0) {
        if (e.BaseConfig.SingleClickConfig.ViewType === 1) {
          return "UiItem_QteBtnSingleTap";
        }
        if (e.BaseConfig.SingleClickConfig.ViewType === 2) {
          return "UiItem_FocusSingleButton";
        }
      } else {
        if (e.BaseConfig.QteType === 1) {
          return "UiItem_QteBtnTapRapidly";
        }
        if (e.BaseConfig.QteType === 3) {
          if (e.BaseConfig.LongPressConfig.ViewType === 1) {
            return "UiItem_QteBtnLongPress";
          }
          if (e.BaseConfig.LongPressConfig.ViewType === 2) {
            return "UiItem_FullScreenLongPress";
          }
        } else if (e.BaseConfig.QteType === 2) {
          if (e.BaseConfig.DragConfig.ViewType === 0) {
            return "UiItem_QteDrag";
          }
          if (e.BaseConfig.DragConfig.ViewType === 2) {
            return "UiItem_PullUp";
          }
          if (e.BaseConfig.DragConfig.ViewType === 3) {
            return "UiItem_PullDown";
          }
          if (e.BaseConfig.DragConfig.ViewType === 4) {
            return "UiItem_CompassRotate";
          }
          if (e.BaseConfig.DragConfig.ViewType === 5) {
            return "UiItem_RightScreenDragItem";
          }
        } else if (e.BaseConfig.QteType === 4) {
          if (e.BaseConfig.SelectOptionConfig.ViewType === 0) {
            return "UiView_PlotInteraction";
          }
          if (e.BaseConfig.SelectOptionConfig.ViewType === 1) {
            return "UiItem_QteObjectPos";
          }
        }
      }
    }
  }
  CreateCommonQteItem(e) {
    switch (e) {
      case "UiItem_QteBtnSingleTap":
        return new CommonQteSingleClickItem_1.CommonQteSingleClickItem();
      case "UiItem_QteBtnTapRapidly":
        return new CommonQteContinuousClickItem_1.CommonQteContinuousClickItem();
      case "UiItem_QteDrag":
        return new CommonQteDragItem_1.CommonQteDragItem();
      case "UiItem_QteBtnLongPress":
        return new CommonQteLongPressItem_1.CommonQteLongPressItem();
      case "UiView_PlotInteraction":
        return new CommonQteSelectOptionPanel_1.CommonQteSelectOptionPanel();
      case "UiItem_QteObjectPos":
        return new CommonQteCustomOptionPanel_1.CommonQteCustomOptionPanel();
      case "UiItem_PullUp":
      case "UiItem_PullDown":
        return new CommonQteFullScreenPullItem_1.CommonQteFullScreenPullItem();
      case "UiItem_FocusSingleButton":
        return new CommonQteFocusSingleButton_1.CommonQteFocusSingleButton();
      case "UiItem_CompassRotate":
        return new CommonQteCompassRotateItem_1.CommonQteCompassRotateItem();
      case "UiItem_FullScreenLongPress":
        return new CommontQteFullScreenLongPress_1.CommonQteFullScreenLongPress();
      case "UiItem_RightScreenDragItem":
        return new CommonQteRightScreenDragItem_1.CommonQteRightScreenDragItem();
    }
  }
  GetQteHandleId() {
    return this.hJ;
  }
  ClearQteHandleId(e) {
    e = e ?? this.hJ;
    e = this.tIl?.get(e)?.QteId;
    if (e) {
      this.jXu?.delete(e);
      this.Cad?.delete(e);
    }
    this.hJ = -1;
  }
  GetQteContext(e) {
    return this.tIl?.get(e);
  }
  GetQteResource(e, t = false) {
    if (!t) {
      return this.Cad?.get(e);
    }
    if (this.Cad === undefined) {
      this.Cad = new Map();
    }
    let o = this.Cad.get(e);
    if (!o) {
      o = {};
      this.Cad.set(e, o);
    }
    return o;
  }
  LoadQteResource(e) {
    var t;
    var o;
    if (this.Cad?.has(e)) {
      return [];
    } else {
      t = [];
      if (o = this.GetQteIconPath(e)) {
        t.push(this.vad(e, o));
      }
      if (o = this.GetQteScreenEffectPath(e, 1)) {
        t.push(this.yad(e, o));
      }
      if (o = this.GetQteScreenEffectPath(e, 2)) {
        t.push(this.Sad(e, o));
      }
      if (o = this.GetQteCameraShakePath(e)) {
        t.push(this.Mad(e, o));
      }
      if (o = this.GetQteScaleCurvePath(e)) {
        t.push(this.Uqd(e, o));
      }
      return t;
    }
  }
  GetQteIconPath(t) {
    t = this.GetCommonQteConfig(t);
    if (t) {
      let e = undefined;
      if (t.BaseConfig.QteType === 0) {
        e = t.BaseConfig.SingleClickConfig.UIConfig.Icon.ToAssetPathName();
      } else if (t.BaseConfig.QteType === 1) {
        e = t.BaseConfig.ContinuousClickConfig.UIConfig.Icon.ToAssetPathName();
      } else if (t.BaseConfig.QteType === 3) {
        e = t.BaseConfig.LongPressConfig.UIConfig.Icon.ToAssetPathName();
      }
      if (e && e !== "None") {
        return e;
      } else {
        return undefined;
      }
    }
  }
  GetQteScreenEffectPath(e, t) {
    e = this.GetCommonQteConfig(e);
    if (e && (t = (t === 1 ? e.ExtraConfig.ScreenEffectType1 : e.ExtraConfig.ScreenEffectType2).ToAssetPathName()) && t !== "None") {
      return t;
    } else {
      return undefined;
    }
  }
  GetQteCameraShakePath(e) {
    var e = this.GetCommonQteConfig(e);
    if ((e = e && e.ExtraConfig.CameraShake.ToAssetPathName()) && e !== "None") {
      return e;
    } else {
      return undefined;
    }
  }
  GetQteScaleCurvePath(e) {
    var e = this.GetCommonQteConfig(e);
    if ((e = e && e.ExtraConfig.UiScaleCurve.ToAssetPathName()) && e !== "None") {
      return e;
    } else {
      return undefined;
    }
  }
  async vad(o, n) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.LGUITexturePackerSpriteData, e => {
      var t;
      if (e) {
        if (t = this.GetQteResource(o, true)) {
          t.Icon = e;
        }
        r.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE加载图标失败", ["iconPath", n]);
        }
        r.SetResult(false);
      }
    }, 100);
    return r.Promise;
  }
  async yad(o, n) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.EffectScreenPlayData_C, e => {
      var t;
      if (e) {
        if (t = this.GetQteResource(o, true)) {
          t.ScreenEffect1 = e;
        }
        r.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE屏幕特效加载失败", ["path", n]);
        }
        r.SetResult(false);
      }
    }, 100);
    return r.Promise;
  }
  async Sad(o, n) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.EffectModelPostProcess_C, e => {
      var t;
      if (e) {
        if (t = this.GetQteResource(o, true)) {
          t.ScreenEffect2 = e;
        }
        r.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE屏幕特效加载失败", ["path", n]);
        }
        r.SetResult(false);
      }
    }, 100);
    return r.Promise;
  }
  async Mad(o, n) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.Class, e => {
      var t;
      if (e) {
        if (t = this.GetQteResource(o, true)) {
          t.CameraShake = e;
        }
        r.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE震屏效果加载失败", ["path", n]);
        }
        r.SetResult(false);
      }
    }, 100);
    return r.Promise;
  }
  async Uqd(o, n) {
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.CurveFloat, e => {
      var t;
      if (e) {
        if (t = this.GetQteResource(o, true)) {
          t.ScaleCurve = e;
        }
        r.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE缩放曲线加载失败", ["path", n]);
        }
        r.SetResult(false);
      }
    }, 100);
    return r.Promise;
  }
  ClearPreloadCache(e) {
    if (e !== undefined) {
      this.jXu?.delete(e);
      this.Cad?.delete(e);
    } else {
      this.jXu?.clear();
      this.Cad?.clear();
    }
  }
}
exports.CommonQteModel = CommonQteModel;
//# sourceMappingURL=CommonQteModel.js.map