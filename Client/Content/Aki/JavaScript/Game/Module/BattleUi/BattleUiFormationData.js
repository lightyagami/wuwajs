"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiFormationData = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const followerMap = new Map([[658750002, 1], [658750003, 1], [658750000, 2]]);
class FollowHudInfo {
  constructor(e, t) {
    this.HudUnitType = e;
    this.EventName = t;
  }
}
const followTypeToHudInfo = new Map([[1, new FollowHudInfo(1, EventDefine_1.EEventName.SetFollowShootAimVisible)], [3, new FollowHudInfo(2, EventDefine_1.EEventName.SetFollowShootAutoAimVisible)], [4, new FollowHudInfo(3, EventDefine_1.EEventName.SetFollowShootAutoAimVisible)], [5, new FollowHudInfo(9, EventDefine_1.EEventName.SetTDFollowShootAimVisible)], [6, new FollowHudInfo(4, EventDefine_1.EEventName.SetFollowShootAutoAimVisible)]]);
class BattleUiFormationData {
  constructor() {
    this.sXe = undefined;
    this.EnvironmentPropertyList = [];
    this.UiEnvironmentPropertyMap = new Map();
    this.gU = false;
    this.ORn = undefined;
    this.doh = 0;
    this.z$f = "";
    this.Coh = false;
    this.buc = false;
    this.$C1 = false;
  }
  Init() {
    this.gU = true;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("EnvironmentPropertyInfoPath");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, e => {
      if (this.gU && (this.sXe = e)) {
        var t = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
        for (const n of t) {
          var o;
          var i = Number(n);
          if (i) {
            o = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, n);
            this.UiEnvironmentPropertyMap.set(i, o);
            this.EnvironmentPropertyList.push(i);
          }
        }
      }
    });
  }
  OnLeaveLevel() {}
  Clear() {
    this.gU = false;
    this.sXe = undefined;
    this.EnvironmentPropertyList.length = 0;
    this.UiEnvironmentPropertyMap.clear();
    this.FRn();
    this.AutoMovingSettingEnable = false;
  }
  GetUiEnvironmentProperty(e) {
    if (this.gU) {
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        return DataTableUtil_1.DataTableUtil.GetDataTableRow(this.sXe, e.toString());
      } else {
        return this.UiEnvironmentPropertyMap.get(e);
      }
    }
  }
  AddFollower(t) {
    if (t !== this.ORn) {
      this.FRn();
      var o = (this.ORn = t).Entity.GetComponent(234);
      let e = o?.FollowShooterConfig?.AimType;
      e = e || (followerMap.get(t.PbDataId) ?? 0);
      this.doh = e;
      this.z$f = o?.FollowShooterConfig?.SightResId ?? "";
      this.goh(o?.GetEnable() ?? false);
    }
  }
  RefreshFollowerConfig(e) {
    this.FRn();
    this.AddFollower(e);
  }
  RemoveFollower() {
    this.FRn();
  }
  ChangePlayerFollowerEnable(e) {
    if (this.ORn) {
      this.goh(e);
    }
  }
  goh(e) {
    var t;
    if (this.Coh !== e && (this.Coh = e, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, e, this.doh === 0), followTypeToHudInfo.has(this.doh))) {
      t = followTypeToHudInfo.get(this.doh);
      if (this.Coh) {
        ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(t.HudUnitType);
      }
      EventSystem_1.EventSystem.Emit(t.EventName, e);
    }
  }
  GetFollowType() {
    return this.doh;
  }
  GetSightResId() {
    return this.z$f;
  }
  GetFollowerAiming() {
    return this.Coh && this.doh !== 2;
  }
  GetFollowerEnable() {
    return this.Coh;
  }
  GetFollowerEntityHandle() {
    return this.ORn;
  }
  FRn() {
    if (this.Coh) {
      this.goh(false);
    }
    this.ORn = undefined;
    if (followTypeToHudInfo.has(this.doh)) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(followTypeToHudInfo.get(this.doh).HudUnitType);
    }
    this.doh = 0;
  }
  get AutoMovingSettingEnable() {
    return this.buc;
  }
  set AutoMovingSettingEnable(e) {
    if (this.buc !== e) {
      this.buc = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AutoMovingSettingChanged, e);
    }
  }
  get AutoSprintSettingEnable() {
    return this.$C1;
  }
  set AutoSprintSettingEnable(e) {
    if (this.$C1 !== e) {
      this.$C1 = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AutoSprintSettingChanged, e);
    }
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map