"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportEntranceItem = exports.ActivityNewPlayerSupportSubView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityNewPlayerSupportTaskItem_1 = require("./ActivityNewPlayerSupportTaskItem");
class ActivityNewPlayerSupportSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.Qqf = undefined;
    this.dNe = false;
    this.Ftl = "";
    this.P5f = "";
    this.qoh = undefined;
    this.cQf = undefined;
    this.dQf = undefined;
    this.mQf = undefined;
    this.Kqf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.OpenTrialRoleView();
    };
    this.I_1 = () => new ActivityNewPlayerSupportTaskItem_1.ActivityNewPlayerSupportTaskItem();
    this.Bmf = () => {
      this.Xqf();
    };
    this.Yqf = () => {
      this.zqf();
    };
    this.fQf = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 3,
        OpenType: 1
      });
    };
    this.gQf = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 1,
        OpenType: 1
      });
    };
    this.CQf = () => {
      UiManager_1.UiManager.OpenView("ActivityRegressMainView", {
        SubView: 4,
        OpenType: 1
      });
    };
  }
  OnSetData() {
    this.CNe = this.ActivityBaseData;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Kqf]];
  }
  async OnBeforeStartAsync() {
    this.dQf = new ActivityNewPlayerSupportEntranceItem();
    this.dQf.SetEntranceFunc(this.fQf);
    await this.dQf.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.dQf.BindRedDot("RedDotNewPlayerSupportAdventure");
    this.cQf = new ActivityNewPlayerSupportEntranceItem();
    this.cQf.SetEntranceFunc(this.gQf);
    await this.cQf.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    this.mQf = new ActivityNewPlayerSupportEntranceItem();
    this.mQf.SetEntranceFunc(this.CQf);
    await this.mQf.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  OnStart() {
    this.Ftl = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    this.P5f = CommonParamById_1.configCommonParamById.GetStringConfig("NewPlayerSupportTrialRoleChosenDesc");
    this.qoh = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.I_1);
    this.Qqf = this.GetText(1);
    this.dNe = this.CNe.EndShowTime !== 0;
    this.Qqf.SetUIActive(this.dNe);
    this.GetText(0).SetText(this.CNe.GetTitle());
    this.GetText(2).SetText(this.CNe.GetDesc());
    RedDotController_1.RedDotController.BindRedDot("RedDotNewPlayerSupportTrialRoleEntrance", this.GetItem(12));
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("RedDotNewPlayerSupportTrialRoleEntrance", this.GetItem(12));
  }
  OnBeforeShow() {
    this.zqf();
    this.Xqf();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportEntranceRedDotUpdate);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityNewPlayerSupportTaskUpdate, this.Bmf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityNewPlayerSupportCurTrialRoleChange, this.Yqf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityNewPlayerSupportTaskUpdate, this.Bmf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityNewPlayerSupportCurTrialRoleChange, this.Yqf);
  }
  OnRefreshView() {
    this.zqf();
    this.Xqf();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportEntranceRedDotUpdate);
  }
  pNe(e) {
    if (this.dNe !== e) {
      this.dNe = e;
      this.Qqf.SetUIActive(e);
    }
  }
  fNe() {
    var [e, t] = this.A5f();
    this.pNe(e);
    if (e) {
      this.Qqf.SetText(t);
    }
  }
  A5f() {
    if (this.CNe.CheckIfInShowTime()) {
      return [true, ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, this.Ftl)];
    } else {
      return [false, ""];
    }
  }
  OnTimer(e) {
    this.fNe();
  }
  zqf() {
    var e = this.CNe.CurUseTrialRoleData;
    var t = e !== undefined;
    const i = this.GetTexture(4);
    i.SetUIActive(t);
    var r = this.GetText(11);
    r.SetUIActive(t);
    var s = this.GetText(13);
    s.SetUIActive(!t);
    var n = this.GetItem(14);
    var a = this.GetItem(15);
    if (t) {
      e = (t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetRoleConfigByTrialRoleId(e.TrialRoleId)).FormationRoleCard;
      this.SetTextureByPath(e, i, undefined, () => {
        i.SetSizeFromTexture();
      });
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) ?? "";
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.P5f) ?? "";
      r.SetText(`${e} <color=#e6efff><size=-6>${t}</size></color>`);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, this.P5f);
      n.SetUIActive(false);
      a.SetUIActive(false);
    } else {
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      n.SetUIActive(r === 1);
      a.SetUIActive(r === 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "PrefabTextItem_436156489_Text");
    }
  }
  Xqf() {
    var t = this.CNe?.GetTaskDataList();
    if (t) {
      var i = t.length;
      var r = [];
      for (let e = 0; e < i; ++e) {
        r.push({
          TaskData: t[e],
          ShowDecoration: e !== i - 1
        });
      }
      this.qoh?.RefreshByData(r);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    var i;
    var e = e[0];
    if (e === "NewPlayer_Award" || e.includes("NewPlayer_AwardSlot")) {
      i = (t = this.qoh?.GetLayoutItemByIndex(0))?.GetReceiveBtn();
      if (e === "NewPlayer_Award") {
        if (i) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if ((e = t?.GetGuideUiItem("0")) && i) {
        return [i, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.ActivityNewPlayerSupportSubView = ActivityNewPlayerSupportSubView;
class ActivityNewPlayerSupportEntranceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pQf = () => {};
    this.l4e = undefined;
    this.vQf = () => {
      this.pQf?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.vQf]];
  }
  OnBeforeDestroy() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(2));
      this.l4e = undefined;
    }
  }
  SetEntranceFunc(e) {
    this.pQf = e;
  }
  BindRedDot(e) {
    this.l4e = e;
    RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(2));
  }
}
exports.ActivityNewPlayerSupportEntranceItem = ActivityNewPlayerSupportEntranceItem;
//# sourceMappingURL=ActivityNewPlayerSupportSubView.js.map