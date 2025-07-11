"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailScrollItemNew = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DAY_GAP = 7;
class MailScrollItemNew extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H5e = undefined;
    this.UIi = undefined;
    this.AIi = undefined;
    this.SelectTrigger = false;
    this.IsInit = false;
    this.Xy = -1;
    this.Pe = undefined;
    this.OnExtendToggleStateChanged = i => {
      if (i === 1) {
        this?.UIi(this.Xy, this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  Update(i, t) {
    this.Xy = t;
    this.Pe = i;
    if (this.SelectTrigger) {
      this.OnSelected(true);
      this.SelectTrigger = false;
    } else if (t === this.AIi?.()) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
    this.GetText(2).SetText(i.Title);
    this.GetText(4).SetText(i.Sender);
    var e;
    var t = TimeUtil_1.TimeUtil.CalculateDayGapBetweenNow(i.Time, i.Time > TimeUtil_1.TimeUtil.GetServerTime());
    if (t > DAY_GAP) {
      e = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(i.Time);
      this.GetText(5).SetText(`${e.Year}/${e.Month}/${e.Day}`);
    } else if (t >= 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Text_FriendOfflineSomeDay_Text", t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Text_Today_Text");
    }
    this.GetItem(6).SetUIActive(!i.GetWasScanned());
    this.GetItem(3).SetUIActive(i.GetMailLevel() === 2);
    if (i.GetWasScanned() || i.GetAttachmentStatus() !== 2) {
      if (i.GetWasScanned() && i.GetAttachmentStatus() === 2) {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconRewardA");
        this.SetSpriteByPath(e, this.GetSprite(0), false);
        this.GetItem(7).SetAlpha(1);
      } else if (i.GetWasScanned() && i.GetAttachmentStatus() === 1) {
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconRewardB");
        this.SetSpriteByPath(t, this.GetSprite(0), false);
        this.GetItem(7).SetAlpha(0.4);
      } else if (i.GetWasScanned() || i.GetAttachmentStatus() !== 0) {
        if (i.GetWasScanned() && i.GetAttachmentStatus() === 0) {
          e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconMailB");
          this.SetSpriteByPath(e, this.GetSprite(0), false);
          this.GetItem(7).SetAlpha(0.4);
        }
      } else {
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconMailA");
        this.SetSpriteByPath(t, this.GetSprite(0), false);
        this.GetItem(7).SetAlpha(1);
      }
    } else {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconRewardA");
      this.SetSpriteByPath(i, this.GetSprite(0), false);
      this.GetItem(7).SetAlpha(1);
    }
  }
  BindSelectCall(i) {
    this.UIi = i;
  }
  BindGetSelectedIndexFunction(i) {
    this.AIi = i;
  }
  OnSelected(i) {
    this.RootActor.GetComponentByClass(UE.UIExtendToggle.StaticClass()).SetToggleState(1, i);
  }
  OnDeselected(i) {
    this.SelectTrigger = false;
    this.RootActor.GetComponentByClass(UE.UIExtendToggle.StaticClass()).SetToggleState(0, i);
  }
  GetUsingItem(i) {
    return this.GetRootItem().GetOwner();
  }
  async Init(i) {
    await super.CreateByActorAsync(i.GetOwner(), undefined, true);
    this.H5e = this.RootActor.GetComponentByClass(UE.UIExtendToggle.StaticClass());
    this.H5e.OnStateChange.Add(this.OnExtendToggleStateChanged);
    this.IsInit = true;
  }
  ClearItem() {
    this.H5e.OnStateChange.Clear();
    this.UIi = undefined;
    this.Destroy();
  }
}
exports.MailScrollItemNew = MailScrollItemNew;
//# sourceMappingURL=MailScrollItemNew.js.map