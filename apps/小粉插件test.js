import { segment } from "oicq";
import fetch from "node-fetch";
import fs from "fs";
//项目路径
const _path = process.cwd();
//1.定义命令规则
export const rule = {
  help: {
    reg: "^#*(小影|影酱|bot|机器人)详情$", //匹配消息正则，命令正则
    //"^11$" 关键词11
    //
    priority: 800, //优先级，越小优先度越高
    describe: "帮助文档", //【命令】功能说明【#例子】开发简单示例演示

  },
  yuyin: {
    reg: "^#?(语音列表)$", //匹配消息正则，命令正则
    //"^11$" 关键词11
    //
    priority: 800, //优先级，越小优先度越高
    describe: "语音列表", //【命令】功能说明【#例子】开发简单示例演示
  },
  jinqun: {
    reg: "^#?(进群|拉群|拉机器人进群|拉bot)$", //匹配消息正则，命令正则
    //"^11$" 关键词11
    //
    priority: 800, //优先级，越小优先度越高
    describe: "进群说明，私聊有效", //【命令】功能说明【#例子】开发简单示例演示

  },
  tili2: {
    reg: "^#?(体力|树脂)$", //匹配消息正则，命令正则
    //"^11$" 关键词11
    //
    priority: 1, //优先级，越小优先度越高
    describe: "禁用群聊体力查询", //【命令】功能说明【#例子】开发简单示例演示

  }

};
if (!fs.existsSync(`${_path}/data/group/`)) {
  fs.mkdirSync(`${_path}/data/group/`);
}
//2.编写功能方法
export async function help(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "\ncookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html",
  ];
  e.reply(msg);
}
export async function yuyin(e) {
  let msg = [
    segment.at(e.user_id),
    segment.image(`file:///${_path}/resources/小粉/语音列表.png`),
  ];
  e.reply(msg);
}

export async function jinqun(e) {
  if (e.isGroup) return;
  else {
    let msg = [
      "拉群先加大号：1966174908，私聊说明来意谢谢",
      segment.image(`file:///${_path}/resources/小粉/23232.png`),
    ]
    e.reply(msg);
  }
  return true;
}

export async function tili2(e) {
  if (e.isPrivate) return;
  let msg = [
    segment.at(e.user_id),
    "在群里查个屁，不要在群里刷屏，私聊去"
  ]
  e.reply(msg);
  return true;
}