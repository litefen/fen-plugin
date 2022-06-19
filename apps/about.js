
import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version, changelogs } from "../components/Changelog.js";
const _path = process.cwd();

export const rule = {
  //帮助说明
  about: {
    reg: "^#?(粉酱)(详情|说明|使用说明)$",
    priority: 100,
    describe: "【#粉酱详情】 #粉酱详情",
  },
  cookiehelp: {
    reg: "^#?(cookie|功能)(详情|帮助|说明|使用说明|演示)$",
    priority: 100,
    describe: "",
  },
  fenversion: {
    reg: "^#?粉酱版本$",
    priority: 100,
    describe: "粉酱版本",
  },
  //代替自带的演示文档
  bothelp: {
    reg: "^#?(晴酱|bot|帮助|使用)(详情|说明使用文档|文档|演示)$",
    priority: 10,
    describe: "粉酱版本",
  },
};

let aboutImg, aboutMd5;

let useImg = false;

export async function about(e) {
  e.reply("粉酱fen-plugin插件\n项目地址：https://github.com/litefen/fen-plugin");
  return true;
}
export async function cookiehelp(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "cookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html",
  ];
  e.reply(msg);
}
export function fenversion(e) {
  e.reply(`当前版本：v${version}`);
  return true;
}

export async function bothelp(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "cookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html",
  ];
  e.reply(msg);
}
