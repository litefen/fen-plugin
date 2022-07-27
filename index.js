import { about, cookiehelp, fenversion, bothelp } from "./apps/about.js";
import { version } from "./components/Changelog.js";
import { fenupdate } from "./components/update.js";
import { sese, sese1 } from "./apps/不可以涩涩.js"
import { 群主, 调戏 } from "./apps/群主写真.js"
import { 全局, voicelist , videolist , imglist } from "./apps/全局.js"
export {
    about,
    cookiehelp,
    fenupdate,
    fenversion,
    bothelp,
    sese,
    sese1,
    群主,
    调戏,
    全局,
    voicelist,
    videolist,
    imglist,
};

let rule = {
    //关于
    about: {
        reg: "^#?(粉酱)(详情|说明|使用说明|github|项目|地址)$",
        priority: 100,
        describe: "【#粉酱详情】 #粉酱详情",
    },
    //cookie帮助
    cookiehelp: {
        reg: "^#?(cookie|功能)(详情|帮助|说明|使用说明|演示)$",
        priority: 100,
        describe: "",
    },
    //粉酱版本
    fenversion: {
        reg: "^#?粉酱版本$",
        priority: 200,
        describe: "粉酱版本",
    },
    bothelp: {
        reg: "^#?(晴酱|bot|帮助|使用|演示)(帮助|详情|说明|使用文档|文档|演示)$",
        priority: 10,
        describe: "粉酱版本",
    },
    //粉酱更新
    fenupdate: {
        reg: "^#粉酱(强制)?更新$", //匹配消息正则，命令正则
        priority: 500, //优先级，越小优先度越高
        describe: "自主git pull，请先确认git pull命令有效", //【命令】功能说明
    },
    // checkfenupdate: {
    //     reg: "^#*粉酱检查更新$", //匹配消息正则，命令正则
    //     priority: 5000, //优先级，越小优先度越高
    //     describe: "检查更新", //【命令】功能说明
    // },
    //不可以涩涩
    sese: {
        reg: "^#?(涩涩|色色|瑟瑟|sese|涩图|色图)$", //匹配消息正则，命令正则
        priority: 500, //优先级，越小优先度越高
        describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
    },
    sese1: {
        reg: "^#?(我要|就要|偏要|给我)(sese|色色|涩涩|色色)$", //匹配消息正则，命令正则
        priority: 600, //优先级，越小优先度越高
        describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
    },
    群主: {
        reg: "^#?(小粉|群主)(女装|写真|私房|涩涩|色色|泡水|瑟瑟|涩涩，|照片|私房照|女装照|是男同|是男酮|是南通)$", //匹配消息正则，命令正则
        priority: 500, //优先级，越小优先度越高
        describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
    },
    调戏: {
        reg: "^#?(女装|写真|私房|涩涩|色色|泡水|男同)(小粉|群主)$", //匹配消息正则，命令正则
        priority: 500, //优先级，越小优先度越高
        describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
    },
    全局: {
        reg: "", //匹配消息正则，命令正则
        priority: 200, //优先级，越小优先度越高
        describe: "【文件名】就是触发指令", //【命令】功能说明
    },
    voicelist: {
        reg: "^#?(语音)(列表|目录|有哪些)$",
        priority: 100,
        describe: "语音列表",
    },
    videolist: {
        reg: "^#?(视频)(列表|目录|有哪些)$",
        priority: 100,
        describe: "语音列表",
    },
    imglist: {
        reg: "^#?(全局表情|表情包)(列表|目录|有哪些)$",
        priority: 100,
        describe: "语音列表",
    },
};

// lodash.forEach(rule, (r) => {
//     r.priority = r.priority || 50;
//     r.prehash = true;
//     r.hashMark = true;
//   });

export { rule };

console.log(`粉酱插件${version}初始化~`);

setTimeout(async function () {
    let msgStr = await redis.get("fen:restart-msg");
    if (msgStr) {
        let msg = JSON.parse(msgStr);
        await common.relpyPrivate(msg.qq, msg.msg);
        await redis.del("fen:restart-msg");
        let msgs = [`当前粉酱版本: ${currentVersion}`,`您可使用 #粉酱版本 命令查看更新信息`];
        await common.relpyPrivate(msg.qq, msgs.join("\n"));
    }
}, 1000);