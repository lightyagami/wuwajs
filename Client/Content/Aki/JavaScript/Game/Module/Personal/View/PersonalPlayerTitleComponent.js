"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PlayerTitleById_1 = require("../../../../Core/Define/ConfigQuery/PlayerTitleById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalPlayerTitleItem_1 = require("./PersonalPlayerTitleItem");
class PersonalPlayerTitleComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.Jac = undefined;
    this.p5i = undefined;
    this.P7e = undefined;
    this.Zac = () => {
      this.RefreshConfirmBtnState();
    };
    this.ehc = () => {
      var e = new PersonalPlayerTitleItem_1.PersonalPlayerTitleItem();
      e.SetToggleCallBack(this.thc);
      return e;
    };
    this.thc = (e, i) => {
      this.Jac = i;
      this.RefreshPlayerTitleInfo();
      this.xqe.SelectGridProxy(e);
    };
    this.OnClickConfirm = () => {
      let e = this.Jac.PlayerTitleId;
      if (this.p5i.CurPlayerTitleId === e) {
        e = 0;
      }
      PersonalController_1.PersonalController.SendChangePlayerTitleRequest(e);
      UiManager_1.UiManager.CloseView("PersonalEditView");
      UiManager_1.UiManager.CloseView("PersonalOptionView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.ehc, true);
    this.AddEventListener();
  }
  async OnBeforeShowAsyncImplement() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleList();
    await this.xqe.RefreshByDataAsync(e);
    let i = 0;
    const t = this.p5i.CurPlayerTitleId;
    if (t && t > 0 && (i = e.findIndex(e => e.PlayerTitleId === t)) < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Personal", 71, "称号id错误", ["playerTitleId", t]);
      }
    } else {
      this.Jac = e[i];
      this.xqe.SelectGridProxy(i);
      this.xqe.ScrollToGridIndex(i);
      this.RefreshPlayerTitleInfo();
    }
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
    var i;
    var t;
    var r;
    this.GetItem(7)?.SetActive(this.Jac !== undefined);
    if (this.Jac) {
      e = PlayerTitleById_1.configPlayerTitleById.GetConfig(this.Jac.PlayerTitleId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleName);
      i = this.GetText(3);
      if (this.Jac.IsUnLock) {
        i.SetUIActive(true);
        r = e.Id;
        t = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(r);
        r = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleInfoString(r, t, true);
        i.SetText(r);
      } else {
        i.SetUIActive(false);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Description);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.ItemAccess);
      t = this.Jac.UnlockTime;
      r = this.GetItem(8);
      if (t) {
        r.SetUIActive(true);
        this.GetText(6).SetText(TimeUtil_1.TimeUtil.DateFormat4String(t / 1000));
      } else {
        r.SetUIActive(false);
      }
      this.RefreshConfirmBtnState();
    }
  }
  RefreshConfirmBtnState() {
    var e = this.p5i.CurPlayerTitleId;
    var i = this.Jac.IsUnLock;
    if (this.P7e) {
      this.P7e(i, e === this.Jac.PlayerTitleId);
    }
  }
}
exports.PersonalPlayerTitleComponent = PersonalPlayerTitleComponent;
//# sourceMappingURL=PersonalPlayerTitleComponent.js.map