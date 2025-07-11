"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSpecialEnergyBarData = exports.SpecialEnergyBarInfo = exports.SpecialEnergyBarKeyInfo = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../GlobalData");
class SpecialEnergyBarKeyInfo {
  constructor() {
    this.Action = 0;
    this.ActionType = 0;
  }
}
exports.SpecialEnergyBarKeyInfo = SpecialEnergyBarKeyInfo;
class SpecialEnergyBarInfo {
  constructor() {
    this.Id = 0;
    this.PrefabType = 0;
    this.ExtraType = 0;
    this.SlotNum = 0;
    this.ExtraFloatParams = [];
    this.PrefabPath = "";
    this.AttributeId = 0;
    this.MaxAttributeId = 0;
    this.BuffId = 0;
    this.KeyEnableTagId = 0;
    this.TagEnergyBarIdMap = undefined;
    this.EffectColor = undefined;
    this.OtherEffectColorList = [];
    this.PointColor = undefined;
    this.PointColorList = [];
    this.IconPath = undefined;
    this.EnableIconPath = undefined;
    this.FrontIconPath = undefined;
    this.NiagaraPathList = [];
    this.KeyEnableNiagaraIndex = 0;
    this.KeyType = 0;
    this.DisableKeyOnPercent = 0;
    this.KeyInfoList = [];
  }
  Init(t, i) {
    this.Id = t;
    this.PrefabType = i.PrefabType;
    this.ExtraType = i.ExtraType;
    this.SlotNum = i.SlotNum;
    this.C$e(i.ExtraFloatParams, this.ExtraFloatParams);
    this.PrefabPath = i.PrefabPath.ToAssetPathName();
    this.AttributeId = i.AttributeId;
    this.MaxAttributeId = i.MaxAttributeId;
    this.BuffId = Number(i.BuffId);
    this.TagEnergyBarIdMap = this.g$e(i.TagEnergyBarIdMap);
    if (i.EffectColor) {
      t = i.EffectColor.split("#");
      this.EffectColor = t.shift();
      this.OtherEffectColorList = t;
    } else {
      this.EffectColor = undefined;
    }
    if (StringUtils_1.StringUtils.IsEmpty(i.PointColor)) {
      this.PointColor = undefined;
    } else {
      t = i.PointColor.split("#");
      this.PointColor = t[0];
      this.PointColorList = t;
    }
    this.IconPath = i.TexturePath.ToAssetPathName();
    this.EnableIconPath = i.EnableTexturePath.ToAssetPathName();
    this.FrontIconPath = i.FrontTexturePath.ToAssetPathName();
    this.ANn(i.NiagaraList, this.NiagaraPathList);
    this.KeyEnableNiagaraIndex = i.KeyEnableNiagaraIndex;
    if (this.KeyEnableNiagaraIndex >= this.NiagaraPathList.length && (this.KeyEnableNiagaraIndex = -1, Log_1.Log.CheckError())) {
      Log_1.Log.Error("Battle", 17, "能量条配置错误, 可用时粒子特效索引超出粒子数组长度", ["", i.Name], ["索引", this.KeyEnableNiagaraIndex], ["数组长度", this.NiagaraPathList.length]);
    }
    this.KeyType = i.KeyType;
    this.DisableKeyOnPercent = i.DisableKeyOnPercent / 100;
    if (i.KeyEnableTag && i.KeyEnableTag?.TagName !== StringUtils_1.NONE_STRING) {
      this.KeyEnableTagId = i.KeyEnableTag.TagId;
    } else {
      this.KeyEnableTagId = 0;
    }
    this.f$e(i.KeyInfoList);
  }
  f$e(i) {
    var s = i.Num();
    for (let t = 0; t < s; t++) {
      var e = i.Get(t);
      var r = new SpecialEnergyBarKeyInfo();
      r.Action = e.Action;
      r.ActionType = e.ActionType;
      this.KeyInfoList.push(r);
    }
  }
  g$e(i) {
    var s = new Map();
    var e = i.Num();
    if (!(e <= 0)) {
      for (let t = 0; t < e; t++) {
        var r = i.GetKey(t);
        var a = i.Get(r);
        s.set(r.TagId, a);
      }
    }
    return s;
  }
  C$e(i, s) {
    var e = i.Num();
    if (!(e <= 0)) {
      for (let t = 0; t < e; t++) {
        var r = i.Get(t);
        s.push(r);
      }
    }
  }
  ANn(i, s) {
    var e = i.Num();
    if (!(e <= 0)) {
      for (let t = 0; t < e; t++) {
        var r = i.Get(t);
        s.push(r.ToAssetPathName());
      }
    }
  }
}
exports.SpecialEnergyBarInfo = SpecialEnergyBarInfo;
class BattleUiSpecialEnergyBarData {
  constructor() {
    this.IsOpenLog = false;
    this.IsSpecialEnergyBarEditorModeOpen = false;
    this.p$e = undefined;
    this.EnvironmentPropertyList = [];
    this.SpecialEnergyBarInfoMap = new Map();
    this.gU = false;
    this.v$e = false;
  }
  Init() {}
  async Preload() {
    this.v$e = true;
    const i = new CustomPromise_1.CustomPromise();
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("SpecialEnergyBarInfoPath");
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, t => {
      if (this.v$e && (this.p$e = t)) {
        this.gU = true;
        i.SetResult(true);
      }
    });
    return i.Promise;
  }
  OnLeaveLevel() {
    this.gU = false;
    this.v$e = false;
    this.p$e = undefined;
    this.EnvironmentPropertyList.length = 0;
    this.SpecialEnergyBarInfoMap.clear();
  }
  Clear() {}
  GetSpecialEnergyBarInfo(i) {
    if (this.gU) {
      let t = this.SpecialEnergyBarInfoMap.get(i);
      var s;
      if (!t && !(s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.p$e, i.toString()), (t = new SpecialEnergyBarInfo()).Init(i, s), GlobalData_1.GlobalData.IsPlayInEditor)) {
        this.SpecialEnergyBarInfoMap.set(i, t);
      }
      return t;
    }
  }
}
exports.BattleUiSpecialEnergyBarData = BattleUiSpecialEnergyBarData;
//# sourceMappingURL=BattleUiSpecialEnergyBarData.js.map