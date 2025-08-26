"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditDataFacade = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CommonTouchUiEditDataFacade {
  constructor() {
    this.hs = 0;
    this.NQ = new Map();
    this.wZt = undefined;
    this.MinTouchMoveDifference = 0;
    this.MaxTouchMoveDifference = 0;
    this.MaxTouchMoveValue = 0;
    this.MinTouchMoveValue = 0;
    this.ControlScaleRate = 0;
    this.iHu = e => {
      if (e.jju) {
        for (const r of e.jju) {
          var t = r.s5n;
          var o = ConfigManager_1.ConfigManager.CommonTouchUiEditConfig.GetConfigById(t);
          var o = {
            StorageId: t,
            OffsetX: r.E8n,
            OffsetY: r.y8n,
            Scale: r.M8n,
            Alpha: r.S8n,
            HierarchyIndex: r.I8n,
            Editable: o.Editable,
            DefaultSelect: o.IsDefaultSelected,
            ShouldCheckOverlap: o.IsCheckOverlap
          };
          this.NQ.set(t, o);
        }
      }
    };
  }
  Init() {
    this.MinTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MinTouchMoveDifference");
    this.MaxTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MaxTouchMoveDifference");
    this.MaxTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MaxTouchMoveValue");
    this.MinTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MinTouchMoveValue");
    this.ControlScaleRate = CommonParamById_1.configCommonParamById.GetFloatConfig("ControlScaleRate");
    Net_1.Net.Register(19779, this.iHu);
  }
  Clear() {
    this.NQ.clear();
    this.wZt = undefined;
    Net_1.Net.UnRegister(19779);
  }
  SetGroup(e) {
    this.hs = e;
    this.wZt = ConfigManager_1.ConfigManager.CommonTouchUiEditConfig.GetConfigListByEditGroup(this.hs);
  }
  GetResIdList() {
    var e = new Set();
    if (!this.wZt) {
      return [];
    }
    for (const t of this.wZt) {
      e.add(t.PanelResId);
    }
    return Array.from(e);
  }
  GetStorageId(e, t) {
    if (this.wZt) {
      for (const o of this.wZt) {
        if (o.PanelResId === e && o.ItemIndex === t) {
          return o.Id;
        }
      }
    }
    return 0;
  }
  GetResPair(e) {
    e = ConfigManager_1.ConfigManager.CommonTouchUiEditConfig.GetConfigById(e);
    if (e) {
      return [e.PanelResId, e.ItemIndex];
    }
  }
  GetDefaultData(e, t) {
    e = this.GetStorageId(e, t);
    if (e) {
      t = ConfigManager_1.ConfigManager.CommonTouchUiEditConfig.GetConfigById(e);
      if (t) {
        return {
          StorageId: e,
          OffsetX: t.SourceOffsetX,
          OffsetY: t.SourceOffsetY,
          Scale: t.SourceSize,
          Alpha: t.SourceAlpha,
          HierarchyIndex: t.SourceHierarchyIndex,
          Editable: t.Editable,
          DefaultSelect: t.IsDefaultSelected,
          ShouldCheckOverlap: t.IsCheckOverlap
        };
      }
    }
  }
  SaveData(e) {
    var t = [];
    for (const o of e) {
      if (o.StorageId !== 0) {
        this.NQ.set(o.StorageId, o);
        t.push({
          s5n: o.StorageId,
          M8n: o.Scale,
          E8n: o.OffsetX,
          y8n: o.OffsetY,
          S8n: o.Alpha,
          T8n: o.HierarchyIndex,
          I8n: o.HierarchyIndex
        });
      }
    }
    e = Protocol_1.Aki.Protocol.h8u.create();
    e.v8n = t;
    Net_1.Net.Call(28804, e, e => {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28061);
    });
  }
  GetData(e, t) {
    var o = this.GetStorageId(e, t);
    return this.NQ.get(o) ?? this.GetDefaultData(e, t);
  }
}
exports.CommonTouchUiEditDataFacade = CommonTouchUiEditDataFacade;
//# sourceMappingURL=CommonTouchUiEditDataFacade.js.map