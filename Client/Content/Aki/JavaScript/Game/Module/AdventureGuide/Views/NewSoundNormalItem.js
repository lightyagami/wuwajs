"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundNormalItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const NewSoundNormaPhantomItem_1 = require("./NewSoundNormaPhantomItem");
class NewSoundNormalItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.B8e = undefined;
    this.b8e = () => new NewSoundNormaPhantomItem_1.NewSoundNormaPhantomItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.B8e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.b8e);
  }
  Update(t) {
    var i = t.DetectRecordData;
    var a = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(a, i.Conf.Name);
    var a = this.GetTexture(1);
    var r = this.GetText(2);
    this.Co_(t);
    if (i.Conf.Secondary === 63 || i.Conf.Secondary === 64) {
      var t = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(i.SilentAreaDetectionRecord);
      let e = [0, 0];
      if ((e = t ? (t = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(i.Conf.Id, i.Type, i.Conf.PreOpenId), ModelManager_1.ModelManager.AdventureGuideModel.GetNightMarePreOpenTarget(t.InstanceID)) : ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(i.SilentAreaDetectionRecord?.Conf?.MapId, i.SilentAreaDetectionRecord?.Conf?.LevelPlayList?.[0]))[1] < 0) {
        r?.SetText("");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, "NightMareLeftTimes", e[0], e[1]);
      }
      this.SetTextureShowUntilLoaded(i.Conf.BigIcon, a);
    } else {
      t = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByData(i);
      if (i.IsLock && !t) {
        this.SetTextureShowUntilLoaded(i.Conf.LockBigIcon, a);
        LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.Conf.AttributesDescriptionUnlock);
        this.B8e?.SetActive(false);
        return;
      }
      this.SetTextureShowUntilLoaded(i.Conf.BigIcon, a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, i.Conf.InstanceSubTypeDescription);
    }
    if (i.Conf.Secondary === 22 && i.Conf.PhantomId && i.Conf.PhantomId.length !== 0) {
      this.B8e?.SetActive(true);
      this.B8e?.RefreshByData(i.Conf.PhantomId);
    } else {
      this.B8e?.SetActive(false);
    }
  }
  Co_(e) {
    e = e.TracingList?.includes(e.DetectRecordData.Conf.Id) ?? false;
    this.GetItem(5)?.SetUIActive(e);
  }
}
exports.NewSoundNormalItem = NewSoundNormalItem;
//# sourceMappingURL=NewSoundNormalItem.js.map