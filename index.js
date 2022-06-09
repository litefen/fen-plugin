import { about, help, fenversion } from "./apps/about.js";
// import { allface } from "./apps/allface.js";
import { version } from "./components/Changelog.js";
import { sese, sese1 } from "./apps/不可以涩涩.js"
import { 群主, 调戏 } from "./apps/群主写真.js"
export {
    about,
    help,
    fenversion,
    sese,
    sese1,
    群主,
    调戏


    // allface
};


let rule = {
    //关于
    about: {
        reg: "^#?(粉酱)?(详情|说明|使用说明)$",
        priority: 1,
        describe: "【#粉酱详情】 #粉酱详情",
    },
    help: {
        reg: "^#?(cookie|功能)?(详情|说明|使用说明|演示)$",
        priority: 1,
        describe: "",
    },
    fenversion: {
        reg: "^#?粉酱版本$",
        priority: 2,
        describe: "粉酱版本",
    },
    sese: {
        reg: "^#?(涩涩|色色|瑟瑟|sese)$", //匹配消息正则，命令正则
        priority: 5, //优先级，越小优先度越高
        describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
    },
    sese1: {
        reg: "^#?(我要|就要|偏要|给我)(sese|色色|涩涩|色色)$", //匹配消息正则，命令正则
        priority: 6, //优先级，越小优先度越高
        describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
    },
    群主: {
        reg: "^#?(小粉|群主)(女装|写真|私房|涩涩|色色|泡水|瑟瑟|涩涩，|照片|私房照|女装照|是男同|是男酮)$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
    },
    调戏: {
        reg: "^#?(女装|写真|私房|涩涩|色色|泡水|男同)小粉$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
    },

    //全局表情
    // allface: {
    //     reg: "",
    //     priority: 1,
    //     describe: "全局列表",
    // },
};

// lodash.forEach(rule, (r) => {
//     r.priority = r.priority || 1;
//     r.prehash = true;
//     r.hashMark = true;
// });

export { rule };

console.log(`粉酱插件${version}初始化~`);

setTimeout(async function () {
    let msgStr = await redis.get("miao:restart-msg");
    if (msgStr) {
        let msg = JSON.parse(msgStr);
        await common.relpyPrivate(msg.qq, msg.msg);
        await redis.del("miao:restart-msg");
        let msgs = [`当前粉酱版本: ${version}`, `您可使用 #粉酱版本 命令查看更新信息`];
        await common.relpyPrivate(msg.qq, msgs.join("\n"));
    }
}, 1000);