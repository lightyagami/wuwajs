"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityBeginnerTargetItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityController_1 = require("../../ActivityController");
const RoleController_1 = require("../../../RoleUi/RoleController");
class ActivityBeginnerTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.aNe = [-1, ""];
    this.hNe = false;
    this.lNe = -1;
    this.DataId = -1;
    this._Ne = undefined;
    this.uNe = () => {
      var e;
      if (this.hNe) {
        switch (this.aNe[0] - 1) {
          case 0:
            UiManager_1.UiManager.OpenView("QuestView", this.aNe[1]);
            break;
          case 1:
            var r = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(Number(this.aNe[1]));
            if (r) {
              r = {
                MarkType: r.ObjectType,
                MarkId: r.MarkId,
                OpenFogId: 0
              };
              WorldMapController_1.WorldMapController.OpenView(1, false, r);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Activity", 5, "配置了错误的鸣域新程", ["Type: ", this.aNe[0]], ["Parma: ", this.aNe[1]]);
            }
            break;
          case 2:
            if (this.aNe[1] === "RoleRootView") {
              RoleController_1.RoleController.OpenRoleMainView(0);
            } else {
              UiManager_1.UiManager.OpenView(this.aNe[1]);
            }
            break;
          case 3:
            r = this.aNe[1];
            RoleController_1.RoleController.OpenRoleMainView(0, 0, [], r);
            break;
          case 4:
            r = {
              TabViewName: this.aNe[1],
              Param: undefined
            };
            UiManager_1.UiManager.OpenView("CalabashRootView", r);
            break;
          case 5:
            ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(Number(this.aNe[1]), 0);
            break;
          case 6:
            ActivityController_1.ActivityController.OpenActivityById(Number(this.aNe[1]));
            break;
          case 7:
            ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(this.aNe[1]);
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Activity", 5, "配置了错误的鸣域新程", ["Type: ", this.aNe[0]], ["type: ", this.aNe[1]]);
            }
        }
      } else {
        e = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(this.lNe).HintText;
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText]];
    this.BtnBindInfo = [[4, this.uNe]];
  }
  OnStart() {
    this._Ne = new SmallItemGrid_1.SmallItemGrid();
    this._Ne.Initialize(this.GetItem(2).GetOwner());
  }
  Refresh(e, r, i) {
    this.DataId = e;
    e = ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(e);
    this.cNe(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.SourceTitle);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.SourceDesc);
    this.lNe = e.ConditionId;
    if (!(e.JumpTo.size <= 0)) {
      for (var [t, a] of e.JumpTo) {
        this.aNe[0] = t;
        this.aNe[1] = a;
      }
    }
  }
  cNe(r) {
    switch (r.SourceType) {
      case 1:
        var e = {
          Data: undefined,
          Type: 4,
          ItemConfigId: ConfigManager_1.ConfigManager.WeaponConfig?.GetTrialWeaponConfig(r.SourceId)?.WeaponId
        };
        this._Ne?.Apply(e);
        this._Ne?.BindOnExtendToggleClicked(() => {
          var e = new WeaponTrialData_1.WeaponTrialData();
          e.SetTrialId(r.SourceId);
          var e = {
            WeaponDataList: [e],
            SelectedIndex: 0
          };
          UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
        });
        break;
      case 3:
        e = {
          Data: undefined,
          Type: 4,
          ItemConfigId: r.SourceId
        };
        this._Ne?.Apply(e);
        this._Ne?.BindOnExtendToggleClicked(() => {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(r.SourceId);
        });
        break;
      case 0:
        e = {
          Data: undefined,
          Type: 2,
          ItemConfigId: r.SourceId
        };
        this._Ne?.Apply(e);
        this._Ne?.BindOnExtendToggleClicked(() => {
          var e = [r.SourceId];
          RoleController_1.RoleController.OpenRoleMainView(1, 0, e);
        });
        break;
      case 2:
        e = {
          Data: undefined,
          Type: 3,
          ItemConfigId: r.SourceId
        };
        this._Ne?.Apply(e);
        this._Ne?.BindOnExtendToggleClicked(() => {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(r.SourceId);
        });
    }
  }
  SetEnableJump(e) {
    this.hNe = e;
  }
  SetFinish(e) {
    this.GetItem(0)?.SetUIActive(!e);
    this.GetItem(1)?.SetUIActive(e);
    this.GetItem(3)?.SetUIActive(e);
    this.GetButton(4)?.RootUIComp.SetUIActive(!e);
  }
}
exports.ActivityBeginnerTargetItem = ActivityBeginnerTargetItem;
//# sourceMappingURL=ActivityBeginnerTargetItem.js.map