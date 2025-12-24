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
    this.bDf = undefined;
    this.CBf = undefined;
    this.LDf = undefined;
    this.wDf = new Map();
    this.PDf = undefined;
    this.ADf = undefined;
    this.jUa = undefined;
    this.yil = undefined;
    this.$pt = undefined;
    this.iJf = false;
    this.C5t = undefined;
    this.rJf = 30000;
    this.LoadingSequencePlayer = undefined;
    this.lyt = () => {
      if (!this.iJf) {
        this.CloseMe();
      }
    };
    this.DDf = e => {
      e = this.yil.GetTrialRoleByGroupId(e);
      if (e) {
        this.CBf = e;
        this.pBf();
      }
    };
    this.C3f = (e, i) => {
      var t = this.CBf.TrialRoleId;
      if ((ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? []).includes(t)) {
        this.oJf();
      } else {
        this.nJf();
      }
    };
    this.p3f = (e, i, t) => {
      var s = this.CBf.TrialRoleId;
      this.t5t(s !== e && s === i);
    };
    this.kDf = () => {
      if (!this.iJf) {
        var e = [];
        for (const t of this.yil.GetTrialRoleList()) {
          e.push(t.GetPreviewTrialRoleId());
        }
        var i = this.CBf?.GetPreviewTrialRoleId();
        RoleController_1.RoleController.OpenRoleMainView(1, i, e, undefined);
      }
    };
    this.qDf = () => {
      var e;
      if (!this.iJf) {
        if (ModelManager_1.ModelManager.TrialRoleModel.CheckCanOperateTrialRole() && (this.CBf?.CanUpgrade() ?? false) && (e = this.CBf?.TrialRoleId)) {
          this.yil.GetRequestTrialRoleLvUpFunc()?.(e);
        }
      }
    };
    this.GDf = () => {
      var e;
      if (!this.iJf) {
        if (ModelManager_1.ModelManager.TrialRoleModel.CheckCanOperateTrialRole() && (e = this.CBf?.TrialRoleId)) {
          this.yil.GetRequestSetCurUseTrialRoleFunc()?.(e);
        }
      }
    };
    this.FDf = () => {
      if (!this.iJf) {
        ControllerHolder_1.ControllerHolder.EditFormationController.OpenEditFormationView();
      }
    };
    this._ti = () => {
      if (!this.iJf) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.yil.HelpId);
      }
    };
    this.LSf = (e, i) => {
      if (i === "Sequence_Role_Switch") {
        this.g0o();
      }
    };
    this.sJf = (e, i) => {
      if (i === "Sequence_Change_Number") {
        i = this.CBf.TrialRoleConfig;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Text_PlayerLevelNum_Text", i.Level);
      }
    };
    this.aJf = () => !this.iJf;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIText], [18, UE.UIItem]];
    this.BtnBindInfo = [[16, this.kDf], [11, this.qDf], [4, this.GDf], [5, this.FDf], [8, this._ti]];
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    await this.NDf();
    this.VDf();
    this.m3m();
    this.bDf.RefreshDefaultSelected(this.yil.SelectedGroupId);
  }
  OnBeforeDestroy() {
    this.$pt = undefined;
    this.LoadingSequencePlayer = undefined;
    this.GetItem(3)?.GetOwner()?.OnSequencePlayEvent.Unbind();
    this.RootActor?.OnSequencePlayEvent.Unbind();
    this.wDf.clear();
    this.BCe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCurTrialRoleGroupChanged, this.C3f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGroupTrialRoleChanged, this.p3f);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCurTrialRoleGroupChanged, this.C3f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGroupTrialRoleChanged, this.p3f);
  }
  async NDf() {
    this.bDf = new NewPlayerSupportTrialRoleListComponent_1.NewPlayerSupportTrialRoleListComponent(this.yil);
    this.bDf.SetSelectRoleItemCallback(this.DDf);
    this.bDf.SetCanSelectRoleItemCallback(this.aJf);
    await this.bDf.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  VDf() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(this.yil.CaptionText);
    this.lqe.SetTitleIcon(this.yil.CaptionIcon);
  }
  m3m() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetItem(3).GetOwner().OnSequencePlayEvent.Bind(this.LSf);
    this.RootActor.OnSequencePlayEvent.Bind(this.sJf);
    this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(18));
  }
  async pBf() {
    await this.UDf(true);
    this.t5t();
    this.xjt();
  }
  async UDf(e = false) {
    var i = this.CBf.TrialRoleConfig;
    if (StringUtils_1.StringUtils.IsBlank(i.SpinePrefabResource)) {
      await this.HDf();
    } else {
      await this.jDf();
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
    var t = this.CBf.TrialRoleConfig;
    for ([e, i] of this.wDf) {
      i.SetUiActive(e === t.GroupId);
    }
    this.PDf?.Update(t);
  }
  t5t(e = false) {
    this.GetItem(18).SetUIActive(false);
    var i = this.CBf.TrialRoleId;
    var t = this.CBf.TrialRoleGroupId;
    var s = this.CBf.RealRoleId;
    var r = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialRoleConfigByRoleId(s).RoleStand;
    const o = this.GetTexture(2);
    this.SetTextureByPath(r, o, undefined, () => {
      o.SetSizeFromTexture();
    });
    var r = this.$Df(s);
    if (!StringUtils_1.StringUtils.IsBlank(r)) {
      this.GetTexture(1)?.SetColor(UE.Color.FromHex(r));
    }
    this.WDf();
    this.QDf();
    var s = this.CBf.CanUpgrade() ?? false;
    var r = this.CBf.IsUnlocked() ?? false;
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
    var i = this.CBf.GetPreviewTrialRoleId();
    var r = ConfigManager_1.ConfigManager.TrialRoleConfig.GetTrialRoleConfig(i);
    var t = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Text_WorldLevelNum_Text", t);
    if (e) {
      this.$pt.PlayLevelSequenceByName("Saoguang");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Text_PlayerLevelNum_Text", r.Level);
    }
  }
  async WDf() {
    var e = this.CBf?.TrialRoleId;
    var e = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetRoleConfigByTrialRoleId(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e);
    var i = e !== undefined && e.length > 0;
    this.GetItem(14)?.SetUIActive(i);
    if (i) {
      if (!this.ADf) {
        this.ADf = new RoleTagMediumIconItem_1.RoleTagMediumIconItem();
        i = this.GetItem(14).GetOwner();
        await this.ADf.CreateThenShowByActorAsync(i);
      }
      this.ADf.Refresh(e[0], false, 0);
    }
  }
  async QDf() {
    if (!this.jUa) {
      this.jUa = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
      e = this.GetItem(13).GetOwner();
      await this.jUa.CreateThenShowByActorAsync(e);
    }
    var e = this.CBf?.RealRoleId;
    this.jUa.Update(e);
  }
  async jDf() {
    var e;
    var i = this.CBf.TrialRoleConfig;
    var t = i.GroupId;
    let s = this.wDf.get(t);
    if (!s) {
      s = new NewPlayerSupportRoleSpineItem_1.NewPlayerSupportRoleSpineItem();
      i = i.SpinePrefabResource;
      e = this.GetItem(3);
      await s.CreateByResourceIdAsync(i, e);
      this.wDf.set(t, s);
    }
    this.PDf = s;
  }
  async HDf() {
    var e;
    var i;
    if (!this.LDf) {
      e = new NewPlayerSupportRoleCommonItem_1.NewPlayerSupportRoleCommonItem();
      i = this.GetItem(3);
      await e.CreateThenShowByResourceIdAsync("UiItem_BaseGachaPool", i);
      this.LDf = e;
    }
    this.PDf = this.LDf;
  }
  xjt() {
    this.PDf?.PlaySwitchSeq();
  }
  $Df(e) {
    return ActivityNewPlayerSupportDefine_1.roleBgColor[e];
  }
  nJf(e = true) {
    this.t5t();
    if (e && !ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(426)).FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.EditFormationController.OpenEditFormationView();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
  }
  async oJf() {
    if (!this.iJf) {
      await this.hJf();
      this.nJf(false);
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
      }, this.rJf);
    }
  }
  async hJf() {
    this.iJf = true;
    this.E5t();
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    this.BCe();
    this.GetItem(18).SetUIActive(false);
    UiLayer_1.UiLayer.SetShowMaskLayer("TrialRoleViewClosing", false);
    this.iJf = false;
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