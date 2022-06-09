import { about, fenversion } from "./apps/about.js";
// import { allface } from "./apps/allface.js";
import { version } from "./components/Changelog.js";
export {
    about,
    fenversion
    // allface
};


let rule = {
    //关于
    about: {
        reg: "^#?(粉酱)?(详情|帮助|菜单|help|说明|功能|指令|使用说明)$",
        priority: 1,
        describe: "【#粉酱详情】 #粉酱详情",
    },
    fenversion: {
        reg: "^#?粉酱版本$",
        priority: 1,
        describe: "粉酱版本",
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