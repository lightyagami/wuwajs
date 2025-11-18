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
class BattleUiFormationData {
  constructor() {
    this.sXe = undefined;
    this.EnvironmentPropertyList = [];
    this.UiEnvironmentPropertyMap = new Map();
    this.gU = false;
    this.ORn = undefined;
    this.doh = 0;
    this.Coh = false;
    this.buc = false;
    this.$C1 = false;
  }
  Init() {
    this.gU = true;
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("EnvironmentPropertyInfoPath");
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.DataTable, t => {
      if (this.gU && (this.sXe = t)) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(t, e);
        for (const o of e) {
          var i;
          var r = Number(o);
          if (r) {
            i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, o);
            this.UiEnvironmentPropertyMap.set(r, i);
            this.EnvironmentPropertyList.push(r);
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
  GetUiEnvironmentProperty(t) {
    if (this.gU) {
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        return DataTableUtil_1.DataTableUtil.GetDataTableRow(this.sXe, t.toString());
      } else {
        return this.UiEnvironmentPropertyMap.get(t);
      }
    }
  }
  AddFollower(e) {
    if (e !== this.ORn) {
      this.FRn();
      var i = (this.ORn = e).Entity.GetComponent(226);
      let t = i?.AimType;
      t = t || (followerMap.get(e.PbDataId) ?? 0);
      this.doh = t;
      this.goh(i?.IsEnable ?? false);
    }
  }
  RemoveFollower() {
    this.FRn();
  }
  ChangePlayerFollowerEnable(t) {
    if (this.ORn) {
      this.goh(t);
    }
  }
  goh(t) {
    if (this.Coh !== t) {
      this.Coh = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiFollowerAimStateChanged, t, this.doh === 0);
      if (this.doh === 1) {
        if (this.Coh) {
          ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(1);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetFollowShootAimVisible, t);
      } else if (this.doh === 3) {
        if (this.Coh) {
          ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(2);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, t);
      } else if (this.doh === 4) {
        if (this.Coh) {
          ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(3);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetFollowShootAutoAimVisible, t);
      } else if (this.doh === 5) {
        if (this.Coh) {
          ControllerHolder_1.ControllerHolder.HudUnitController.TryCreateHud(8);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetTDFollowShootAimVisible, t);
      }
    }
  }
  GetFollowType() {
    return this.doh;
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
    if (this.doh === 1) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(1);
    } else if (this.doh === 3) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(2);
    } else if (this.doh === 4) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(3);
    } else if (this.doh === 5) {
      ControllerHolder_1.ControllerHolder.HudUnitController.TryDestroyHud(8);
    }
    this.doh = 0;
  }
  get AutoMovingSettingEnable() {
    return this.buc;
  }
  set AutoMovingSettingEnable(t) {
    if (this.buc !== t) {
      this.buc = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AutoMovingSettingChanged, t);
    }
  }
  get AutoSprintSettingEnable() {
    return this.$C1;
  }
  set AutoSprintSettingEnable(t) {
    if (this.$C1 !== t) {
      this.$C1 = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AutoSprintSettingChanged, t);
    }
  }
}
exports.BattleUiFormationData = BattleUiFormationData;
//# sourceMappingURL=BattleUiFormationData.js.map