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
const CommonQteContinuousClickContext_1 = require("./CommonQteContinuousClickContext");
const CommonQteSingleClickContext_1 = require("./CommonQteSingleClickContext");
const DT_COMMON_QTE_PATH = "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte";
class CommonQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.hJ = -1;
    this.ZEl = 0;
    this.tlc = undefined;
    this.tIl = undefined;
    this.Pfc = undefined;
    this.IsRefreshMode = false;
  }
  OnLeaveLevel() {
    this.tIl?.clear();
    this.Pfc?.clear();
    return !(this.tlc = undefined);
  }
  CreateQteContext(t, o = undefined, i = undefined, r = 0) {
    var n = this.GetCommonQteConfig(t);
    if (n) {
      let e = undefined;
      switch (n.BaseConfig.QteType) {
        case 0:
          e = new CommonQteSingleClickContext_1.CommonQteSingleClickContext();
          break;
        case 1:
          e = new CommonQteContinuousClickContext_1.CommonQteContinuousClickContext();
          break;
        default:
          return;
      }
      e.QteId = t;
      e.Source = r;
      e.HandleId = this.ZEl++;
      e.SetConfig(n);
      e.SuccessCallback = o;
      e.FailCallback = i;
      return e;
    }
  }
  SetCurrentCommonQte(e) {
    this.hJ = e.HandleId;
    this.tIl ||= new Map();
    this.tIl.set(e.HandleId, e);
  }
  GetCommonQteConfig(e) {
    this.tlc ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(DT_COMMON_QTE_PATH, UE.DataTable);
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.tlc, e.toString());
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "找不到通用QTE配置", ["QteId", e]);
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
      }
    }
  }
  GetQteHandleId() {
    return this.hJ;
  }
  ClearQteHandleId() {
    this.hJ = -1;
  }
  GetQteContext(e) {
    return this.tIl?.get(e);
  }
  GetQteIcon(e) {
    return this.Pfc?.get(e);
  }
  async LoadQteIcon(t, o) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.LGUITexturePackerSpriteData, e => {
      if (e) {
        if (this.Pfc === undefined) {
          this.Pfc = new Map();
        }
        this.Pfc.set(t, e);
        i.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonQte", 67, "QTE加载图标失败", ["iconPath", o]);
        }
        i.SetResult(false);
      }
    }, 100);
    return i.Promise;
  }
  GetQteIconPath(t) {
    t = this.GetCommonQteConfig(t);
    if (t) {
      let e = undefined;
      if (t.BaseConfig.QteType === 0) {
        e = t.BaseConfig.SingleClickConfig.UIConfig.Icon.ToAssetPathName();
      } else if (t.BaseConfig.QteType === 1) {
        e = t.BaseConfig.ContinuousClickConfig.UIConfig.Icon.ToAssetPathName();
      }
      if (e?.length && e !== "None") {
        return e;
      } else {
        return undefined;
      }
    }
  }
  ClearPreloadCache() {
    this.Pfc?.clear();
  }
}
exports.CommonQteModel = CommonQteModel;
//# sourceMappingURL=CommonQteModel.js.map