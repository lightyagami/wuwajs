"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRoleSelectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const WeeklyRogueRoleDynamicContainer_1 = require("../Components/WeeklyRogueRoleDynamicContainer");
const WeeklyRogueRoleDynamicItem_1 = require("../Components/WeeklyRogueRoleDynamicItem");
const WeeklyRogueRolePosItem_1 = require("../Components/WeeklyRogueRolePosItem");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
const WeeklyRoguePreviewRoleData_1 = require("../WeeklyRoguePreviewRoleData");
class WeeklyRogueRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.DLu = undefined;
    this.BLu = undefined;
    this.DynamicRoleGroupLayout = undefined;
    this.R3u = undefined;
    this.adi = undefined;
    this.Vlo = [];
    this.NLu = undefined;
    this.p5t = () => {
      var e = this.VLu();
      if (e.length === 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("NoRole");
      } else {
        ModelManager_1.ModelManager.WeeklyRogueModel.SelectRoleIdList = e;
        UiLayer_1.UiLayer.SetShowMaskLayer("WeeklyRogueRoleSelectView.RogueWeeklyArtifactSelectStart", true);
        WeeklyRogueController_1.WeeklyRogueController.Instance.RogueWeeklyArtifactSelectStartRequest().finally(() => {
          UiLayer_1.UiLayer.SetShowMaskLayer("WeeklyRogueRoleSelectView.RogueWeeklyArtifactSelectStart", false);
        });
      }
    };
    this.jLu = () => {
      if (this.NLu) {
        var t = this.NLu.IsTrialRole();
        var i = this.NLu.GetDataId();
        const r = this.VLu();
        let e = [i];
        i = {
          AgentType: 0,
          SelectRoleId: i,
          RoleIdList: e = t ? e : r.concat(this.Vlo.filter(e => !e.IsTrialRole() && !r.includes(e.GetDataId())).map(e => e.GetDataId())),
          TeamPositionType: 2
        };
        ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainViewByParam(i);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CharacterDetailsTip");
      }
    };
    this.oV_ = () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueRewardPreviewView", undefined, (e, t) => {
        if (e && UiManager_1.UiManager.IsViewShow("WeeklyRogueActivityView")) {
          UiManager_1.UiManager.GetViewByName("WeeklyRogueActivityView")?.AddChildViewById(t);
        }
      });
    };
    this.SY_ = () => {
      var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityDataNew?.GetCycleConfig();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.HelpId);
    };
    this.Hlo = e => {
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var i = new Array();
      for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
        if (t.has(e)) {
          i.push(t.get(e));
        }
      }
      for (const r of e) {
        if (!i.includes(r)) {
          i.push(r);
        }
      }
      this.DynamicRoleGroupLayout.RefreshByData(this.w3u(i));
    };
    this.L3u = () => {
      var e = new WeeklyRogueRoleDynamicContainer_1.WeeklyRogueRoleDynamicContainer();
      e.RefreshRole = this.A3u;
      return e;
    };
    this.A3u = e => {
      this.NLu = e;
      this.P3u();
    };
    this.x3u = () => {
      var e = new WeeklyRogueRolePosItem_1.WeeklyRogueRolePosItem();
      e.OnBtnClickFunc = this.D3u;
      return e;
    };
    this.D3u = e => {
      if (e) {
        var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
        var i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
        for (const r of t) {
          if (r[1] === e) {
            t.delete(r[0]);
            i.delete(e.GetDataId());
            break;
          }
        }
        this.DynamicRoleGroupLayout.GetScrollItemItems().forEach(e => {
          e.Refresh();
        });
        this.P3u();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDynScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UISprite], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem]];
    this.BtnBindInfo = [[8, this.oV_]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpCallBack(this.SY_);
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.DLu = new ButtonItem_1.ButtonItem();
    e.push(this.DLu.CreateThenShowByActorAsync(this.GetItem(16).GetOwner()));
    this.DLu.SetFunction(this.p5t);
    this.BLu = new ButtonItem_1.ButtonItem();
    e.push(this.BLu.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()));
    this.BLu.SetFunction(this.jLu);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(17), this.Hlo);
    e.push(this.U3u());
    this.R3u = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.x3u);
    this.P3u();
    await Promise.all(e);
    await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Power]);
    this.lqe.SetCurrencyItemBtnFunction(ItemDefines_1.EItemId.Power, () => {
      ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView();
    });
    this.lqe.SetHelpBtnActive(true);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
    var t = e.GetCycleConfig();
    this.GetText(7).SetText(e.GetCycleBlackFlowerCost().toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.BuffDesc, ...t.BuffDescParam);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "WeRougeFormationMonsterLevel", e.GetLvInfo());
    this.SetItemIcon(this.GetTexture(6), ItemDefines_1.EItemId.Power);
    this.adi.UpdateData(39, this.Vlo);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.WeeklyRogueModel.SelectRoleIdList.length = 0;
    this.adi?.Destroy();
    this.adi = undefined;
  }
  async U3u() {
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    this.Vlo = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    for (const e of ModelManager_1.ModelManager.WeeklyRogueModel.GetAllRecommendRole()) {
      if (ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e) === undefined) {
        this.Vlo.push(new WeeklyRoguePreviewRoleData_1.WeeklyRoguePreviewRoleData(e));
      }
    }
    this.DynamicRoleGroupLayout = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(1), this.GetItem(2), new WeeklyRogueRoleDynamicItem_1.WeeklyRogueRoleDynamicItem(), this.L3u);
    await this.DynamicRoleGroupLayout.Init();
    this.DynamicRoleGroupLayout.RefreshByData(this.w3u(this.Vlo));
  }
  w3u(e = this.Vlo) {
    var t = [];
    var i = this.B3u(e, true);
    var r = i.length === 0;
    var o = {
      TitleId: "WeRougeFormationRecommendedRole",
      IsUp: true,
      ScoreRate: ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.GetScoreRate(),
      IsEmpty: i.length === 0
    };
    t.push({
      IsTitleType: true,
      TitleInfo: o
    });
    if (!r) {
      t.push({
        IsTitleType: false,
        DataList: i
      });
    }
    var o = this.B3u(e, false);
    var r = o.length === 0;
    t.push({
      IsTitleType: true,
      TitleInfo: {
        TitleId: "WeRougeFormationOtherRole",
        IsUp: false,
        IsEmpty: r
      }
    });
    if (!r) {
      t.push({
        IsTitleType: false,
        DataList: o
      });
    }
    return t;
  }
  B3u(e, t) {
    var i = new Array();
    for (const r of e) {
      if (t === ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(r.GetDataId())) {
        i.push(r);
      }
    }
    return i.sort((e, t) => {
      return (e.IsTrialRole() ? 1 : 0) - (t.IsTrialRole() ? 1 : 0);
    });
  }
  VLu() {
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    var i = new Array();
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var r = t.get(e);
      if (r) {
        r = r.GetDataId();
        i.push(r);
      }
    }
    return i;
  }
  P3u() {
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    let i = false;
    var r = new Array();
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var o = {};
      if (t.has(e) && (o.Data = t.get(e), o.IsRecommend = ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(o.Data.GetDataId()), !i) && o.IsRecommend) {
        i = true;
      }
      r.push(o);
    }
    this.R3u.RefreshByData(r);
    this.k3u(i);
  }
  k3u(e) {
    var t;
    var i;
    var r = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
    if (r && (t = r.GetCycleConfig())) {
      r = r.GetScoreRate();
      t = e ? t.MaxScore : t.BaseScore;
      this.GetItem(12).SetUIActive(true);
      (i = this.GetSprite(13)).SetChangeColor(e, i.changeColor);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "WeRougeFormationIntegralMultiplier", r);
      (i = this.GetText(3)).SetText(t.toString());
      i.SetChangeColor(e, i.changeColor);
      this.GetItem(4).SetUIActive(e);
    }
  }
}
exports.WeeklyRogueRoleSelectView = WeeklyRogueRoleSelectView;
//# sourceMappingURL=WeeklyRogueRoleSelectView.js.map