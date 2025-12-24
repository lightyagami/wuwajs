"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleComponent = undefined;
const UE = require("ue");
const PlayerTitleById_1 = require("../../../../Core/Define/ConfigQuery/PlayerTitleById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalPlayerTitleItem_1 = require("./PersonalPlayerTitleItem");
const PersonalPlayerTitleMiniPreView_1 = require("./PersonalPlayerTitleMiniPreView");
class PersonalPlayerTitleComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.Jac = undefined;
    this.p5i = undefined;
    this.ZKd = undefined;
    this.P7e = undefined;
    this.eXd = -1;
    this.Zac = () => {
      this.RefreshScrollView();
      this.RefreshConfirmBtnState();
    };
    this.ehc = () => {
      var e = new PersonalPlayerTitleItem_1.PersonalPlayerTitleItem();
      e.SetToggleCallBack(this.thc);
      return e;
    };
    this.thc = (e, t) => {
      this.Jac = t;
      this.RefreshPlayerTitleInfo();
      this.xqe.SelectGridProxy(e);
    };
    this.OnClickConfirm = () => {
      let e = this.Jac.PlayerTitleId;
      if (this.p5i.CurPlayerTitleId === e) {
        e = 0;
      }
      PersonalController_1.PersonalController.SendChangePlayerTitleRequest(e);
    };
    this.yVd = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenTitleTipsByItemId(this.Jac.PlayerTitleId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.yVd]];
  }
  async OnBeforeStartAsync() {
    this.ZKd = new PersonalPlayerTitleMiniPreView_1.PersonalPlayerTitleMiniPreView();
    await this.ZKd.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.ehc, true);
    this.AddEventListener();
  }
  async OnBeforeShowAsyncImplement() {
    var e = this.fwd();
    await this.xqe.RefreshByDataAsync(e);
    this.Jac = e[0];
    this.xqe.SelectGridProxy(0);
    this.xqe.ScrollToGridIndex(0);
    this.RefreshPlayerTitleInfo();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerTitleChange, this.Zac);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerTitleChange, this.Zac);
  }
  SetPersonalInfoData(e) {
    this.p5i = e;
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  RefreshPlayerTitleInfo() {
    var e;
    var t;
    var i;
    var r;
    this.GetItem(7)?.SetActive(this.Jac !== undefined);
    if (this.Jac) {
      e = PlayerTitleById_1.configPlayerTitleById.GetConfig(this.Jac.PlayerTitleId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleName);
      t = this.GetText(3);
      if (this.Jac.IsUnLock) {
        t.SetUIActive(true);
        r = e.Id;
        i = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(r);
        r = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleInfoString(r, i, true);
        t.SetText(r);
      } else {
        t.SetUIActive(false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Description);
      if (e.IsShowProgress) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ItemAccess, this.Jac.CurProgress, this.Jac.TargetProgress);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ItemAccess);
      }
      i = this.Jac.UnlockTime;
      r = this.GetItem(8);
      if (i) {
        r.SetUIActive(true);
        this.GetText(6).SetText(TimeUtil_1.TimeUtil.DateFormat4String(i / 1000));
      } else {
        r.SetUIActive(false);
      }
      this.RefreshConfirmBtnState();
      this.ZKd.RefreshView(this.Jac);
    }
  }
  RefreshScrollView() {
    var e = this.fwd();
    this.xqe.RefreshByData(e);
    let t = 0;
    t = (t = this.eXd !== -1 && this.p5i.CurPlayerTitleId <= 0 ? e.findIndex(e => e.PlayerTitleId === this.eXd) : t) < 0 ? 0 : t;
    this.xqe.SelectGridProxy(t);
    this.xqe.ScrollToGridIndex(t);
    this.eXd = this.p5i.CurPlayerTitleId;
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.xqe.GetGrid(t), true);
  }
  RefreshConfirmBtnState() {
    var e = this.p5i.CurPlayerTitleId;
    var t = this.Jac.IsUnLock;
    if (this.P7e) {
      this.P7e(t, e === this.Jac.PlayerTitleId);
    }
  }
  fwd() {
    var t = [...ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleList()];
    var i = t.findIndex(e => e.PlayerTitleId === this.p5i.CurPlayerTitleId);
    if (!(i <= 0) && !(t.length <= i)) {
      var e = t[i];
      for (let e = i; e > 0; e--) {
        t[e] = t[e - 1];
      }
      t[0] = e;
    }
    return t;
  }
}
exports.PersonalPlayerTitleComponent = PersonalPlayerTitleComponent;
//# sourceMappingURL=PersonalPlayerTitleComponent.js.map