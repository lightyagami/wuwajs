"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CdnServerDebugConfig = undefined;
const Info_1 = require("../../../Core/Common/Info");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TestModuleBridge_1 = require("../../Bridge/TestModuleBridge");
const PublicUtil_1 = require("../../Common/PublicUtil");
class CdnServerDebugConfig {
  constructor() {
    this.h3t = false;
    if (!Info_1.Info.IsBuildShipping) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(e => {
        if (e && e.CdnServerAddress) {
          this.l3t = e.CdnServerAddress;
        } else {
          this.h3t = false;
        }
      });
    }
  }
  TryGetMarqueeDebugUrl(e) {
    if (this.h3t) {
      return PublicUtil_1.PublicUtil.GetMarqueeUrl2(PublicUtil_1.PublicUtil.GetGameId(), this.l3t.MarqueeServerId);
    } else {
      return e;
    }
  }
  TryGetGachaDetailDebugUrl(e, t, r) {
    if (this.h3t) {
      return StringUtils_1.StringUtils.Format(e, this.l3t?.GachaDetailServerAddressPrefix, this.l3t?.GachaDetailServerId);
    } else {
      return StringUtils_1.StringUtils.Format(e, t, r);
    }
  }
  TryGetGachaRecordDebugUrl(e, t, r) {
    if (this.h3t) {
      return StringUtils_1.StringUtils.Format(e, this.l3t?.GachaRecordServerAddressPrefix, this.l3t?.GachaRecordServerId);
    } else {
      return StringUtils_1.StringUtils.Format(e, t, r);
    }
  }
  TryGetGachaInfoDebugUrl(e, t, r) {
    if (this.h3t) {
      return StringUtils_1.StringUtils.Format(e, this.l3t?.GachaInfoServerPrefixAddress, this.l3t?.GachaInfoServerId);
    } else {
      return StringUtils_1.StringUtils.Format(e, t, r);
    }
  }
  TryGetNoticeServerPrefixAddress(e) {
    if (this.h3t) {
      return this.l3t?.NoticeServerPrefixAddress;
    } else {
      return e;
    }
  }
}
(exports.CdnServerDebugConfig = CdnServerDebugConfig).Singleton = new CdnServerDebugConfig();
//# sourceMappingURL=CdnServerDebugConfig.js.map