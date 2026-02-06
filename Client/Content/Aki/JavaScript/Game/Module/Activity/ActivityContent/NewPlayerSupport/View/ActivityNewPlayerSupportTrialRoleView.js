"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportTrialRoleView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const RoleController_1 = require("../../../../RoleUi/RoleController");
const RoleTagMediumIconItem_1 = require("../../../../RoleUi/RoleTag/RoleTagMediumIconItem");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityRoleDescribeComponent_1 = require("../../UniversalComponents/ActivityRoleDescribeComponent");
const ActivityNewPlayerSupportDefine_1 = require("../ActivityNewPlayerSupportDefine");
const NewPlayerSupportRoleCommonItem_1 = require("./NewPlayerSupportRoleCommonItem");
const NewPlayerSupportRoleSpineItem_1 = require("./NewPlayerSupportRoleSpineItem");
const NewPlayerSupportTrialRoleListComponent_1 = require("./NewPlayerSupportTrialRoleListComponent");
class ActivityNewPlayerSupportTrialRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.nOf = undefined;
    this.uNf = undefined;
    this.aOf = undefined;
    this.hOf = new Map();
    this.lOf = undefined;
    this._Of = undefined;
    this.jUa = undefined;
    this.yil = undefined;
    this.$pt = undefined;
    this.Ygg = false;
    this.C5t = undefined;
    this.zgg = 30000;
    this.LoadingSequencePlayer = undefined;
    this.lyt = () => {
      if (!this.Ygg) {
        this.CloseMe();
      }
    };
    this.uOf = e => {
      e = this.yil.GetTrialRoleByGroupId(e);
      if (e) {
        this.uNf = e;
        this.cNf();
      }
    };
    this.wjf = (e, i) => {
      var t = this.uNf.TrialRoleId;
      if ((ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? []).includes(t)) {
        this.Jgg();
      } else {
        this.Zgg();
      }
    };
    this.Pjf = (e, i, t) => {
      var s = this.uNf.TrialRoleId;
      this.t5t(s !== e && s === i);
    };
    this.fOf = () => {
      if (!this.Ygg) {
        var e = [];
        for (const t of this.yil.GetTrialRoleList()) {
          e.push(t.GetPreviewTrialRoleId());
        }
        var i = this.uNf?.GetPreviewTrialRoleId();
        RoleController_1.RoleController.OpenRoleMainView(1, i, e, undefined);
      }
    };
    this.gOf = () => {
      var e;
      if (!this.Ygg) {
        if (ModelManager_1.ModelManager.TrialRoleModel.CheckCanOperateTrialRole() && (this.uNf?.CanUpgrade() ?? false) && (e = this.uNf?.TrialRoleId)) {
          this.yil.GetRequestTrialRoleLvUpFunc()?.(e);
        }
      }
    };
    this.pOf = () => {
      var e;
      if (!this.Ygg) {
        if (ModelManager_1.ModelManager.TrialRoleModel.CheckCanOperateTrialRole() && (e = this.uNf?.TrialRoleId)) {
          this.yil.GetRequestSetCurUseTrialRoleFunc()?.(e, this.R3g);
        }
      }
    };
    this.R3g = e => {
      var i = this.uNf.TrialRoleId;
      if (!(ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? []).includes(i) && !ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(426)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.EditFormationController.OpenEditFormationView();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
    this.vOf = () => {
      if (!this.Ygg) {
        ControllerHolder_1.ControllerHolder.EditFormationController.OpenEditFormationView();
      }
    };
    this._ti = () => {
      if (!this.Ygg) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.yil.HelpId);
      }
    };
    this.CIf = (e, i) => {
      if (i === "Sequence_Role_Switch") {
        this.g0o();
      }
    };
    this.eCg = (e, i) => {
      if (i === "Sequence_Change_Number") {
        i = this.uNf.TrialRoleConfig;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Text_PlayerLevelNum_Text", i.Level);
      }
    };
    this.tCg = () => !this.Ygg;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIText], [18, UE.UIItem]];
    this.BtnBindInfo = [[16, this.fOf], [11, this.gOf], [4, this.pOf], [5, this.vOf], [8, this._ti]];
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    await this.yOf();
    this.SOf();
    this.U4m();
    this.nOf.RefreshDefaultSelected(this.yil.SelectedGroupId);
  }
  OnBeforeDestroy() {
    this.$pt = undefined;
    this.LoadingSequencePlayer = undefined;
    this.GetItem(3)?.GetOwner()?.OnSequencePlayEvent.Unbind();
    this.RootActor?.OnSequencePlayEvent.Unbind();
    this.hOf.clear();
    this.BCe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCurTrialRoleGroupChanged, this.wjf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGroupTrialRoleChanged, this.Pjf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCurTrialRoleGroupChanged, this.wjf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGroupTrialRoleChanged, this.Pjf);
  }
  async yOf() {
    this.nOf = new NewPlayerSupportTrialRoleListComponent_1.NewPlayerSupportTrialRoleListComponent(this.yil);
    this.nOf.SetSelectRoleItemCallback(this.uOf);
    this.nOf.SetCanSelectRoleItemCallback(this.tCg);
    await this.nOf.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  SOf() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(this.yil.CaptionText);
    this.lqe.SetTitleIcon(this.yil.CaptionIcon);
  }
  U4m() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetItem(3).GetOwner().OnSequencePlayEvent.Bind(this.CIf);
    this.RootActor.OnSequencePlayEvent.Bind(this.eCg);
    this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(18));
  }
  async cNf() {
    await this.cOf(true);
    this.t5t();
    this.xjt();
  }
  async cOf(e = false) {
    var i = this.uNf.TrialRoleConfig;
    if (StringUtils_1.StringUtils.IsBlank(i.SpinePrefabResource)) {
      await this.MOf();
    } else {
      await this.EOf();
    }
    if (e) {
      this.$pt.StopPlayingSequence(false, true);
      this.$pt.PlayLevelSequenceByName("Role_Switch", true);
    } else {
      this.g0o();
    }
  }
  g0o() {
    var e;
    var i;
    var t = this.uNf.TrialRoleConfig;
    for ([e, i] of this.hOf) {
      i.SetUiActive(e === t.GroupId);
    }
    this.lOf?.Update(t);
  }
  t5t(e = false) {
    this.GetItem(18).SetUIActive(false);
    var i = this.uNf.TrialRoleId;
    var t = this.uNf.TrialRoleGroupId;
    var s = this.uNf.RealRoleId;
    var r = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialRoleConfigByRoleId(s).RoleStand;
    const o = this.GetTexture(2);
    this.SetTextureByPath(r, o, undefined, () => {
      o.SetSizeFromTexture();
    });
    var r = this.IOf(s);
    if (!StringUtils_1.StringUtils.IsBlank(r)) {
      this.GetTexture(1)?.SetColor(UE.Color.FromHex(r));
    }
    this.TOf();
    this.bOf();
    var s = this.uNf.CanUpgrade() ?? false;
    var r = this.uNf.IsUnlocked() ?? false;
    var i = this.yil.GetCurUseTrialRoleId() === i;
    this.GetItem(10).SetUIActive(!r);
    this.GetButton(11).RootUIComp.SetUIActive(s);
    this.GetItem(12).SetUIActive(s);
    this.GetItem(9).SetUIActive(r && i);
    this.GetButton(5).RootUIComp.SetUIActive(r && i);
    this.GetButton(4).RootUIComp.SetUIActive(r && !i);
    if (!r) {
      s = this.yil.GetTrialRoleGroupUnlockDesc(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), s);
    }
    var i = this.uNf.GetPreviewTrialRoleId();
    var r = ConfigManager_1.ConfigManager.TrialRoleConfig.GetTrialRoleConfig(i);
    var t = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Text_WorldLevelNum_Text", t);
    if (e) {
      this.$pt.PlayLevelSequenceByName("Saoguang");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Text_PlayerLevelNum_Text", r.Level);
    }
  }
  async TOf() {
    var e = this.uNf?.TrialRoleId;
    var e = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetRoleConfigByTrialRoleId(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e);
    var i = e !== undefined && e.length > 0;
    this.GetItem(14)?.SetUIActive(i);
    if (i) {
      if (!this._Of) {
        this._Of = new RoleTagMediumIconItem_1.RoleTagMediumIconItem();
        i = this.GetItem(14).GetOwner();
        await this._Of.CreateThenShowByActorAsync(i);
      }
      this._Of.Refresh(e[0], false, 0);
    }
  }
  async bOf() {
    if (!this.jUa) {
      this.jUa = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
      e = this.GetItem(13).GetOwner();
      await this.jUa.CreateThenShowByActorAsync(e);
    }
    var e = this.uNf?.RealRoleId;
    this.jUa.Update(e);
  }
  async EOf() {
    var e;
    var i = this.uNf.TrialRoleConfig;
    var t = i.GroupId;
    let s = this.hOf.get(t);
    if (!s) {
      s = new NewPlayerSupportRoleSpineItem_1.NewPlayerSupportRoleSpineItem();
      i = i.SpinePrefabResource;
      e = this.GetItem(3);
      await s.CreateByResourceIdAsync(i, e);
      this.hOf.set(t, s);
    }
    this.lOf = s;
  }
  async MOf() {
    var e;
    var i;
    if (!this.aOf) {
      e = new NewPlayerSupportRoleCommonItem_1.NewPlayerSupportRoleCommonItem();
      i = this.GetItem(3);
      await e.CreateThenShowByResourceIdAsync("UiItem_BaseGachaPool", i);
      this.aOf = e;
    }
    this.lOf = this.aOf;
  }
  xjt() {
    this.lOf?.PlaySwitchSeq();
  }
  IOf(e) {
    return ActivityNewPlayerSupportDefine_1.roleBgColor[e];
  }
  Zgg() {
    this.t5t();
  }
  async Jgg() {
    if (!this.Ygg) {
      await this.iCg();
      this.Zgg();
    }
  }
  E5t() {
    if (!this.C5t) {
      this.GetItem(18).SetUIActive(true);
      UiLayer_1.UiLayer.SetShowMaskLayer("TrialRoleViewClosing", true);
      this.LoadingSequencePlayer.PlaySequence("Progressing");
      this.C5t = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.GetItem(18).SetUIActive(false);
        UiLayer_1.UiLayer.SetShowMaskLayer("TrialRoleViewClosing", false);
      }, this.zgg);
    }
  }
  async iCg() {
    this.Ygg = true;
    this.E5t();
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    this.BCe();
    this.GetItem(18).SetUIActive(false);
    UiLayer_1.UiLayer.SetShowMaskLayer("TrialRoleViewClosing", false);
    this.Ygg = false;
  }
  BCe() {
    if (this.C5t) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.C5t)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.C5t);
      }
      this.C5t = undefined;
    }
  }
}
exports.ActivityNewPlayerSupportTrialRoleView = ActivityNewPlayerSupportTrialRoleView;
//# sourceMappingURL=ActivityNewPlayerSupportTrialRoleView.js.map