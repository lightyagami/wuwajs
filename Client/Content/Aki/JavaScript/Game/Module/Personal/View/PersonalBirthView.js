"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalBirthView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const CircleAttachView_1 = require("../../AutoAttach/CircleAttachView");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalBirthAttachItem_1 = require("./PersonalBirthAttachItem");
const SHOW_GAP = 2;
const MONTH_COUNT = 12;
class PersonalBirthView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.A5i = undefined;
    this.P5i = undefined;
    this.x5i = undefined;
    this.w5i = undefined;
    this.B5i = [1, 3, 5, 7, 8, 10, 12];
    this.b5i = 31;
    this.q5i = 30;
    this.G5i = 29;
    this.N5i = false;
    this.O5i = false;
    this.mHt = () => {
      var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SetBirthSuccess");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
      this.CloseMe();
    };
    this.OnLeftButtonClicked = () => {
      this.CloseMe();
    };
    this.OnRightButtonClicked = () => {
      var i;
      if (this.IsSetBirth()) {
        this.CloseMe();
      } else {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(109)).FunctionMap.set(2, () => {
          var i = TimeUtil_1.TimeUtil.GetServerTimeStamp() / TimeUtil_1.TimeUtil.InverseMillisecond;
          var i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(i);
          PersonalController_1.PersonalController.SendBirthdayInitRequest(Number(i.Year) * 10000 + this.x5i * 100 + this.w5i);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
    this.OnMonthButtonClick = () => {
      if (!this.IsSetBirth()) {
        this.k5i();
        this.N5i = true;
      }
    };
    this.OnDayButtonClick = () => {
      if (!this.IsSetBirth()) {
        if (this.N5i) {
          this.F5i();
          this.O5i = true;
        }
      }
    };
    this.CloseClick = () => {
      this.CloseMe();
    };
    this.V5i = (i, t, e) => {
      i = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(i);
      i.BindOnSelected(this.H5i);
      return i;
    };
    this.H5i = i => {
      this.x5i = i;
      this.GetText(6).SetText(String(i));
      if (this.O5i) {
        if (this.w5i !== undefined) {
          this.GetButton(5).SetSelfInteractive(true);
          this.GetInteractionGroup(14).SetInteractable(true);
          this.w5i = 1;
          this.GetText(7).SetText(String(this.w5i));
        }
        this.F5i();
      }
    };
    this.j5i = (i, t, e) => {
      i = new PersonalBirthAttachItem_1.PersonalBirthAttachItem(i);
      i.BindOnSelected(this.W5i);
      return i;
    };
    this.W5i = i => {
      this.w5i = i;
      if (this.x5i !== undefined) {
        this.GetButton(5).SetSelfInteractive(true);
        this.GetInteractionGroup(14).SetInteractable(true);
      }
      this.GetText(7).SetText(String(i));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIText], [13, UE.UIExtendToggle], [14, UE.UIInteractionGroup]];
    this.BtnBindInfo = [[4, this.OnLeftButtonClicked], [5, this.OnRightButtonClicked]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthChange, this.mHt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthChange, this.mHt);
  }
  IsSetBirth() {
    var i = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    return !!ModelManager_1.ModelManager.BirthdayModel.GetBirthdayIsReset() && !!i && i !== 0;
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "AcquireCancel");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "PrefabTextItem_1541715829_Text");
    var i = this.GetText(6);
    i.SetUIActive(true);
    var t = this.GetText(7);
    t.SetUIActive(true);
    if (this.IsSetBirth()) {
      r = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
      e = Math.floor(r / 100);
      r = r % 100;
      i.SetText(String(e));
      t.SetText(String(r));
      this.GetButton(5).SetSelfInteractive(true);
      this.GetInteractionGroup(14).SetInteractable(true);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "BirthIsSetCanNotChange");
    } else {
      this.x5i = 1;
      this.w5i = 1;
      i.SetText(String(this.x5i));
      t.SetText(String(this.w5i));
      this.GetButton(5).SetSelfInteractive(false);
      this.GetInteractionGroup(14).SetInteractable(false);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "SetBirthCanNotChange");
      this.OnMonthButtonClick();
      this.OnDayButtonClick();
    }
    var e = ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay();
    var r = e ? 1 : 0;
    this.GetExtendToggle(13)?.SetToggleState(r);
  }
  k5i() {
    var i = this.GetItem(0);
    var t = this.GetItem(1);
    this.A5i = new CircleAttachView_1.CircleAttachView(i.GetOwner(), true);
    this.A5i.CreateItems(t.GetOwner(), SHOW_GAP, this.V5i, 1);
    var e = [];
    for (let i = 1; i <= MONTH_COUNT; i++) {
      e.push(i);
    }
    this.A5i.ReloadView(e.length, e);
    t.SetUIActive(false);
  }
  F5i() {
    var i = this.GetItem(2);
    var t = this.GetItem(3);
    if (!this.P5i) {
      this.P5i = new CircleAttachView_1.CircleAttachView(i.GetOwner(), true);
      this.P5i.CreateItems(t.GetOwner(), SHOW_GAP, this.j5i, 1);
    }
    var e = this.K5i(this.x5i);
    var r = [];
    for (let i = 1; i <= e; i++) {
      r.push(i);
    }
    this.P5i.ReloadView(r.length, r);
    t.SetUIActive(false);
  }
  K5i(t) {
    if (t === 2) {
      return this.G5i;
    }
    var e = this.B5i.length;
    for (let i = 0; i < e; i++) {
      if (this.B5i[i] === t) {
        return this.b5i;
      }
    }
    return this.q5i;
  }
  OnTick(i) {
    super.OnTick(i);
  }
  OnAfterShow() {}
  OnBeforeHide() {
    var i = this.GetExtendToggle(13)?.GetToggleState() === 1;
    if (i !== ModelManager_1.ModelManager.PersonalModel.GetBirthdayDisplay()) {
      PersonalController_1.PersonalController.SendBirthdayShowSetRequest(i);
    }
  }
  OnBeforeDestroy() {
    this.A5i?.Clear();
    this.P5i?.Clear();
  }
}
exports.PersonalBirthView = PersonalBirthView;
//# sourceMappingURL=PersonalBirthView.js.map