"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGenderChangeView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MainRoleController_1 = require("../MainRoleController");
class RoleGenderChangeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ylo = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("GenderTransferSuccess");
      this.CloseMe();
    };
    this.OnClickCancel = () => {
      this.CloseMe();
    };
    this.OnClickConfirm = () => {
      var e;
      if (Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(209)?.HasTag(1996802261)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CanNotTransferInFight"));
        this.CloseMe();
      } else if (ModelManager_1.ModelManager.RoleModel.HasAnyTrialRole()) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_CanNotChangeSexWhenTrail_Text");
        this.CloseMe();
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(240)).FunctionMap.set(2, () => {
          this.Tkl();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIInteractionGroup]];
    this.BtnBindInfo = [[2, this.OnClickCancel], [3, this.OnClickConfirm]];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      var o = ModelManager_1.ModelManager.WorldLevelModel.Sex;
      var t = r.ElementId;
      var o = o === LoginDefine_1.ELoginSex.Boy ? LoginDefine_1.ELoginSex.Girl : LoginDefine_1.ELoginSex.Boy;
      var a = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(o);
      var l = a.length;
      let i = undefined;
      let n = undefined;
      for (let e = 0; e < l; e++) {
        var s = a[e];
        var _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s.Id);
        if (t === _.ElementId) {
          n = s.Id;
          i = _;
          break;
        }
      }
      if (i) {
        this.SetRoleIcon(r.RoleHeadIconBig, this.GetTexture(0), e);
        this.SetRoleIcon(i.RoleHeadIconBig, this.GetTexture(1), n);
        o = ModelManager_1.ModelManager.MainRoleModel.CanChangeSex();
        this.GetInteractionGroup(7)?.SetInteractable(o);
        r = CommonParamById_1.configCommonParamById.GetIntConfig("ChangeSexCd");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "GenderTransfer", Math.round(r / TimeUtil_1.TimeUtil.Hour));
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "Cancel");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "Confirm");
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  Tkl() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.Sex === LoginDefine_1.ELoginSex.Boy ? LoginDefine_1.ELoginSex.Girl : LoginDefine_1.ELoginSex.Boy;
    MainRoleController_1.MainRoleController.SendRoleSexChangeRequest(e);
  }
}
exports.RoleGenderChangeView = RoleGenderChangeView;
//# sourceMappingURL=RoleGenderChangeView.js.map