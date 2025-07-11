"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSetModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const BattleUiSetController_1 = require("./BattleUiSetController");
const BattleUiSetDefine_1 = require("./BattleUiSetDefine");
const BattleUiSetPanelData_1 = require("./BattleUiSetPanelData");
const BattleUiSetPanelItemData_1 = require("./BattleUiSetPanelItemData");
class BattleUiSetModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ugt = new Map();
    this.cgt = new Map();
    this.SelectedPanelItemData = undefined;
    this.mgt = new Map();
    this.MinTouchMoveDifference = 0;
    this.MaxTouchMoveDifference = 0;
    this.MaxTouchMoveValue = 0;
    this.MinTouchMoveValue = 0;
    this.ControlScaleRate = 0;
  }
  OnInit() {
    var t = ConfigManager_1.ConfigManager.BattleUiSetConfig;
    for (let e = BattleUiSetDefine_1.PANEL_MIN_INDEX; e < BattleUiSetDefine_1.PANEL_MAX_INDEX; e++) {
      var a = [];
      for (const i of t.GetMobileBattleUiSetConfigList(e)) {
        var o = i.Id;
        var r = new BattleUiSetPanelItemData_1.BattleUiSetPanelItemData(i.ItemIndex, i);
        a.push(r);
        this.cgt.set(o, r);
      }
      var n = new BattleUiSetPanelData_1.BattleUiSetPanelData(e, a);
      this.ugt.set(e, n);
    }
    this.MinTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MinTouchMoveDifference");
    this.MaxTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MaxTouchMoveDifference");
    this.MaxTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MaxTouchMoveValue");
    this.MinTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MinTouchMoveValue");
    this.ControlScaleRate = CommonParamById_1.configCommonParamById.GetFloatConfig("ControlScaleRate");
    return true;
  }
  OnClear() {
    this.ugt.clear();
    this.cgt.clear();
    return !(this.SelectedPanelItemData = undefined);
  }
  GetPanelDataMap() {
    return this.ugt;
  }
  GetPanelItemDataMap() {
    return this.cgt;
  }
  GetPanelItemDataByConfigId(e) {
    return this.cgt.get(e);
  }
  SetPanelItemSelected(e) {
    if (e && e.CanEdit) {
      this.SelectedPanelItemData = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectedEditPanelItem, this.SelectedPanelItemData);
    }
  }
  ResetSettings() {
    for (const e of this.GetPanelItemDataMap().values()) {
      e.EditSize = e.SourceSize;
      e.EditAlpha = e.SourceAlpha;
      e.EditOffsetX = e.SourceOffsetX;
      e.EditOffsetY = e.SourceOffsetY;
      e.EditorHierarchyIndex = e.SourceHierarchyIndex;
    }
  }
  SaveSettings() {
    var e = [];
    for (const s of this.GetPanelItemDataMap().values()) {
      var t = s.EditSize;
      var a = s.EditAlpha;
      var o = s.EditOffsetX;
      var r = s.EditOffsetY;
      var n = s.EditorHierarchyIndex;
      var i = {
        s5n: s.ConfigId,
        M8n: t,
        S8n: a,
        E8n: o,
        y8n: r,
        I8n: n,
        T8n: 0
      };
      s.Size = t;
      s.Alpha = a;
      s.OffsetX = o;
      s.OffsetY = r;
      s.HierarchyIndex = n;
      e.push(i);
    }
    BattleUiSetController_1.BattleUiSetController.MobileButtonSettingUpdateRequest(e);
  }
  ReInitSettings() {
    for (const e of this.GetPanelItemDataMap().values()) {
      e.ReInit();
    }
  }
  AddTouchFingerData(e) {
    var t = e.GetFingerIndex();
    this.mgt.set(t, e);
  }
  RemoveTouchFingerData(e) {
    e = e.GetFingerIndex();
    this.mgt.delete(e);
  }
  GetTouchFingerDataCount() {
    return this.mgt.size;
  }
  GetTouchFingerData(e) {
    return this.mgt.get(e);
  }
}
exports.BattleUiSetModel = BattleUiSetModel;
//# sourceMappingURL=BattleUiSetModel.js.map