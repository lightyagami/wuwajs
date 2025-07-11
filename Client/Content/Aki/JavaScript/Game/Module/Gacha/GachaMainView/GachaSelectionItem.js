"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaSelectionItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleController_1 = require("../../RoleUi/RoleController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
class GachaSelectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$be = undefined;
    this.Pe = undefined;
    this.TDe = undefined;
    this.Qjt = undefined;
    this.Xjt = false;
    this.ToggleCallBack = undefined;
    this.CanToggleChange = undefined;
    this.N8e = () => {
      this.ToggleCallBack?.(this.GridIndex);
    };
    this.Ijt = () => {
      var i;
      var e = this.Qjt.ShowIdList[0];
      var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (this.Xjt) {
        i = [e.TrialId];
        RoleController_1.RoleController.OpenRoleMainView(1, 0, i);
      } else {
        (i = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(e.TrialId);
        e = {
          WeaponDataList: [i],
          SelectedIndex: 0
        };
        UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
      }
    };
    this.RefreshLeftTime = () => {
      if (this.TDe) {
        TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
      var i = this.GetText(6);
      var e = this.Pe.GachaInfo;
      var t = this.Pe.PoolInfo.Id;
      var e = e.GetPoolEndTimeByPoolId(t);
      if (e === 0 || (t = e - TimeUtil_1.TimeUtil.GetServerTime()) <= 0) {
        i.SetUIActive(false);
      } else {
        i.SetUIActive(true);
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t);
        i.SetText(e.CountDownText);
        if ((t = e.RemainingTime) > 0) {
          i = t;
          this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(this.RefreshLeftTime, i * 1000, undefined, undefined, false);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIHorizontalLayout], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem]];
    this.BtnBindInfo = [[8, this.Ijt], [0, this.N8e]];
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(4));
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
  }
  Refresh(i, e, t) {
    var r = (this.Pe = i).GachaInfo;
    var s = i.PoolInfo.Id;
    this.GetItem(9)?.SetUIActive(r.UsePoolId === s);
    var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(s);
    var a = (this.Qjt = r).Type;
    this.Xjt = ModelManager_1.ModelManager.GachaModel.IsRolePool(a);
    var a = r.ShowIdList[0];
    var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(a);
    this.SetTextureByPath(r.GachaResultViewTexture, this.GetTexture(1));
    this.GetText(5)?.SetText(i.GachaInfo.GetPoolInfo(s).Title);
    this.RefreshLeftTime();
    if (this.Xjt) {
      this.$jt();
    } else {
      this.Yjt();
    }
    if (e) {
      this.GetExtendToggle(0)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0);
    }
  }
  OnSelected(i) {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(i) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  $jt() {
    var i = this.Qjt.ShowIdList[0];
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.Name);
    this.GetItem(2)?.SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaElementTexturePath(i.ElementId);
    this.SetElementIcon(e, this.GetTexture(3), i.ElementId);
    var e = i.QualityId;
    this.$be?.RebuildLayout(e);
  }
  Yjt() {
    var i;
    var e;
    var t = this.Qjt;
    this.GetItem(2)?.SetUIActive(true);
    var t = t.ShowIdList[0];
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t);
    if (t) {
      i = ConfigManager_1.ConfigManager.GachaConfig?.GetGachaWeaponTransformConfig(t.WeaponType);
      e = new UE.Vector(0.6, 0.6, 0.6);
      this.GetTexture(3).SetUIItemScale(e);
      this.SetTextureByPath(i.WeaponTypeTexture, this.GetTexture(3));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.WeaponName);
      e = t.QualityId;
      this.$be?.RebuildLayout(e);
    }
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.GachaSelectionItem = GachaSelectionItem;
//# sourceMappingURL=GachaSelectionItem.js.map