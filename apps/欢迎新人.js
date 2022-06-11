import { segment } from "oicq";
import fetch from "node-fetch";
import lodash from "lodash";

const _path = process.cwd();


//1.定义命令规则
export const rule = {
    newcomers: {
        reg: "^#欢迎新人$", //匹配消息正则，命令正则
        priority: 50, //优先级，越小优先度越高
        describe: "【#欢迎新人】开发简单示例演示", //【命令】功能说明
    },
};

export async function newcomers(e) {

    //定义入群欢迎内容
    // let img = "http://tva1.sinaimg.cn/bmiddle/6af89bc8gw1f8ub7pm00oj202k022t8i.jpg";//图片
    let ms = [
        //@用户
        segment.at(e.user_id),
        //文本消息
        "\n欢迎~欢迎~\n发送#bot详情就可以查看此群bot的详细介绍哦~",
    ];
    e.reply(ms);
    let msg = [
        //图片
        segment.image(`file:///${_path}/plugins/fen-plugin/resources/global/111313.jpg`),
    ];
    //冷却cd 10s
    let cd = 60;

    //不是群聊
    if (!e.isGroup) {
        return;
    }

    //cd
    let key = `Yunzai:newcomers:${e.group_id}`;
    if (await redis.get(key)) {
        return;
    }
    redis.set(key, "1", { EX: cd });

    //发送消息
    if (typeof img != "undefined") msg = [segment.image(img), msg];

    e.reply(msg);


    return true; //返回true 阻挡消息不再往下
}
